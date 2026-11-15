class AppError extends Error {
  //creates a custom blueprint inheriting all built-in JavaScript Error
  constructor(message, statusCode) {
    super(message); // sets this.message

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"; // 4xx = client mistake, 5xx = server crash
    this.isOperational = true; // expected error -> safe to send its message to the client

    Error.captureStackTrace(this, this.constructor); //hiding constructor from the stack trace.
  }
}

export default AppError;
