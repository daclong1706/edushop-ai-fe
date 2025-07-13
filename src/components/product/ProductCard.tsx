import type { Product } from "@/types/product";
import React from "react";
import { MdChevronRight } from "react-icons/md";
import { StarRating } from "../ui/StarRating";
import Text from "../ui/Text";
import Skeleton from "../ui/Skeleton";
import clsx from "clsx";

interface ProductCardProps {
  product?: Product;
  onDetailClick?: (product: Product) => void;
  isLiked?: boolean;
  onLikeClick?: (productId: number) => void;
  loading?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onDetailClick,
  isLiked,
  onLikeClick,
  loading = false,
}) => {
  return (
    <div
      className={clsx(
        "rounded-lg shadow-md transition duration-200",
        loading
          ? "animate-pulse bg-gray-100 dark:bg-gray-800"
          : "hover:shadow-xl"
      )}
    >
      {/* Image */}
      <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-t overflow-hidden">
        {!loading && product?.image && (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="py-4 px-6 space-y-2">
        {/* Title */}
        <h3 className="text-base font-semibold line-clamp-2 h-12">
          {loading ? <Skeleton width="w-3/4" height="h-5" /> : product?.name}
        </h3>

        {/* Description */}
        <div className="text-sm text-gray-600 dark:text-gray-400 tracking-tight line-clamp-2 space-y-1">
          {loading ? (
            <>
              <Skeleton />
              <Skeleton width="w-2/3" />
            </>
          ) : (
            <Text text={product?.description || ""} />
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

        {/* Price and Action */}
        <div className="mt-3 flex justify-between items-center border-t pt-3 border-gray-200 dark:border-gray-700">
          {loading ? (
            <Skeleton width="w-20" height="h-4" />
          ) : (
            <p className="font-bold text-primary tracking-wider">
              {product?.price.toLocaleString()} VND
            </p>
          )}

          {!loading && (
            <div
              onClick={() => onDetailClick?.(product!)}
              className="flex items-center justify-end cursor-pointer text-primary rounded hover:text-primary-hover font-medium"
            >
              <p>Xem chi tiết</p>
              <MdChevronRight className="w-5 h-5 -mr-2" />
            </div>
          )}

          {!loading && onLikeClick && (
            <button
              onClick={() => onLikeClick(Number(product?.id))}
              className="text-xl"
            >
              {isLiked ? "❤️" : "🤍"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
