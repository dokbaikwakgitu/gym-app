import catchAsync from '../utils/catchAsync.js';
import prisma from '../prisma/client.js';
import AppError from '../utils/appError.js';
import { z } from 'zod';

const createPlanSchema = z.object({
  name: z.string().min(1),
  durationDays: z.coerce.number().int().min(1),
  price: z.coerce.number().int().min(1),
  desc: z.string().min(1),
  famAccess: z.boolean(),
  isFirstTimeOnly: z.boolean().default(false),
});

export const createPlan = catchAsync(async (req, res, next) => {
  // parse it bro
  const result = createPlanSchema.safeParse(req.body);

  if (!result.success) {
    return next(new AppError(result.error.issues[0].message, 400));
  }
  // create the plan
  const createdPlan = await prisma.plan.create({ data: result.data });

  //success
  res.status(201).json({
    status: 'success',
    data: { plan: createdPlan },
  });
});

export const getAllPlan = catchAsync(async (req, res, next) => {
  const data = await prisma.plan.findMany();

  res.status(200).json({
    status: 'success',
    data,
  });
});
