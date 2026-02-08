"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const resolved = theme === "system" ? systemTheme : theme;
  const isDark = resolved === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="card-glass rounded-full px-3 py-2 text-sm"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
