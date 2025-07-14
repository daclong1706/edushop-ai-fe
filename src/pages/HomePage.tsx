import React, { useEffect, useState } from "react";
import { mockProducts } from "@/data/products";
import { initialFilterState, type FilterState } from "@/types/filter";
import { filterConfig } from "@/config/filterConfig";
import ProductCard from "@/components/product/ProductCard";
import ProductListCard from "@/components/product/ProductListCard";
import { SidebarFilter } from "@/components/common/SidebarFilter";
import { useFilteredProducts } from "@/hooks/useFilteredProducts";
import type { SortOption } from "@/hooks/useFilteredProducts";
import { Drawer } from "@/components/ui/Drawer";
import Pagination from "@/components/ui/Pagination";
import type { Product } from "@/types/product";
import ProductDetailModal from "@/components/product/ProductDetailModal";
import { useFavorites } from "@/hooks/useFavorites";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import clsx from "clsx";
import { useViewedProducts } from "@/hooks/useViewedProducts";
import { fetchSuggestions } from "@/api/suggestions";
import { toast } from "sonner";

const HomePage: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);

  const pageSize = 6;
  const { products, total } = useFilteredProducts(
    mockProducts,
    filters,
    searchText,
    sortOption,
    currentPage,
    pageSize
  );

  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const isDesktop = breakpoint === "desktop";

  const { toggleFavorite, isFavorite } = useFavorites();
  const { addViewedProduct } = useViewedProducts();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 1000); // mô phỏng loading
    return () => clearTimeout(timeout);
  }, [filters, searchText, sortOption, currentPage]);

  const handleViewDetail = (product: Product) => {
    addViewedProduct(product);
    setSelectedProduct(product);
  };

  const [highlightedProducts, setHighlightedProducts] = useState<Product[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);

  const handleGetSuggestions = async () => {
    setIsSuggesting(true);

    await toast.promise(fetchSuggestions("mock-user-id"), {
      loading: "Đang lấy gợi ý sản phẩm...",
      success: (res) => {
        const existingIds = new Set(highlightedProducts.map((p) => p.id));
        const uniqueSuggestions = res.filter((p) => !existingIds.has(p.id));
        setHighlightedProducts(uniqueSuggestions);
        return "Đã lấy được gợi ý phù hợp!";
      },
      error: (err) => {
        console.error("Failed to fetch suggestions", err);
        return "Không thể lấy gợi ý lúc này.";
      },
    });

    setIsSuggesting(false);
  };

  const handleToggleFavorite = (productId: string) => {
    const alreadyLiked = isFavorite(productId);
    toggleFavorite(productId);
    toast.success(
      alreadyLiked
        ? "Đã bỏ yêu thích sản phẩm"
        : "Đã thêm sản phẩm vào yêu thích"
    );
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Danh sách sản phẩm</h1>

      {!isMobile && (
        <button
          className="mb-4 px-4 py-2 bg-primary text-white rounded"
          onClick={() => setShowSidebar((prev) => !prev)}
        >
          {showSidebar ? "Ẩn bộ lọc" : "Hiện bộ lọc"}
        </button>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        {!isMobile && showSidebar && (
          <div className="w-full md:max-w-72 shrink-0">
            <SidebarFilter
              filters={filters}
              setFilters={setFilters}
              config={filterConfig}
              canClose={false}
            />
          </div>
        )}

        <div className="flex-1">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="mb-4 w-full p-2 border rounded"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <select
            className="mb-4 w-full p-2 border rounded"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
          >
            <option value="newest">Mới nhất</option>
            <option value="priceAsc">Giá tăng dần</option>
            <option value="priceDesc">Giá giảm dần</option>
            <option value="ratingDesc">Đánh giá cao</option>
          </select>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <h1 className="text-2xl font-bold">Danh sách sản phẩm</h1>
            <button
              onClick={handleGetSuggestions}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Gợi ý sản phẩm phù hợp
            </button>
          </div>

          {loading ? (
            <div
              className={clsx({
                "grid grid-cols-2 lg:grid-cols-3 gap-6": isDesktop,
                "space-y-4 flex flex-col": !isDesktop,
              })}
            >
              {Array.from({ length: 6 }).map((_, i) =>
                isDesktop ? (
                  <ProductCard key={i} loading />
                ) : (
                  <ProductListCard key={i} loading />
                )
              )}
            </div>
          ) : (
            (() => {
              const mergedProducts = [
                ...highlightedProducts,
                ...products.filter(
                  (p) => !highlightedProducts.find((hp) => hp.id === p.id)
                ),
              ];

              if (mergedProducts.length === 0) {
                return (
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    Không tìm thấy sản phẩm phù hợp với bộ lọc.
                  </div>
                );
              }

              return (
                <div
                  className={clsx({
                    "grid grid-cols-1 lg:grid-cols-3 gap-6": isDesktop,
                    "space-y-4 flex flex-col": !isDesktop,
                  })}
                >
                  {mergedProducts.map((product) =>
                    isDesktop ? (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onDetailClick={handleViewDetail}
                        onLikeClick={handleToggleFavorite}
                        isLiked={isFavorite(product.id)}
                      />
                    ) : (
                      <ProductListCard
                        key={product.id}
                        product={product}
                        onDetailClick={handleViewDetail}
                        onLikeClick={handleToggleFavorite}
                        isLiked={isFavorite(product.id)}
                      />
                    )
                  )}
                </div>
              );
            })()
          )}

          <Pagination
            total={total}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {isMobile && (
        <>
          <button
            className="mb-4 px-4 py-2 bg-primary text-white rounded"
            onClick={() => setDrawerOpen(true)}
          >
            Bộ lọc
          </button>

          <Drawer
            isOpen={isDrawerOpen}
            onClose={() => setDrawerOpen(false)}
            position="right"
          >
            <SidebarFilter
              filters={filters}
              setFilters={setFilters}
              config={filterConfig}
              canClose
              onClose={() => setDrawerOpen(false)}
            />
          </Drawer>
        </>
      )}

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={true}
          onClose={() => setSelectedProduct(null)}
          isLiked={isFavorite(selectedProduct.id)}
          onLikeClick={handleToggleFavorite}
        />
      )}
    </div>
  );
};

export default HomePage;
