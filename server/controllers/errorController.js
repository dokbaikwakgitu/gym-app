import AppError from "../utils/appError.js";

//--------------------NEW SECTION--------------------
// Prisma: wrong type/missing value passed to a query, e.g. email: {}
const handlePrismaValidationError = () => {
  return new AppError("Invalid input data", 400);
};

// Prisma: unique constraint failed (P2002), e.g. duplicate email
const handlePrismaDuplicate = (err) => {
  const field = err.meta?.target?.[0] || "field";
  const message = `Duplicate value for ${field}, please use another value!`;

  return new AppError(message, 400);
};

// Prisma: record to update/delete does not exist (P2025)
const handlePrismaNotFound = () => {
  return new AppError("Record not found", 404);
};

// express.json(): request body is not valid JSON
const handleJsonParseError = () => {
  return new AppError("Invalid JSON in request body", 400);
};

// bcryptjs: login password is not a string
const handleBcryptArgumentError = () => {
  return new AppError("Please provide email and password", 400);
};

// jsonwebtoken
const handleJWTError = () => {
  return new AppError("You are not authorized. Please log in first!", 401);
};

const handleJWTExpiryError = () => {
  return new AppError("Your token has expired. Please login again!", 401);
};
//--------------------NEW SECTION--------------------
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
//--------------------NEW SECTION--------------------
const sendErrorProd = (err, res) => {
  //operational = expected error (bad input, wrong password...)
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    //unknown/programming error -> never leak details to the client
    console.error("ERROR 💥", err);

    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};
//--------------------NEW SECTION--------------------
export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = `${err.statusCode}`.startsWith("4") ? "fail" : "error";

  if (process.env.NODE_ENV !== "production") {
    return sendErrorDev(err, res);
  }

  // production: normalize known errors into AppError
  let error = { ...err, message: err.message, name: err.name };

  if (error.name === "PrismaClientValidationError")
    error = handlePrismaValidationError();
  if (error.code === "P2002") error = handlePrismaDuplicate(error);
  if (error.code === "P2025") error = handlePrismaNotFound();
  if (error.type === "entity.parse.failed") error = handleJsonParseError();
  if (error.message.includes("Illegal arguments"))
    error = handleBcryptArgumentError();
  if (error.name === "JsonWebTokenError") error = handleJWTError();
  if (error.name === "TokenExpiredError") error = handleJWTExpiryError();

  sendErrorProd(error, res); //call sendErrorProd function to send error and respond
};
