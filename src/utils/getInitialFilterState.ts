// src/utils/getInitialFilterState.ts

import type { FilterState } from "@/types/filter";
import { filterConfig } from "@/config/filterConfig";

// Hàm khởi tạo FilterState mặc định từ filterConfig
export const getInitialFilterState = (): FilterState => {
  const state = {} as FilterState;

  filterConfig.forEach((filter) => {
    if (filter.type === "range") {
      state[filter.key] = [0, Infinity];
    } else {
      state[filter.key] = "";
    }
  });

  return state;
};
