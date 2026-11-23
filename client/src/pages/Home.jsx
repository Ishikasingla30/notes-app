import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PublicNavbar from "../components/PublicNavbar";

const features = [
  {
    title: "Notes that stay organised",
    text: "Write notes, add tags and find anything instantly with search and tag filters.",
  },
  {
    title: "Bookmarks, Archive & Trash",
    text: "Pin what matters, archive what you are done with, and restore anything you delete by mistake.",
  },
  {
    title: "Keep your files with you",
    text: "Upload PDFs, images and Word documents and keep them next to your notes.",
  },
  {
    title: "Easy on the eyes",
    text: "A clean layout that works in light and dark mode, on phone and desktop.",
  },
];

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <PublicNavbar />

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:py-28">
          <p className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 dark:bg-slate-800 dark:text-brand-500">
            Your notes. Your vault.
          </p>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
            Capture ideas. Keep them{" "}
            <span className="text-brand-600 dark:text-brand-500">safe</span>.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-400 sm:text-lg">
            ScriVault is a simple place to write notes, tag them, store your
            files and find everything again in seconds.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {user ? (
              <Link
                to="/dashboard"
                className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-brand-700"
              >
                Go to dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-brand-700"
                >
                  Get started free
                </Link>
                <Link
                  to="/login"
                  className="rounded-full bg-slate-100 px-6 py-2.5 text-sm font-medium text-slate-800 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-6xl px-4 pb-20">
          <h2 className="text-center text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Everything you need
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <h3 className="font-medium text-slate-900 dark:text-slate-100">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  {f.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
        &copy; {new Date().getFullYear()} ScriVault. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;