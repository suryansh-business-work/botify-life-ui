import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

type ThemeContextType = {
  selectedThemeId: string;
  setSelectedThemeId: (id: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

import API_LIST from "../../../apiList";
const API_BASE = API_LIST.DESIGN_SYSTEM_BASE;

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [selectedThemeId, setSelectedThemeId] = useState<string>("");

  // On mount, fetch the selected theme from API
  useEffect(() => {
    const fetchSelectedTheme = async () => {
      try {
        const res = await axios.get(`${API_BASE}/get`);
        if (Array.isArray(res.data.data)) {
          const selectedTheme = res.data.data.find((t: any) => t.selected === true);
          if (selectedTheme) {
            setSelectedThemeId(selectedTheme.themeId);
          } else if (res.data.data.length > 0) {
            setSelectedThemeId(res.data.data[0].themeId);
          }
        }
      } catch {
        // fallback: do nothing
      }
    };
    fetchSelectedTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ selectedThemeId, setSelectedThemeId }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for easy access
export function useAppTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useAppTheme must be used within a ThemeProvider");
  return ctx;
}
