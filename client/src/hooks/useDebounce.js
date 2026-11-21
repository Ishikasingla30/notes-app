import { useEffect, useState } from "react";

// Returns a value that only updates after the user stops changing it.
// Used for the search bar, so we do not call the API on every keystroke.
export default function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}