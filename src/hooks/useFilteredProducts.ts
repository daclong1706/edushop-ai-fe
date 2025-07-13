import { useMemo } from "react";
import type { Product } from "@/types/product";
import type { FilterState } from "@/types/filter";

export type SortOption = "priceAsc" | "priceDesc" | "ratingDesc" | "newest";

export const useFilteredProducts = (
  products: Product[],
  filters: FilterState,
  searchText: string,
  sort: SortOption,
  currentPage: number,
  pageSize: number
) => {
  const filtered = useMemo(() => {
    return products.filter((product) => {
      if (
        searchText &&
        !product.name.toLowerCase().includes(searchText.toLowerCase())
      )
        return false;

      if (
        filters.type &&
        filters.type.length &&
        !filters.type.includes(product.type)
      )
        return false;

      if (
        filters.category &&
        filters.category.length &&
        !filters.category.includes(product.category)
      )
        return false;

      if (filters.level && product.level !== filters.level) return false;

      if (
        filters.price &&
        (product.price < filters.price[0] || product.price > filters.price[1])
      )
        return false;

      if (filters.rating !== undefined && product.rating < filters.rating)
        return false;

      return true;
    });
  }, [products, filters, searchText]);

  const sorted = useMemo(() => {
    switch (sort) {
      case "priceAsc":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "priceDesc":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "ratingDesc":
        return [...filtered].sort((a, b) => b.rating - a.rating);
      case "newest":
      default:
        return filtered;
    }
  }, [filtered, sort]);

  const total = sorted.length;
  const paginated = sorted.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return { products: paginated, total };
};
