import catchAsync from '../utils/catchAsync.js';
import prisma from '../prisma/client.js';
import AppError from '../utils/appError.js';
import { z } from 'zod';

const buyPlanSchema = z.object({
  planId: z.coerce.number().int().positive(),
});

export const buyPlan = catchAsync(async (req, res, next) => {
  //parse it
  const result = buyPlanSchema.safeParse(req.body);

  if (!result.success) {
    return next(new AppError(result.error.issues[0].message, 400));
  }

  //find planId = plan
  const { planId } = result.data;

  const plan = await prisma.plan.findUnique({
    where: { id: planId },
  });

  if (!plan) {
    return next(new AppError('No Plan by that id', 404));
  }

  // find im membership row that have this id that currently active
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const activeMembership = await prisma.membership.findFirst({
    where: {
      userId: req.user.id,
      status: 'active',
      OR: [{ endDate: null }, { endDate: { gte: today } }],
    },
  });

  if (activeMembership) {
    return next(new AppError('You already have active membership', 409));
  }

  //create the membership - Plan has no duration column yet, so endDate
  // stays null. Once you add one (e.g. durationDays), compute it here.
  const startDate = new Date(); // today
  const endDate = new Date(startDate);
  endDate.setUTCDate(endDate.getUTCDate() + plan.durationDays - 1); //last valid date

  const membership = await prisma.membership.create({
    data: {
      userId: req.user.id,
      planId: plan.id,
      startDate,
      endDate,
      status: 'active',
    },
    include: { plan: true },
  });

  //5) success
  res.status(201).json({
    status: 'success',
    data: { membership },
  });
});
