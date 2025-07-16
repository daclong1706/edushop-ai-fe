// src/types/filter.ts

export type FilterState = {
  type?: string[];
  category?: string[];
  level?: string;
  price?: string[];
  rating?: number;
};

export const initialFilterState: FilterState = {
  type: [],
  category: [],
  level: "",
  price: [],
  rating: 0,
};
