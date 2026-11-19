import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

const Placeholder = ({ title }) => (
  <h1 className="p-4 text-2xl font-bold text-brand-600">{title}</h1>
);

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Placeholder title="Login" />} />
      <Route path="/register" element={<Placeholder title="Register" />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Placeholder title="Dashboard" />} />
          <Route path="/bookmarks" element={<Placeholder title="Bookmarks" />} />
          <Route path="/tags" element={<Placeholder title="Tags" />} />
          <Route path="/files" element={<Placeholder title="My Files" />} />
          <Route path="/archive" element={<Placeholder title="Archive" />} />
          <Route path="/trash" element={<Placeholder title="Trash" />} />
          <Route path="/profile" element={<Placeholder title="Profile" />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;