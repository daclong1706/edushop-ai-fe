import { mockProducts } from "@/data/products";
import { getFavorites } from "@/utils/favoriteStorage";
import { getViewedProducts } from "@/utils/viewedStorage";
import { getCartItems } from "@/utils/cartStorage"; // bạn sẽ tạo file này

import type { Product } from "@/types/product";

export async function fetchSuggestions(userId: string): Promise<Product[]> {
  const favorites = getFavorites();
  const viewed = getViewedProducts();
  const cart = getCartItems();

  const all = [
    ...favorites,
    ...viewed.map((v) => v.product),
    ...cart.map((c) => c.product),
  ];

  if (all.length === 0) {
    // fallback nếu chưa có hành vi
    return mockProducts
      .filter((p) => p.rating >= 4.5 && p.countRating >= 100)
      .slice(0, 6);
  }

  const categoryScore = new Map<string, number>();
  const tagScore = new Map<string, number>();

  for (const p of all) {
    categoryScore.set(p.category, (categoryScore.get(p.category) || 0) + 1);
    for (const tag of p.tags) {
      tagScore.set(tag, (tagScore.get(tag) || 0) + 1);
    }
  }

  const usedIds = new Set(all.map((p) => p.id));
  const scored: { product: Product; score: number }[] = [];

  for (const product of mockProducts) {
    if (usedIds.has(product.id)) continue;

    let score = 0;
    score += (categoryScore.get(product.category) || 0) * 2;
    for (const tag of product.tags) {
      score += tagScore.get(tag) || 0;
    }
    score += product.rating;

    if (score > 0) {
      scored.push({ product, score });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 6).map((s) => s.product);
}
