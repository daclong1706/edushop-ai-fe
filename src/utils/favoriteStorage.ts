import type { Product } from "@/types/product";

export const getFavorites = (): Product[] => {
  try {
    const raw = localStorage.getItem("favorites");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};
