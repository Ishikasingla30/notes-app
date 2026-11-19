import User from "../models/User.js";
import Note from "../models/Note.js";

// List all users together with how many notes each one has
export const getUsers = async (req, res) => {
  const users = await User.find().select("-passwordHash").sort({ createdAt: -1 });

  const counts = await Note.aggregate([
    { $match: { isDeleted: false } },
    { $group: { _id: "$userId", noteCount: { $sum: 1 } } },
  ]);

  const countMap = new Map(counts.map((c) => [String(c._id), c.noteCount]));

  const data = users.map((user) => ({
    ...user.toObject(),
    noteCount: countMap.get(String(user._id)) || 0,
  }));

  res.json({ success: true, count: data.length, users: data });
};

// List recent notes from all users, with the owner's name and email
export const getAllNotes = async (req, res) => {
  const notes = await Note.find({ isDeleted: false })
    .populate("userId", "name email")
    .sort({ updatedAt: -1 })
    .limit(50);

  res.json({ success: true, count: notes.length, notes });
};