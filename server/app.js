import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import { globalErrorHandler } from "./controllers/errorController.js";
const app = express();

app.use(
  // allow react to call this file(express api)
  cors({
    origin: "http://localhost:3000", // React app
    credentials: true, // allow cookies
  }),
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cookieParser()); //this method from cookie-parser package - parse the cookeis into req.cookies

app.use(express.json()); // parse JSON bodies

//-- INITIALIZING SUBS ROUTE HANDLER--
app.use("/api/v1/auth", authRoute);
// app.use("/api/v1/users", userRoute);
// app.use("/api/v1/member", membershipRoute);
// app.use("/api/v1/class", classRoute);

//---------------ERROR HANDLER: must be the last middleware-----------------
app.use(globalErrorHandler);

export default app;
