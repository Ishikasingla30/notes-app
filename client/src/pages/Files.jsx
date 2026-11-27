import { useEffect, useRef, useState } from "react";
import api from "../api/axios";
import Button from "../components/ui/Button";

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB, same as the server
const ALLOWED_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const formatSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const typeLabel = (mimeType) => {
  if (mimeType === "application/pdf") return "PDF";
  if (mimeType === "image/png") return "PNG";
  if (mimeType === "image/jpeg") return "JPG";
  return "DOCX";
};

const Files = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    api
      .get("/files")
      .then((res) => setFiles(res.data.files))
      .catch((err) =>
        setError(err.response?.data?.message || "Could not load your files.")
      )
      .finally(() => setLoading(false));
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError("");
    setSuccess("");

    // Check on the client first so the user gets instant feedback
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Only PDF, PNG, JPG and DOCX files are allowed.");
      e.target.value = "";
      return;
    }
    if (file.size > MAX_SIZE) {
      setError("File is too large. Maximum size is 5 MB.");
      e.target.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      const res = await api.post("/files", formData);
      setFiles((prev) => [res.data.file, ...prev]);
      setSuccess(`"${file.name}" uploaded.`);
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleDelete = async (file) => {
    if (!window.confirm(`Delete "${file.originalName}"? This cannot be undone.`))
      return;

    setError("");
    setSuccess("");
    setDeletingId(file._id);
    try {
      await api.delete(`/files/${file._id}`);
      setFiles((prev) => prev.filter((f) => f._id !== file._id));
      setSuccess("File deleted.");
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete the file.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            My Files
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            PDF, PNG, JPG or DOCX, up to 5 MB each
          </p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.docx"
          onChange={handleUpload}
          className="hidden"
        />
        <Button onClick={() => inputRef.current.click()} disabled={uploading}>
          {uploading ? "Uploading..." : "Upload file"}
        </Button>
      </div>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">
          {error}
        </p>
      )}
      {success && (
        <p className="mt-4 rounded-lg bg-brand-50 px-3 py-2 text-sm text-brand-700 dark:bg-slate-800 dark:text-brand-500">
          {success}
        </p>
      )}

      <div className="mt-6">
        {loading ? (
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Loading your files...
          </p>
        ) : files.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">
            <p className="font-medium text-slate-900 dark:text-slate-100">
              No files yet
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Click "Upload file" to add your first one.
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {files.map((file) => (
              <li
                key={file._id}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-xs font-semibold text-brand-700 dark:bg-slate-800 dark:text-brand-500">
                  {typeLabel(file.mimeType)}
                </span>

                <div className="min-w-0 flex-1">
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block truncate font-medium text-slate-900 hover:underline dark:text-slate-100"
                  >
                    {file.originalName}
                  </a>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {formatSize(file.size)} &middot; {formatDate(file.createdAt)}
                  </p>
                </div>

                <Button
                  variant="danger"
                  onClick={() => handleDelete(file)}
                  disabled={deletingId === file._id}
                >
                  {deletingId === file._id ? "Deleting..." : "Delete"}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Files;