import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config();

const port = process.env.PORT || 3000;

const conn = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};

conn();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
