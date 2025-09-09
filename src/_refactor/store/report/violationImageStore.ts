import { create } from "zustand";
import { ImageContent } from "_refactor/constants/imageContent";

interface ViolationImageStore {
  images: ImageContent[];
  setImage: (id: number, uri: string, height: number, width: number) => void;
  deleteAndShift: (id: number) => void;
  clearImages: () => void;
}

const defaultViolationImages = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  uri: "",
  height: 0,
  width: 0,
}));

export const useViolationImageStore = create<ViolationImageStore>((set) => ({
  images: [...defaultViolationImages],

  setImage: (id, uri, height, width) => {
    set((state) => ({
      images: state.images.map((img) =>
        img.id === id ? { ...img, uri, height, width } : img
      ),
    }));
  },

  deleteAndShift: (id: number) => {
    console.log("here");

    set((state) => {
      const remaining = state.images
        .filter((img) => img.id !== id && img.uri !== "")
        .map((img) => ({ ...img }));

      console.log("there");

      const shifted = state.images.map((img, i) => ({
        ...img,
        uri: remaining[i]?.uri || "",
        height: remaining[i]?.height || 0,
        width: remaining[i]?.width || 0,
      }));

      console.log("done");

      return { images: shifted };
    });
  },

  clearImages: () => {
    set({ images: [...defaultViolationImages] });
  },
}));
