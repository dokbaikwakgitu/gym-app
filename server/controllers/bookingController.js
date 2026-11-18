import catchAsync from '../utils/catchAsync.js';
import prisma from '../prisma/client.js';
import AppError from '../utils/appError.js';
import { z } from 'zod';

const bookingClassSchema = z.object({
  classId: z.coerce.number().int().min(1),
});

export const bookingClass = catchAsync(async (req, res, next) => {
  const result = bookingClassSchema.safeParse(req.body);

  if (!result.success) {
    return next(new AppError(result.error.issues[0].message, 400));
  }

  const classId = Number(result.data.classId);

  if (!Number.isSafeInteger(classId) || classId <= 0) {
    return next(new AppError('Invalid Id Format', 400));
  }

  // check it active membership
  const membership = await prisma.membership.findFirst({
    where: {
      userId: req.user.id,
      status: 'active',
      endDate: { gte: new Date() },
    },
  });

  if (!membership) {
    return next(
      new AppError(
        'You dont have membership yet! please buy membership plan first',
        403,
      ),
    );
  }

  // find the class by that id
  const gymClass = await prisma.class.findFirst({
    where: { id: classId, startAt: { gt: new Date() } },
  });

  // verify its existing
  if (!gymClass) {
    return next(new AppError('No class found with that id/class started', 404));
  }

  const userBooking = await prisma.booking.findFirst({
    where: { userId: req.user.id, classId: classId },
  });

  if (userBooking) {
    return next(new AppError('Bro you already book this class!', 400));
  }

  //find all booking that book this class and fetch it length
  const bookingList = await prisma.booking.count({
    where: { classId: classId },
  });

  //fetch the bookingList length and compare with capcity of the class
  if (gymClass.capacity <= bookingList) {
    return next(new AppError('Class Full!', 400));
  }

  const newBooking = await prisma.booking.create({
    data: { userId: req.user.id, classId: classId },
    include: { gymClass: true },
  });

  res.status(201).json({
    status: 'success',
    data: { newBooking },
  });
});
