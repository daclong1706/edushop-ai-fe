// src/pages/FavoritesPage.tsx
import React from "react";
import { useFavorites } from "@/hooks/useFavorites";
import { mockProducts } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import ProductListCard from "@/components/product/ProductListCard";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const FavoritesPage: React.FC = () => {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const isMobile = useBreakpoint() === "mobile";

  const favoriteProducts = mockProducts.filter((p) => favorites.includes(p.id));

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Sản phẩm yêu thích</h1>

      {favoriteProducts.length === 0 ? (
        <p className="text-gray-500">Bạn chưa yêu thích sản phẩm nào.</p>
      ) : isMobile ? (
        <div className="space-y-4">
          {favoriteProducts.map((product) => (
            <ProductListCard
              key={product.id}
              product={product}
              isLiked={isFavorite(product.id)}
              onLikeClick={() => toggleFavorite(product.id)}
              onDetailClick={() => {}}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isLiked={isFavorite(product.id)}
              onLikeClick={() => toggleFavorite(product.id)}
              onDetailClick={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
