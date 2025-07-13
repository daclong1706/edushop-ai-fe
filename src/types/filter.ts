// src/types/filter.ts

export type FilterType = "text" | "select" | "range";

// export interface FilterOption {
//   label: string;
//   value: string;
// }

// export interface RangeOption {
//   label: string;
//   min: number;
//   max: number;
// }

// export interface FilterDefinition {
//   key: keyof FilterState;
//   label: string;
//   type: FilterType;
//   options?: FilterOption[]; // for select
//   rangeOptions?: RangeOption[]; // for range
// }

export type FilterState = {
  type?: string[];
  category?: string[];
  level?: string;
  price?: [number, number];
  rating?: number;
};

export const initialFilterState: FilterState = {
  type: [],
  category: [],
  level: "",
  price: [0, 3000000],
  rating: 0,
};
