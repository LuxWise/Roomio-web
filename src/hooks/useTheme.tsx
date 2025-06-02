import { create } from "zustand";

interface ThemeState {
  theme: boolean;
  setTheme: (theme: boolean) => void;
  toggleTheme: () => void;
}

const useTheme = create<ThemeState>(set => ({
  theme: true,

  setTheme: theme => {
    localStorage.setItem("theme", JSON.stringify(theme));
    set({ theme });
  },

  toggleTheme: () =>
    set(state => {
      localStorage.setItem("theme", JSON.stringify(!state.theme));
      return { theme: !state.theme };
    }),
}));

export default useTheme;
