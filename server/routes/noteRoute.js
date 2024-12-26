import { Router } from "express";
import {
  createNote,
  getNotes,
  getNote,
  deleteNote,
  updateNote,
} from "../controllers/notes.js";
import { auth } from "../middlewares/auth.js";

export const noteRouter = Router();

noteRouter.use(auth);

noteRouter.route("/").get(getNotes);
noteRouter.route("/").post(createNote);
noteRouter.route("/:id").get(getNote);
noteRouter.route("/:id").delete(deleteNote);
noteRouter.route("/:id").put(updateNote);
