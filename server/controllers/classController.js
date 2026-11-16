import catchAsync from '../utils/catchAsync.js';
import prisma from '../prisma/client.js';
import AppError from '../utils/appError.js';
import { z } from 'zod';

const createClassSchema = z.object({
  name: z.string().min(1),
  instructorName: z.string().min(1),
  startAt: z.coerce.date(), //coerce always follow with something
  durationMinutes: z.coerce.number().int().positive(),
  capacity: z.coerce.number().int().positive(),
});

export const getAllClasses = catchAsync(async (req, res, next) => {
  //will do pagination later.. maybe
  const classes = await prisma.class.findMany({
    where: { startAt: { gt: new Date() } },
  });
  console.log('this is a new date', new Date());

  res.status(200).json({
    status: 'success',
    data: { classes },
  });
});


export const createClass = catchAsync(async (req, res, next) => {
  const result = createClassSchema.safeParse(req.body);
  console.log('this is validation', result);

  if (!result.success) {
    return next(new AppError(result.error.issues[0].message, 400));
  }

  const newClass = await prisma.class.create({ data: result.data });
  res.status(201).json({ status: 'success', data: { class: newClass } });
});
