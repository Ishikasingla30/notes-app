import { useState } from "react";
import { FiSearch, FiPlus } from "react-icons/fi";
import useNotes from "../hooks/useNotes";
import useDebounce from "../hooks/useDebounce";
import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";
import StatsCards from "../components/StatsCards";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import EmptyState from "../components/ui/EmptyState";
import ErrorMessage from "../components/ui/ErrorMessage";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  // wait until the user stops typing before calling the API
  const debouncedSearch = useDebounce(search);

  const {
    notes,
    loading,
    error,
    addNote,
    updateNote,
    deleteNote,
    togglePin,
    toggleArchive,
  } = useNotes({ search: debouncedSearch });

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null); // note being edited, or null
  const [actionError, setActionError] = useState("");

  const openNew = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (note) => {
    setEditing(note);
    setFormOpen(true);
  };

  const closeForm = () => setFormOpen(false);

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

  return (
    <div className="space-y-6">
      <StatsCards refreshKey={notes.length} />

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your notes..."
            className="w-full rounded-full border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-900"
          />
        </div>
        <Button onClick={openNew}>
          <FiPlus size={16} />
          <span className="hidden sm:inline">New note</span>
        </Button>
      </div>

      <ErrorMessage message={error || actionError} />

      {loading && notes.length === 0 ? (
        <Loader text="Loading notes..." />
      ) : notes.length === 0 ? (
        <EmptyState
          title={search ? "No notes found" : "No notes yet"}
          text={
            search
              ? "Try a different search."
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
            />
          ))}
        </div>
      )}

      {formOpen && (
        <NoteForm note={editing} onSave={handleSave} onClose={closeForm} />
      )}
    </div>
  );
};

export default Dashboard;
