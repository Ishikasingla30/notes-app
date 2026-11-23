import { Link } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";

const highlights = [
  "Create, edit and tag notes",
  "Search and filter by tag",
  "Bookmark, archive and restore from trash",
  "Upload and manage PDF, image and DOCX files",
  "Secure login for every user",
];

const stack = ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Cloudinary"];

const team = ["Ishika", "Khushleen", "Nandini"];

const About = () => (
  <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
    <PublicNavbar />

    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
        About ScriVault
      </h1>
      <p className="mt-4 text-slate-600 dark:text-slate-400">
        ScriVault is a notes app built to keep your thoughts and files in one
        calm, organised place. Write quickly, tag what matters, and find it
        again whenever you need it.
      </p>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          What you can do
        </h2>
        <ul className="mt-4 flex flex-col gap-2">
          {highlights.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300"
            >
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-600 dark:bg-brand-500" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Built with
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {stack.map((s) => (
            <span
              key={s}
              className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 dark:bg-slate-800 dark:text-brand-500"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          The team
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          {team.join(", ")}
        </p>
      </section>

      <div className="mt-10 text-center">
        <Link
          to="/register"
          className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-brand-700"
        >
          Try ScriVault
        </Link>
      </div>
    </main>
  </div>
);

export default About;