import catchAsync from '../utils/catchAsync.js';
import prisma from '../prisma/client.js';
import AppError from '../utils/appError.js';
import { email, z } from 'zod';

const createEnquirySchema = z.object({
  name: z.string().min(1),
  email: z.email('Invalid email address').trim(),
  phone: z.string().min(1).optional(),
  message: z.string().min(1),
});

export const postEnquiry = catchAsync(async (req, res, next) => {
  const enquiry = createEnquirySchema.safeParse(req.body);

  if (!enquiry.success) {
    return next(new AppError(enquiry.error.issues[0].message, 400));
  }

  const createdEnquiry = await prisma.enquiry.create({
    data: enquiry.data,
  });

  res.status(201).json({
    status: 'success',
    data: { enquiry: createdEnquiry },
  });
});
