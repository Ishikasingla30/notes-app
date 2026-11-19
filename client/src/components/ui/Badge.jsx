const styles = {
  urgent: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  important: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  normal: "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
  low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  neutral: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
};

const Badge = ({ type = "neutral", children }) => (
  <span
    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${styles[type]}`}
  >
    {children}
  </span>
);

export default Badge;