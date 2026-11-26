import { useState } from "react";
import useNotes from "../hooks/useNotes";
import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";
import Loader from "../components/ui/Loader";
import EmptyState from "../components/ui/EmptyState";
import ErrorMessage from "../components/ui/ErrorMessage";

const Bookmarks = () => {
  const { notes, loading, error, updateNote, deleteNote, togglePin, toggleArchive } =
    useNotes({ pinned: true });
  const [editing, setEditing] = useState(null);
  const [actionError, setActionError] = useState("");

  const run = (action) => async (id) => {
    try {
      setActionError("");
      await action(id);
    } catch (err) {
      setActionError(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleSave = async (data) => {
    await updateNote(editing._id, data);
    setEditing(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Bookmarks</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Your pinned notes.
        </p>
      </div>

      <ErrorMessage message={error || actionError} />

      {loading && notes.length === 0 ? (
        <Loader text="Loading bookmarks..." />
      ) : notes.length === 0 ? (
        <EmptyState
          title="No bookmarks yet"
          text="Pin a note from the dashboard and it will show up here."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={setEditing}
              onDelete={run(deleteNote)}
              onPin={run(togglePin)}
              onArchive={run(toggleArchive)}
            />
          ))}
        </div>
      )}

      {editing && (
        <NoteForm
          note={editing}
          onSave={handleSave}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
};

export default Bookmarks;