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

  const pastCount = await prisma.membership.count({
    where: { userId: req.user.id },
  });
  if (plan.isFirstTimeOnly && pastCount > 0) {
    return next(new AppError('This plan is for first-time members only', 403));
  }

  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setUTCDate(endDate.getUTCDate() + plan.durationDays - 1); //last valid date

  //--------------------CREATE A PAID LOGIC LATER ON,FOR NOW LET DO MOCK--------------------
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

export const getMyMembership = catchAsync(async (req, res, next) => {
  const currentUserId = Number(req.user.id);

  const membershipUser = await prisma.membership.findFirst({
    where: { userId: currentUserId, status: 'active' },
    include: { plan: true },
  });

  if (!membershipUser) {
    return next(new AppError('No user found with that id!', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { membership: membershipUser },
  });
});
