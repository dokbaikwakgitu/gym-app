import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import catchAsync from '../utils/catchAsync.js';
import prisma from '../prisma/client.js';
import { promisify } from 'util';

//--------------------NEW SECTION--------------------
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
//--------------------NEW SECTION--------------------
const createSendToken = (user, statusCode, res) => {
  //1.creating token
  const token = signToken(user.id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIES_EXPIRES_IN * 1000 * 60 * 60 * 24,
    ),
    httpOnly: true,
  };

  res.cookie('jwt', token, cookieOptions);

  const { password, ...userWithoutPassword } = user; //destructure user object into password and others object

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user: userWithoutPassword,
    },
  });
};
//--------------------NEW SECTION--------------------
export const signup = catchAsync(async (req, res, next) => {
  const { username, email, phone, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      phone,
      password: hashedPassword,
      role: 'member',
    },
  });
  createSendToken(newUser, 201, res);
});
//--------------------NEW SECTION--------------------
// POST /api/v1/auth/login
export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //1) check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({
      status: 'fail',
      message: 'Please provide email and password',
    });
  }

  //2) check if user exists && password is correct
  const user = await prisma.user.findUnique({ where: { email } });

  // same generic message for both cases so we don't reveal which one is wrong
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({
      status: 'fail',
      message: 'Incorrect email or password',
    });
  }

  //3) user is deactivated -> do not issue a token
  if (!user.active) {
    return res.status(403).json({
      status: 'fail',
      message: 'This account has been deactivated',
    });
  }

  //4) everything is ok -> send token to client (cookie + response body)
  createSendToken(user, 200, res);
});

//--------------------VERIFYING TOKEN--------------------
export const protect = catchAsync(async (req, res, next) => {
  //1) getting the token and check it
  let token;
  console.log('this is header log!!', req.headers);
  if (
    req.headers.authorization &&
    req.headers.authorization?.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]; //for non browswer client
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } //get the jwt from cookies

  if (!token) {
    return next(new AppError('You are not logged in!', 401));
  }

  //2) verify the token - We sign payload + JWT_SECRET to create the token, send only the token to the client, and keep the secret locked on the server
  const newPromise = promisify(jwt.verify);
  const decoded = await newPromise(token, process.env.JWT_SECRET);
  console.log('decoded:', decoded);

  //3) check if the user still exist -- jwt is stateless(save on client) deleted user token will still be alive until expired
  const currentUser = await prisma.user.findUnique({
    where: { id: decoded.id },
  });

  if (!currentUser) {
    return next(
      new AppError('The user belonging this token is no longer existed', 401),
    );
  }

  if (
    currentUser.passwordChangedAt &&
    decoded.iat * 1000 < currentUser.passwordChangedAt.getTime()
  ) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401),
    );
  }
  req.user = currentUser; // passing currentuser to next route
  next();
});
