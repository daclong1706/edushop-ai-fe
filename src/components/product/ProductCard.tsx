import type { Product } from "@/types/product";
import React from "react";
import { MdChevronRight } from "react-icons/md";
import { StarRating } from "../ui/StarRating";
import Text from "../ui/Text";
import Skeleton from "../ui/Skeleton";
import clsx from "clsx";
import Button from "../ui/Button";

interface ProductCardProps {
  product?: Product;
  onDetailClick?: (product: Product) => void;
  isLiked?: boolean;
  onLikeClick?: (productId: string) => void;
  isSuggested?: boolean;
  loading?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onDetailClick,
  isLiked,
  onLikeClick,
  isSuggested = false,
  loading = false,
}) => {
  return (
    <div
      className={clsx(
        "group relative rounded-xl shadow-md transition duration-200 cursor-pointer flex flex-col",
        loading
          ? "animate-pulse bg-gray-100 dark:bg-gray-800"
          : "hover:shadow-xl"
      )}
    >
      {/* Đề xuất */}
      {isSuggested && !loading && (
        <div className="absolute top-2 left-2 bg-yellow-400 text-white text-xs font-semibold px-2 py-1 rounded shadow">
          Đề xuất
        </div>
      )}

      {/* Nút yêu thích */}
      {!loading && onLikeClick && product && (
        <button
          onClick={() => onLikeClick(product.id)}
          className="absolute top-2 right-2 rounded-full p-0.5 bg-white shadow"
          title={isLiked ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
        >
          {/* <FiHeart
            className={clsx(
              "w-5 h-5 transition",
              isLiked ? "text-red-600" : "text-gray-400 hover:text-red-600"
            )}
          /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`size-5 ${
              isLiked ? "text-red-600" : "text-gray-400 hover:text-red-600"
            }`}
          >
            <path d="m9.653 16.915-.005-.003-.019-.01a20.759 20.759 0 0 1-1.162-.682 22.045 22.045 0 0 1-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 0 1 8-2.828A4.5 4.5 0 0 1 18 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 0 1-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 0 1-.69.001l-.002-.001Z" />
          </svg>
        </button>
      )}

      {/* Hình ảnh */}
      <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-t-xl overflow-hidden">
        {!loading && product?.image && (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Nội dung */}
      <div className="flex flex-col flex-1 py-4 px-6 space-y-2">
        {/* Tên sản phẩm */}
        <h3
          className="text-base font-semibold truncate h-6"
          title={product?.name}
        >
          {loading ? <Skeleton width="w-3/4" height="h-6" /> : product?.name}
        </h3>

        {/* Mô tả */}
        <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 min-h-[40px]">
          {loading ? (
            <>
              <Skeleton />
              <Skeleton width="w-2/3" />
            </>
          ) : (
            <Text text={product?.description || ""} className="text-gray-500" />
          )}
        </div>

        {/* Đánh giá */}
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

        {/* Spacer để đẩy nội dung xuống đáy */}
        <div className="flex-1" />

        {/* Container chứa phần giá (ở dưới cùng) */}
        <div className="relative mt-1 border-t pt-3 border-gray-200 dark:border-gray-700 min-h-[36px]">
          {/* Giá tiền */}
          {loading ? (
            <Skeleton width="w-20" height="h-4" />
          ) : (
            <p className="font-bold text-primary tracking-wider z-0 relative flex items-end gap-2">
              {product?.price.toLocaleString()} VND
              {product && product.originalPrice > product.price && (
                <span className="text-[14px] text-gray-500 line-through font-normal">
                  {product.originalPrice.toLocaleString()} VND
                </span>
              )}
            </p>
          )}

          {/* Nút "Xem chi tiết" đè lên */}
          {!loading && product && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <Button
                onClick={() => onDetailClick?.(product)}
                className="w-full py-3"
                iconRight={<MdChevronRight className="w-5 h-5 -mr-1" />}
              >
                Xem chi tiết
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
