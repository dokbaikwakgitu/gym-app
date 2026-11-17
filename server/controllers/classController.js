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

const updateClassSchema = createClassSchema.partial();

// id comes from the URL (PATCH /api/v1/classes/:id), so every field is optional.
// unknown keys (id, createdAt...) are stripped by zod and can never be updated.
//--------------------NEW SECTION--------------------
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

//--------------------NEW SECTION--------------------
export const createClass = catchAsync(async (req, res, next) => {
  const result = createClassSchema.safeParse(req.body);
  console.log('this is validation', result);

  if (!result.success) {
    return next(new AppError(result.error.issues[0].message, 400));
  }

  const newClass = await prisma.class.create({ data: result.data });
  res.status(201).json({ status: 'success', data: { class: newClass } });
});

//--------------------NEW SECTION--------------------
export const getClass = catchAsync(async (req, res, next) => {
  //probably will add filter,sort,limitfield,paginate.... probably...PROBABLY
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0 || id > 2_147_483_647) {
    return next(new AppError('Invalid ID format', 400));
  }

  const foundClass = await prisma.class.findUnique({
    where: { id },
  });

  //1) check if result exist
  if (!foundClass) {
    return next(new AppError('No class found with that id!', 404));
  }

  //2)success
  res.status(200).json({
    status: 'success',
    data: { class: foundClass },
  });
});

export const updateClass = catchAsync(async (req, res, next) => {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0 || id > 2_147_483_647) {
    return next(new AppError('Invalid ID format', 400));
  }

  const result = updateClassSchema.safeParse(req.body);
  // console.log('updateClassScheme:', result);
  // console.log('errorByZod:', result.error);

  if (!result.success) {
    //zod built in property .success
    return next(new AppError(result.error.issues[0].message, 400));
  }

  if (Object.keys(result.data).length === 0) {
    return next(new AppError('Please insert at least one field', 400));
  }

  const updatedClass = await prisma.class.update({
    where: { id },
    data: result.data,
  });

  res.status(200).json({
    status: 'success',
    data: { class: updatedClass },
  });
});

export const deleteClass = catchAsync(async (req, res, next) => {
  //1. find the id
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0 || id > 2_147_483_647) {
    return next(new AppError('Invalid ID format', 400));
  }

  const result = await prisma.class.delete({
    where: { id },
  });

  //2.success deleting
  res.status(204).send();
});

