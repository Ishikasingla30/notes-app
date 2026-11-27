import Note from "../models/Note.js";

const pickFields = (body) => {
  const { title, content, tags, color, priority } = body;
  const fields = Object.fromEntries(
    Object.entries({ title, content, tags, color, priority }).filter(
      ([, v]) => v !== undefined
    )
  );
  if (Array.isArray(fields.tags)) {
    fields.tags = [
      ...new Set(
        fields.tags.map((t) => String(t).trim().toLowerCase()).filter(Boolean)
      ),
    ];
  }
  return fields;
};

export const getNotes = async (req, res) => {
  const { search, tag, archived } = req.query;

  const filter = {
    userId: req.user._id,
    isDeleted: false,
    isArchived: archived === "true",
  };
  if (req.query.pinned === "true") filter.isPinned = true;

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
      .json({ success: false, message: "Title is required" });
  }

  const note = await Note.create({ ...pickFields(req.body), userId: req.user._id });
  res.status(201).json({ success: true, note });
};

export const updateNote = async (req, res) => {
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id, isDeleted: false },
    pickFields(req.body),
    { new: true, runValidators: true }
  );

  if (!note) {
    return res.status(404).json({ success: false, message: "Note not found" });
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
    return res.status(404).json({ success: false, message: "Note not found" });
  }
  res.json({ success: true, message: "Note moved to trash" });
};
export const togglePin = async (req, res) => {
  const note = await Note.findOne({
    _id: req.params.id,
    userId: req.user._id,
    isDeleted: false,
  });
  if (!note) {
    return res.status(404).json({ success: false, message: "Note not found" });
  }
  note.isPinned = !note.isPinned;
  await note.save();
  res.json({ success: true, note });
};

export const toggleArchive = async (req, res) => {
  const note = await Note.findOne({
    _id: req.params.id,
    userId: req.user._id,
    isDeleted: false,
  });
  if (!note) {
    return res.status(404).json({ success: false, message: "Note not found" });
  }
  note.isArchived = !note.isArchived;
  await note.save();
  res.json({ success: true, note });
};

export const getTrash = async (req, res) => {
  const notes = await Note.find({
    userId: req.user._id,
    isDeleted: true,
  }).sort({ updatedAt: -1 });
  res.json({ success: true, count: notes.length, notes });
};

export const restoreNote = async (req, res) => {
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id, isDeleted: true },
    { isDeleted: false },
    { new: true }
  );
  if (!note) {
    return res
      .status(404)
      .json({ success: false, message: "Note not found" });
  }
  res.json({ success: true, note });
};
export const deleteForever = async (req, res) => {
  const note = await Note.findOneAndDelete({
    _id: req.params.id,
    userId: req.user._id,
    isDeleted: true,
  });
  if (!note) {
    return res
      .status(404)
      .json({ success: false, message: "Note not found" });
  }
  res.json({ success: true, message: "Note permanently deleted" });
};
export const getStats = async (req, res) => {
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [result] = await Note.aggregate([
    // Only this user's notes that are not in the trash
    { $match: { userId: req.user._id, isDeleted: false } },
    {
      // Run three separate summaries on the same matched notes
      $facet: {
        totals: [
          {
            $group: {
              _id: null,
              total: { $sum: 1 },
              archived: { $sum: { $cond: ["$isArchived", 1, 0] } },
              pinned: { $sum: { $cond: ["$isPinned", 1, 0] } },
              thisWeek: {
                $sum: { $cond: [{ $gte: ["$createdAt", weekAgo] }, 1, 0] },
              },
            },
          },
        ],
        byPriority: [{ $group: { _id: "$priority", count: { $sum: 1 } } }],
        byTag: [
          { $unwind: "$tags" },
          { $group: { _id: "$tags", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 10 },
        ],
      },
    },
  ]);

  const totals = result.totals[0] || {
    total: 0,
    archived: 0,
    pinned: 0,
    thisWeek: 0,
  };

  const byPriority = { low: 0, normal: 0, important: 0, urgent: 0 };
  result.byPriority.forEach((item) => {
    byPriority[item._id] = item.count;
  });

  res.json({
    success: true,
    stats: {
      total: totals.total,
      archived: totals.archived,
      pinned: totals.pinned,
      thisWeek: totals.thisWeek,
      byPriority,
      byTag: result.byTag.map((item) => ({ tag: item._id, count: item.count })),
    },
  });
};