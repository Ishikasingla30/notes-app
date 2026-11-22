const Loader = ({ text = "Loading..." }) => (
  <div className="flex items-center justify-center gap-3 p-8 text-slate-500 dark:text-slate-400">
    <span className="h-5 w-5 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
    <span className="text-sm">{text}</span>
  </div>
);

export default Loader;