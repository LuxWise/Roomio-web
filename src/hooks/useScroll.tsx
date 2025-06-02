import { create } from "zustand";

interface ScrollState {
  scroll: boolean;
  setScroll: (scroll: boolean) => void;
  toggleScroll: () => void;
}

const useScroll = create<ScrollState>(set => ({
  scroll: false,
  setScroll: scroll => {
    set({ scroll });
  },
  toggleScroll: () => {
    set(state => {
      return { scroll: !state };
    });
  },
}));

export default useScroll;
