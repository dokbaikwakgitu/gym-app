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
