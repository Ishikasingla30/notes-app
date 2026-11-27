import { FiEdit2, FiTrash2, FiBookmark, FiArchive } from "react-icons/fi";
import Card from "./ui/Card";
import Badge from "./ui/Badge";

// Colour of the strip on the left side of the card, one per priority
const stripColor = {
  urgent: "bg-red-500",
  important: "bg-amber-500",
  normal: "bg-sky-500",
  low: "bg-emerald-500",
};

// onEdit, onDelete, onPin, onArchive and onTagClick are optional.
// A button is shown only if its function is passed.
// children = anything extra to show at the bottom (Trash page uses this).
const NoteCard = ({
  note,
  onEdit,
  onDelete,
  onPin,
  onArchive,
  onTagClick,
  children,
}) => {
  const priority = note.priority || "normal";

  return (
    <Card className="relative flex flex-col gap-2 overflow-hidden">
      {/* priority colour strip */}
      <div
        className={`absolute left-0 top-0 h-full w-1.5 ${stripColor[priority]}`}
      />

      <div className="flex flex-col gap-2 pl-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 font-semibold">{note.title}</h3>
          {/* priority label */}
          <Badge type={priority}>{priority}</Badge>
        </div>

        {note.content && (
          <p className="line-clamp-4 whitespace-pre-line text-sm text-slate-600 dark:text-slate-300">
            {note.content}
          </p>
        )}

        {note.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {note.tags.map((tag) =>
              onTagClick ? (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onTagClick(tag)}
                  aria-label={`Filter by ${tag}`}
                >
                  <Badge>#{tag}</Badge>
                </button>
              ) : (
                <Badge key={tag}>#{tag}</Badge>
              )
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-1 text-xs text-slate-400">
          <span>
            {note.wordCount} words ·{" "}
            {new Date(note.updatedAt).toLocaleDateString()}
          </span>

          <div className="flex items-center gap-1">
            {onPin && (
              <button
                onClick={() => onPin(note._id)}
                aria-label={note.isPinned ? "Unpin note" : "Pin note"}
                className={`rounded-full p-1.5 transition hover:bg-slate-100 dark:hover:bg-slate-800 ${
                  note.isPinned ? "text-brand-600" : "text-slate-500"
                }`}
              >
                <FiBookmark
                  size={16}
                  className={note.isPinned ? "fill-current" : ""}
                />
              </button>
            )}
            {onArchive && (
              <button
                onClick={() => onArchive(note._id)}
                aria-label="Archive note"
                className="rounded-full p-1.5 text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <FiArchive size={16} />
              </button>
            )}
            {onEdit && (
              <button
                onClick={() => onEdit(note)}
                aria-label="Edit note"
                className="rounded-full p-1.5 text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <FiEdit2 size={16} />
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(note._id)}
                aria-label="Delete note"
                className="rounded-full p-1.5 text-slate-500 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-slate-800"
              >
                <FiTrash2 size={16} />
              </button>
            )}
          </div>
        </div>

        {children}
      </div>
    </Card>
  );
};

export default NoteCard;
