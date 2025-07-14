import React from "react";
import ProductCard from "@/components/product/ProductCard";
import { useViewedProducts } from "@/hooks/useViewedProducts";

const HistoryPage: React.FC = () => {
  const { viewed, clearViewed } = useViewedProducts();

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Lịch sử đã xem</h1>
        {viewed.length > 0 && (
          <button
            onClick={clearViewed}
            className="text-sm text-red-600 hover:underline"
          >
            Xoá lịch sử
          </button>
        )}
      </div>

      {viewed.length === 0 ? (
        <p className="text-gray-500">Bạn chưa xem sản phẩm nào.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {viewed.map((entry) => (
            <div key={entry.product.id} className="relative">
              <ProductCard product={entry.product} onDetailClick={() => {}} />
              <div className="text-xs text-gray-500 mt-1 px-2">
                Xem {entry.viewedTimes} lần • lần cuối:{" "}
                {new Date(entry.lastViewedAt).toLocaleString("vi-VN")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
