const EmptyState = ({ title, text, action }) => (
  <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">
    <h3 className="text-lg font-semibold">{title}</h3>
    {text && (
      <p className="text-sm text-slate-500 dark:text-slate-400">{text}</p>
    )}
    {action}
  </div>
);

export default EmptyState;