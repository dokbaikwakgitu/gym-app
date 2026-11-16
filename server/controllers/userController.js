import catchAsync from '../utils/catchAsync.js';

// fields that are safe to send to the client (never expose password)
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
