import catchAsync from '../utils/catchAsync.js';
import prisma from '../prisma/client.js';
import AppError from '../utils/appError.js';
import { z } from 'zod';

const createLocationSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  phone: z.string().min(1),
  hours: z.string().min(1),
});

export const createLocation = catchAsync(async (req, res, next) => {
  const info = createLocationSchema.safeParse(req.body);

  if (!info.success) {
    return next(new AppError(info.error.issues[0].message, 400));
  }

  const createdLocation = await prisma.location.create({ data: info.data });

  res.status(201).json({
    status: 'success',
    data: { location: createdLocation },
  });
});

export const getAllLocations = catchAsync(async (req, res, next) => {
  const result = await prisma.location.findMany();

  res.status(200).json({
    status: 'success',
    data: { locations: result },
  });
});
