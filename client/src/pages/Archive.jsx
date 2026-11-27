import { useState } from "react";
import { FiRotateCcw, FiTrash2 } from "react-icons/fi";
import useNotes from "../hooks/useNotes";
import NoteCard from "../components/NoteCard";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import EmptyState from "../components/ui/EmptyState";
import ErrorMessage from "../components/ui/ErrorMessage";

const Archive = () => {
  const { notes, loading, error, deleteNote, toggleArchive } = useNotes({
    archived: true,
  });
  const [actionError, setActionError] = useState("");

  const run = (action) => async (id) => {
    try {
      setActionError("");
      await action(id);
    } catch (err) {
      setActionError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Archive</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Notes you are done with. Unarchive them any time.
        </p>
      </div>

      <ErrorMessage message={error || actionError} />

      {loading && notes.length === 0 ? (
        <Loader text="Loading archive..." />
      ) : notes.length === 0 ? (
        <EmptyState
          title="Archive is empty"
          text="Archived notes will show up here."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note}>
              <div className="flex gap-2 pt-1">
                <Button
                  variant="secondary"
                  onClick={() => run(toggleArchive)(note._id)}
                >
                  <FiRotateCcw size={14} />
                  Unarchive
                </Button>
                <Button
                  variant="danger"
                  onClick={() => run(deleteNote)(note._id)}
                >
                  <FiTrash2 size={14} />
                  Move to trash
                </Button>
              </div>
            </NoteCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default Archive;