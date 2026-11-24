import { useEffect, useState } from "react";
import { FiRotateCcw, FiTrash2 } from "react-icons/fi";
import api from "../api/axios";
import NoteCard from "../components/NoteCard";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import EmptyState from "../components/ui/EmptyState";
import ErrorMessage from "../components/ui/ErrorMessage";

const Trash = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // load the deleted notes once, when the page opens
  useEffect(() => {
    api
      .get("/notes/trash")
      .then((res) => setNotes(res.data.notes))
      .catch((err) =>
        setError(err.response?.data?.message || "Could not load trash")
      )
      .finally(() => setLoading(false));
  }, []);

  // remove a note from the list on screen
  const removeFromList = (id) =>
    setNotes((current) => current.filter((n) => n._id !== id));

  const handleRestore = async (id) => {
    try {
      setError("");
      await api.patch(`/notes/${id}/restore`);
      removeFromList(id);
    } catch (err) {
      setError(err.response?.data?.message || "Could not restore the note");
    }
  };

  const handleDeleteForever = async (id) => {
    if (!window.confirm("Delete this note forever? This cannot be undone.")) {
      return;
    }
    try {
      setError("");
      await api.delete(`/notes/${id}/permanent`);
      removeFromList(id);
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete the note");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Trash</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Restore a note or delete it forever.
        </p>
      </div>

      <ErrorMessage message={error} />

      {loading ? (
        <Loader text="Loading trash..." />
      ) : notes.length === 0 ? (
        <EmptyState
          title="Trash is empty"
          text="Deleted notes will show up here."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note}>
              <div className="flex gap-2 pt-1">
                <Button
                  variant="secondary"
                  onClick={() => handleRestore(note._id)}
                >
                  <FiRotateCcw size={14} />
                  Restore
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteForever(note._id)}
                >
                  <FiTrash2 size={14} />
                  Delete forever
                </Button>
              </div>
            </NoteCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default Trash;
