import React from "react";
import { Button } from "../ui/Button";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onDetailClick: (product: Product) => void;
  isLiked?: boolean;
  onLikeClick?: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onDetailClick,
  isLiked,
  onLikeClick,
}) => {
  return (
    <div className="p-4 rounded-lg shadow-md hover:shadow-xl transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded mb-3"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-600 mb-2">{product.description}</p>
      <p className="font-bold text-blue-600">
        {product.price.toLocaleString()} VND
      </p>

      <div className="mt-3 flex justify-between items-center">
        <Button onClick={() => onDetailClick(product)}>Xem chi tiết</Button>

        {onLikeClick && (
          <button onClick={() => onLikeClick(product.id)} className="text-xl">
            {isLiked ? "❤️" : "🤍"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
