import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Theme = {
  id: number;
  name: string;
  bg: string;    
  bold: string;  
  text: string;  
};

const STORAGE_KEY = "@theme";

const THEMES: Theme[] = [
  { id: 1, name: "Purple", bg: "#8b76f5", bold: "#7d26ff", text: "#ffffff", },
  { id: 2, name: "White",  bg: "#f8f8f8", bold: "#e6e6e6", text: "#1f1f1f", },
  { id: 3, name: "Black",  bg: "#1c1c1b", bold: "#303030", text: "#ffffff", },
  { id: 4, name: "Red",    bg: "#fa5f5f", bold: "#ff2626", text: "#ffffff", },
  { id: 5, name: "Blue",   bg: "#c9e4f5", bold: "#95c8e6", text: "#1f1f1f", },
  { id: 6, name: "Orange", bg: "#f5ddc9", bold: "#f5cba9", text: "#1f1f1f", },
];

const DEFAULT_THEME = THEMES[0];

type Ctx = {
  theme: Theme;
  setThemeById: (id: number) => void;
  themes: Theme[];
};

const ThemeContext = createContext<Ctx>({
  theme: DEFAULT_THEME,
  setThemeById: () => {},
  themes: THEMES,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);

  
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const saved = JSON.parse(raw) as Theme;
          const found = THEMES.find(t => t.id === saved.id) ?? DEFAULT_THEME;
          setTheme(found);
        }
      } catch {}
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(theme)).catch(() => {});
  }, [theme]);

  const setThemeById = (id: number) => {
    const found = THEMES.find(t => t.id === id);
    if (found) setTheme(found);
  };

  const value = useMemo(() => ({ theme, setThemeById, themes: THEMES }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
