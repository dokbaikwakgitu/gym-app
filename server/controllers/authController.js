import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import catchAsync from "../utils/catchAsync.js";
import prisma from "../prisma/client.js";

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

  res.cookie("jwt", token, cookieOptions);

  const { password, ...userWithoutPassword } = user; //destructure user object into password and others object

  res.status(statusCode).json({
    status: "success",
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
      role: "member",
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
      status: "fail",
      message: "Please provide email and password",
    });
  }

  //2) check if user exists && password is correct
  const user = await prisma.user.findUnique({ where: { email } });

  // same generic message for both cases so we don't reveal which one is wrong
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({
      status: "fail",
      message: "Incorrect email or password",
    });
  }

  //3) user is deactivated -> do not issue a token
  if (!user.active) {
    return res.status(403).json({
      status: "fail",
      message: "This account has been deactivated",
    });
  }

  //4) everything is ok -> send token to client (cookie + response body)
  createSendToken(user, 200, res);
});
