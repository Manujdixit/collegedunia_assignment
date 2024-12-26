import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running....");
});

import { userRouter } from "./routes/userRoute.js";
import { noteRouter } from "./routes/noteRoute.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/note", noteRouter);

export { app };
