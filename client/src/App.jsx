import { useTheme } from "./context/ThemeContext";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import Card from "./components/ui/Card";
import Badge from "./components/ui/Badge";

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="mx-auto max-w-md space-y-4 p-8">
      <h1 className="text-3xl font-bold text-brand-600">ScriVault</h1>

      <Button onClick={toggleTheme}>
        Switch to {theme === "dark" ? "light" : "dark"} mode
      </Button>

      <Input id="title" label="Title" placeholder="Note title" />

      <Card>
        <div className="mb-2 flex gap-2">
          <Badge type="urgent">urgent</Badge>
          <Badge type="important">important</Badge>
          <Badge type="normal">normal</Badge>
          <Badge type="low">low</Badge>
        </div>
        <p className="text-sm">Sample note card</p>
      </Card>
    </div>
  );
}

export default App;