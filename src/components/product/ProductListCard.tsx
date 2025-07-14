import type { Product } from "@/types/product";
import React from "react";
import { MdChevronRight } from "react-icons/md";
import { StarRating } from "../ui/StarRating";
import Text from "../ui/Text";
import Skeleton from "../ui/Skeleton";

interface ProductListCardProps {
  product?: Product;
  onDetailClick?: (product: Product) => void;
  isLiked?: boolean;
  onLikeClick?: (productId: string) => void;
  loading?: boolean;
}

const ProductListCard: React.FC<ProductListCardProps> = ({
  product,
  onDetailClick,
  isLiked,
  onLikeClick,
  loading = false,
}) => {
  return (
    <div className="flex gap-4 py-3 border-b border-gray-300 mx-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
      {/* Image */}
      <div className="w-24 h-24 rounded bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0">
        {loading ? (
          <Skeleton width="w-24" height="h-24" />
        ) : (
          <img
            src={product?.image}
            alt={product?.name}
            className="w-full h-full object-cover rounded"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          {/* Title */}
          <h3 className="text-base font-semibold line-clamp-1">
            {loading ? <Skeleton width="w-3/4" height="h-5" /> : product?.name}
          </h3>

          {/* Description */}
          <div className="mt-1">
            {loading ? (
              <>
                <Skeleton />
                <Skeleton width="w-2/3" />
              </>
            ) : (
              <Text
                text={product?.description || ""}
                className="text-sm text-gray-600 line-clamp-2"
              />
            )}
          </div>

          {/* Rating */}
          <div className="mt-1">
            {loading ? (
              <Skeleton width="w-24" height="h-5" />
            ) : (
              product && (
                <StarRating
                  rating={product.rating}
                  countRating={product.countRating}
                />
              )
            )}
          </div>
        </div>

        {/* Price & Actions */}
        <div className="flex justify-between items-center pt-2">
          {loading ? (
            <Skeleton width="w-20" height="h-4" />
          ) : (
            <span className="text-primary font-bold text-sm">
              {product?.price.toLocaleString()} VND
            </span>
          )}

          {!loading && (
            <div
              onClick={() => product && onDetailClick?.(product)}
              className="flex items-center text-sm text-primary font-medium cursor-pointer hover:text-primary-hover"
            >
              <span>Xem chi tiết</span>
              <MdChevronRight className="w-4 h-4 ml-1" />
            </div>
          )}

          {!loading && product && onLikeClick && (
            <button
              onClick={() => onLikeClick(product?.id)}
              className="text-lg"
            >
              {isLiked ? "❤️" : "🤍"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListCard;
