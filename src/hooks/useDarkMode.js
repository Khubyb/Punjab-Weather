import { useEffect, useState } from "react";

const STORAGE_KEY = "pwp-theme";

/**
 * Reads/writes the user's theme preference and applies a
 * `data-theme="dark" | "light"` attribute to <html>, which the
 * CSS in index.css keys off of for all dark mode styling.
 */
export default function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
    localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
  }, [isDark]);

  return [isDark, setIsDark];
}
