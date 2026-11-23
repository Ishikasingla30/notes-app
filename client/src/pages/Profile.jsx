import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initial = user?.name?.charAt(0)?.toUpperCase() || "?";
  const joined = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
        My Profile
      </h1>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        Your account details
      </p>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-600 text-2xl font-semibold text-white">
            {initial}
          </div>
          <div>
            <p className="text-lg font-medium text-slate-900 dark:text-slate-100">
              {user?.name}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {user?.email}
            </p>
          </div>
        </div>

        <dl className="mt-6 grid gap-4 border-t border-slate-200 pt-6 text-sm dark:border-slate-800 sm:grid-cols-2">
          <div>
            <dt className="text-slate-500 dark:text-slate-400">Name</dt>
            <dd className="mt-1 font-medium text-slate-900 dark:text-slate-100">
              {user?.name}
            </dd>
          </div>
          <div>
            <dt className="text-slate-500 dark:text-slate-400">Email</dt>
            <dd className="mt-1 font-medium text-slate-900 dark:text-slate-100">
              {user?.email}
            </dd>
          </div>
          {user?.role && (
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Role</dt>
              <dd className="mt-1">
                <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium capitalize text-brand-700 dark:bg-slate-800 dark:text-brand-500">
                  {user.role}
                </span>
              </dd>
            </div>
          )}
          {joined && (
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Member since</dt>
              <dd className="mt-1 font-medium text-slate-900 dark:text-slate-100">
                {joined}
              </dd>
            </div>
          )}
        </dl>

        <div className="mt-8">
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;