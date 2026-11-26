import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiSun, FiMoon, FiGithub } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const linkClass = ({ isActive }) =>
  `text-sm font-medium transition hover:text-brand-600 dark:hover:text-brand-500 ${
    isActive
      ? "text-brand-600 dark:text-brand-500"
      : "text-slate-600 dark:text-slate-300"
  }`;

const buttonBase =
  "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition";

const iconBtn =
  "rounded-full p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Ishikasingla30/notes-app",
    icon: FiGithub,
  },
];

const PublicNavbar = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          to="/"
          className="text-lg font-semibold text-slate-900 dark:text-slate-100"
        >
          Scri<span className="text-brand-600 dark:text-brand-500">Vault</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 sm:flex">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>

          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className={iconBtn}
            >
              <Icon size={18} />
            </a>
          ))}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={iconBtn}
          >
            {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {user ? (
            <Link
              to="/dashboard"
              className={`${buttonBase} bg-brand-600 text-white hover:bg-brand-700`}
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className={`${buttonBase} text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`${buttonBase} bg-brand-600 text-white hover:bg-brand-700`}
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-1 sm:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={iconBtn}
          >
            {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {open ? (
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 dark:border-slate-800 sm:hidden">
          <NavLink to="/" end className={linkClass} onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/about" className={linkClass} onClick={() => setOpen(false)}>
            About
          </NavLink>
          {user ? (
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className={`${buttonBase} bg-brand-600 text-white hover:bg-brand-700`}
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className={`${buttonBase} bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700`}
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className={`${buttonBase} bg-brand-600 text-white hover:bg-brand-700`}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default PublicNavbar;