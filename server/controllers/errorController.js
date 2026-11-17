import AppError from '../utils/appError.js';

//--------------------NEW SECTION--------------------
// Prisma: wrong type/missing value passed to a query, e.g. email: {}
const handlePrismaValidationError = () => {
  return new AppError('Invalid input data', 400);
};

// Prisma: unique constraint failed (P2002), e.g. duplicate email
const handlePrismaDuplicate = (err) => {
  const field = err.meta?.target?.[0] || 'field';
  console.log(err);
  const message = `Duplicate value for ${field}, please use another value!`;

  return new AppError(message, 400);
};

// express.json(): request body is not valid JSON
const handleJsonParseError = () => {
  return new AppError('Invalid JSON in request body', 400);
};

//--------------------Prisma: record to update/delete does not exist (P2025)--------------------
const handlePrismaNotFound = () => {
  return new AppError('Record not found', 404);
};

//--------------------Prisma: foreign key constraint failed (P2003)--------------------
// e.g. deleting a class that still has bookings, or creating a booking
// that references a class/user that does not exist
const handlePrismaForeignKeyError = () => {
  return new AppError(
    'Operation failed: a related record does not exist or is still in use',
    409,
  );
};

//--------------------bcryptjs: login password must be a string--------------------
const handleBcryptArgumentError = (err) => {
  console.log(err);

  return new AppError('Please provide email and password', 400);
};

//--------------------jsonwebtoken: invalid or tempered link --------------------
const handleJWTError = () => {
  return new AppError('You are not authorized. Please log in first!', 401);
};

//--------------------jsonwebtoken: exprire token--------------------
const handleJWTExpiryError = () => {
  return new AppError('Your token has expired. Please login again!', 401);
};

//--------------------Normalize known errors into AppError--------------------
// runs for BOTH dev and prod so the status code never depends on NODE_ENV
const normalizeError = (err) => {
  // already an intentional, operational error -> nothing to normalize
  if (err instanceof AppError) return err;

  if (err.name === 'PrismaClientValidationError')
    return handlePrismaValidationError();
  if (err.code === 'P2002') return handlePrismaDuplicate(err);
  if (err.code === 'P2003') return handlePrismaForeignKeyError();
  if (err.code === 'P2025') return handlePrismaNotFound();
  if (err.type === 'entity.parse.failed') return handleJsonParseError();
  if (
    typeof err.message === 'string' &&
    err.message.includes('Illegal arguments')
  )
    return handleBcryptArgumentError(err);
  if (err.name === 'JsonWebTokenError') return handleJWTError();
  if (err.name === 'TokenExpiredError') return handleJWTExpiryError();

  return err; // unknown error -> dev shows details, prod hides them
};

//--------------------Development Env: just gimme every feedback--------------------
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

//--------------------Production Env: hide some ,give some--------------------
const sendErrorProd = (err, res) => {
  //operational = expected error (bad input, wrong password...)
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    //unknown/programming error -> never leak details to the client
    console.error('ERROR 💥', err);

    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};
//--------------------Global error handler: must be the last middleware--------------------
export const globalErrorHandler = (err, req, res, next) => {
  //1) normalize known errors FIRST - same behavior in dev and prod
  const error = normalizeError(err);

  //2) defaults for anything that is still not an AppError
  error.statusCode = error.statusCode || 500;
  error.status = `${error.statusCode}`.startsWith('4') ? 'fail' : 'error';

  //3) send
  if (process.env.NODE_ENV === 'development') {
    return sendErrorDev(error, res);
  }

  sendErrorProd(error, res); //call sendErrorProd function to send error and respond
};
