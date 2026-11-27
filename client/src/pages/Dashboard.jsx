import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiX } from "react-icons/fi";
import useNotes from "../hooks/useNotes";
import useDebounce from "../hooks/useDebounce";
import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";
import StatsCards from "../components/StatsCards";
import Loader from "../components/ui/Loader";
import EmptyState from "../components/ui/EmptyState";
import ErrorMessage from "../components/ui/ErrorMessage";

const Dashboard = () => {
  const [params, setParams] = useSearchParams();
  // the header search bar puts the text in the URL as ?q=...
  const search = params.get("q") || "";
  const debouncedSearch = useDebounce(search);
  const [tag, setTag] = useState("");

  const {
    notes,
    loading,
    error,
    addNote,
    updateNote,
    deleteNote,
    togglePin,
    toggleArchive,
  } = useNotes({ search: debouncedSearch, tag });

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null); // note being edited, or null
  const [actionError, setActionError] = useState("");

  // the header "New note" button sends us here with ?new=1
  const showForm = formOpen || params.get("new") === "1";

  const openEdit = (note) => {
    setEditing(note);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
    if (params.get("new")) {
      const next = new URLSearchParams(params);
      next.delete("new");
      setParams(next, { replace: true });
    }
  };

  const handleSave = async (data) => {
    if (editing) await updateNote(editing._id, data);
    else await addNote(data);
    closeForm();
  };

  // runs delete / pin / archive and shows an error if it fails
  const run = (action) => async (id) => {
    try {
      setActionError("");
      await action(id);
    } catch (err) {
      setActionError(err.response?.data?.message || "Something went wrong");
    }
  };

  const filtered = Boolean(debouncedSearch || tag);

  return (
    <div className="space-y-6">
      <StatsCards
        refreshKey={`${notes.length}-${notes.filter((n) => n.isPinned).length}`}
      />

      {tag && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-500 dark:text-slate-400">Filtering by</span>
          <button
            type="button"
            onClick={() => setTag("")}
            className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1 font-medium text-brand-700 dark:bg-slate-800 dark:text-brand-100"
          >
            #{tag}
            <FiX size={14} />
          </button>
        </div>
      )}

      <ErrorMessage message={error || actionError} />

      {loading && notes.length === 0 ? (
        <Loader text="Loading notes..." />
      ) : notes.length === 0 ? (
        <EmptyState
          title={filtered ? "No notes found" : "No notes yet"}
          text={
            filtered
              ? "Try a different search or tag."
              : "Click New note to write your first one."
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={openEdit}
              onDelete={run(deleteNote)}
              onPin={run(togglePin)}
              onArchive={run(toggleArchive)}
              onTagClick={setTag}
            />
          ))}
        </div>
      )}

      {showForm && (
        <NoteForm note={editing} onSave={handleSave} onClose={closeForm} />
      )}
    </div>
  );
};

export default Dashboard;