import { useEffect, useState } from "react";
import api from "../api/axios";
import Card from "./ui/Card";
import Badge from "./ui/Badge";
import Loader from "./ui/Loader";
import ErrorMessage from "./ui/ErrorMessage";

// refreshKey: pass notes.length from the dashboard so the cards update
// after a note is added or removed
const StatsCards = ({ refreshKey }) => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/notes/stats")
      .then((res) => setStats(res.data.stats))
      .catch((err) =>
        setError(err.response?.data?.message || "Could not load stats")
      );
  }, [refreshKey]);

  if (error) return <ErrorMessage message={error} />;
  if (!stats) return <Loader />;

  const cards = [
    { label: "Total notes", value: stats.total },
    { label: "Urgent", value: stats.byPriority.urgent },
    { label: "Pinned", value: stats.pinned },
    { label: "This week", value: stats.thisWeek },
  ];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {cards.map(({ label, value }) => (
          <Card key={label}>
            <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
            <p className="mt-1 text-3xl font-bold text-brand-600">{value}</p>
          </Card>
        ))}
      </div>

      {stats.byTag.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Top tags:
          </span>
          {stats.byTag.map(({ tag, count }) => (
            <Badge key={tag}>
              {tag} ({count})
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatsCards;