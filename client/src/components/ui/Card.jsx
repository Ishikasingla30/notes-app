const Card = ({ className = "", children, ...props }) => (
  <div
    className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export default Card;