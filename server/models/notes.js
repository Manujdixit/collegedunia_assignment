import mongoose, { Schema } from "mongoose";

const NotesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      default: "",
      enum: ["General", "Work", "Personal", "Shopping", "Others"],
    },
  },
  { timestamps: true }
);
export const Notes = mongoose.model("Notes", NotesSchema);
