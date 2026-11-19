import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true },
    content: { type: String, default: "" },
    tags: [{ type: String, trim: true }],
    color: { type: String, default: "#ffffff" },
    isPinned: { type: Boolean, default: false },
    isArchived: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    priority: {
      type: String,
      enum: ["low", "normal", "important", "urgent"],
      default: "normal",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Text index: allows full-text search on title and content
noteSchema.index({ title: "text", content: "text" });

// Compound index: speeds up the main dashboard query
// (a user's notes, pinned first, newest first)
noteSchema.index({ userId: 1, isPinned: -1, updatedAt: -1 });

// Virtual field: calculated on the fly, not stored in the database
noteSchema.virtual("wordCount").get(function () {
  const text = (this.content || "").trim();
  return text ? text.split(/\s+/).length : 0;
});

// Pre-save middleware: clean the tags before saving
// (lowercase, trimmed, no empty values, no duplicates)
noteSchema.pre("save", function () {
  if (this.isModified("tags")) {
    this.tags = [
      ...new Set(
        this.tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean)
      ),
    ];
  }
});

export default mongoose.model("Note", noteSchema);