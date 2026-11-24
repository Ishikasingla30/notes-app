import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import Button from "./ui/Button";
import Input from "./ui/Input";
import ErrorMessage from "./ui/ErrorMessage";

const priorities = ["low", "normal", "important", "urgent"];

// note    = the note to edit (leave it out to create a new note)
// onSave  = async function that receives { title, content, tags, priority }
// onClose = called to close the modal
const NoteForm = ({ note, onSave, onClose }) => {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [tags, setTags] = useState((note?.tags || []).join(", "));
  const [priority, setPriority] = useState(note?.priority || "normal");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Close the modal when the Escape key is pressed
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setSaving(true);
    setError("");
    try {
      await onSave({
        title: title.trim(),
        content,
        priority,
        // "work, study" -> ["work", "study"]
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      });
    } catch (err) {
      setError(err.response?.data?.message || "Could not save the note");
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-full w-full max-w-lg flex-col gap-4 overflow-y-auto rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {note ? "Edit note" : "New note"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <FiX size={18} />
          </button>
        </div>

        <ErrorMessage message={error} />

        <Input
          id="note-title"
          label="Title"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />

        <div className="flex flex-col gap-1">
          <label
            htmlFor="note-content"
            className="text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Content
          </label>
          <textarea
            id="note-content"
            rows={6}
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>

        <Input
          id="note-tags"
          label="Tags (separate with commas)"
          placeholder="work, study, ideas"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <div className="flex flex-col gap-1">
          <label
            htmlFor="note-priority"
            className="text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Priority
          </label>
          <select
            id="note-priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm capitalize outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            {priorities.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save note"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
