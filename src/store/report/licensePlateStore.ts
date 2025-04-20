import { create } from "zustand";
import { ImageContent } from "@constants/imageContent";

interface LicensePlateStore {
  images: ImageContent[];
  setImage: (id: number, uri: string, height: number, width: number) => void;
  clearImages: () => void;
}

const defaultInitializedImages = Array.from({ length: 1 }, (_, i) => ({
  id: i,
  uri: "",
  height: 0,
  width: 0,
}));

export const useLicensePlateStore = create<LicensePlateStore>((set) => ({
  images: [...defaultInitializedImages],

  setImage: (id, uri, height, width) => {
    set((state) => ({
      images: state.images.map((img) =>
        img.id === id ? { ...img, uri, height, width } : img
      ),
    }));
  },

  clearImages: () => {
    set({images: [...defaultInitializedImages]})
  },
}));
