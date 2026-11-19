import catchAsync from '../utils/catchAsync.js';
import prisma from '../prisma/client.js';
import AppError from '../utils/appError.js';

// (never expose password)
const userSelect = {
  id: true,
  username: true,
  email: true,
  phone: true,
  role: true,
  active: true,
  createdAt: true,
};

//--------------------NEW SECTION--------------------
export const getMe = catchAsync(async (req, res, next) => {
  const { password, ...user } = req.user;

  res.status(200).json({ status: 'success', data: { user } });
});

//--------------------NEW SECTION--------------------
export const getUser = catchAsync(async (req, res, next) => {
  const id = Number(req.params.id);

  //1) reject negative id and non-integer
  if (!Number.isInteger(id) || id <= 0) {
    return next(new AppError('Invalid Id', 400)); //client input error 400
  }

  //2) find user
  const user = await prisma.user.findUnique({
    where: { id },
    select: userSelect,
  });

  if (!user) {
    return next(new AppError(`No user founded with id: ${id}`, 404));
  }

  //3)success - sedn the respond
  res.status(200).json({ status: 'success', data: { user } });
});
