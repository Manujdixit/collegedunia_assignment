import { Notes } from "../models/notes.js";

export const createNote = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const user = req.user._id;
    const note = await Notes.create({ title, content, user, category });
    res.status(201).json({ note });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getNotes = async (req, res) => {
  try {
    const user = req.user._id;
    const notes = await Notes.find({ user });
    res.json({ notes });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Notes.findById(id);
    res.json({ note });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category } = req.body;
    const note = await Notes.findByIdAndUpdate(
      id,
      { title, content, category },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    await Notes.findByIdAndDelete(id);
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
