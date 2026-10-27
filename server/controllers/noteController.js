import Note from "../models/Note.js";

const pickFields = (body) => {
  const { title, content, tags, color } = body;
  return Object.fromEntries(
    Object.entries({ title, content, tags, color }).filter(
      ([, v]) => v !== undefined
    )
  );
};

export const getNotes = async (req, res) => {
  const { search, tag, archived } = req.query;

  const filter = {
    userId: req.user._id,
    isDeleted: false,
    isArchived: archived === "true",
  };

  if (tag) filter.tags = tag;

  if (search) {
    const safe = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    filter.$or = [
      { title: { $regex: safe, $options: "i" } },
      { content: { $regex: safe, $options: "i" } },
    ];
  }

  const notes = await Note.find(filter).sort({ isPinned: -1, updatedAt: -1 });
  res.json({ success: true, count: notes.length, notes });
};

export const createNote = async (req, res) => {
  if (!req.body.title) {
    return res
      .status(400)
      .json({ success: false, message: "Title zaroori hai" });
  }

  const note = await Note.create({ ...pickFields(req.body), userId: req.user._id });
  res.status(201).json({ success: true, note });
};

export const updateNote = async (req, res) => {
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    pickFields(req.body),
    { new: true, runValidators: true }
  );

  if (!note) {
    return res.status(404).json({ success: false, message: "Note nahi mila" });
  }
  res.json({ success: true, note });
};

export const deleteNote = async (req, res) => {
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    { isDeleted: true },
    { new: true }
  );

  if (!note) {
    return res.status(404).json({ success: false, message: "Note nahi mila" });
  }
  res.json({ success: true, message: "Note trash mein chala gaya" });
};