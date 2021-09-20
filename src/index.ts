import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";

import { usersRouter } from "./users/user.router";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const MONGODB_URI = process.env.MONGODB_URI as string;
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

mongoose.connect(MONGODB_URI).then(
  () => {
    console.log("Connected to database");
  },

  (err) => {
    console.log("Failed to connect to database");
  }
);
