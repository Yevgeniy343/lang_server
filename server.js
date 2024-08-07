import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import "express-async-errors";
const app = express();
import morgan from "morgan";
import path from "path";

import authRouter from "./routes/authRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import userRouter from "./routes/userRoutes.js";
import jury_authRouter from "./routes/jury-authRoutes.js";
import juryRouter from "./routes/juryRoutes.js";

import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";
import authenticateJury from "./middleware/authJury.js";

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/uploads/files", express.static(path.join("uploads", "files")));

app.get("/", (req, res) => {
  res.json({ msg: "welcom" });
});

app.use("/api/auth", authRouter);
app.use("/api/user", authenticateUser, userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/jury-auth", jury_authRouter);
app.use("/api/jury", authenticateJury, juryRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

mongoose.set("strictQuery", false);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.a48edk3.mongodb.net/lang`
  )
  .then(() => {
    app.listen(process.env.PORT || 1000);
    console.log("Server has been started, DB connected");
  })
  .catch((err) => {
    console.log(err);
  });
