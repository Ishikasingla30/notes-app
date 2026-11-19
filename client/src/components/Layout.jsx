import { NavLink, Outlet } from "react-router-dom";
import {
  FiGrid,
  FiBookmark,
  FiTag,
  FiFolder,
  FiArchive,
  FiTrash2,
  FiUser,
  FiSearch,
  FiPlus,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import Button from "./ui/Button";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: FiGrid },
  { to: "/bookmarks", label: "Bookmarks", icon: FiBookmark },
  { to: "/tags", label: "Tags", icon: FiTag },
  { to: "/files", label: "My Files", icon: FiFolder },
  { to: "/archive", label: "Archive", icon: FiArchive },
  { to: "/trash", label: "Trash", icon: FiTrash2 },
  { to: "/profile", label: "Profile", icon: FiUser },
];

const Layout = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex min-h-screen">
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 md:flex">
        <div className="mb-6 px-2 text-xl font-bold text-brand-600">
          ScriVault
        </div>

        <nav className="flex flex-col gap-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-brand-50 text-brand-700 dark:bg-slate-800 dark:text-brand-100"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search notes"
              className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          <Button>
            <FiPlus size={16} />
            <span className="hidden sm:inline">New note</span>
          </Button>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">
            I
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;