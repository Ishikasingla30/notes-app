import { useTheme } from "./context/ThemeContext";

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-brand-600">ScriVault</h1>
      <button
        onClick={toggleTheme}
        className="mt-4 rounded-full bg-brand-600 px-4 py-2 text-white hover:bg-brand-700"
      >
        Switch to {theme === "dark" ? "light" : "dark"} mode
      </button>
    </div>
  );
}

export default App;