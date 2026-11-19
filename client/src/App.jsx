import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

const Placeholder = ({ title }) => (
  <h1 className="text-2xl font-bold text-brand-600">{title}</h1>
);

function App() {
  return (
    <Routes>
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
    </Routes>
  );
}

export default App;