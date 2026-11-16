import catchAsync from '../utils/catchAsync.js';
import prisma from '../prisma/client.js';
import AppError from '../utils/appError.js';

export const getAllClasses = catchAsync(async (req, res, next) => {
  const classes = await prisma.class.findMany({
    where: { startAt: { gt: new Date() } },
  });
  console.log("this is a new date",new Date());

  res.status(200).json({
    status: 'success',
    data: { classes },
  });
});
