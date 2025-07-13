import React, { useEffect, useState } from "react";
import { mockProducts } from "@/data/products";
import { initialFilterState, type FilterState } from "@/types/filter";
import { filterConfig } from "@/config/filterConfig";
import ProductCard from "@/components/product/ProductCard";
import ProductListCard from "@/components/product/ProductListCard";
import { SidebarFilter } from "@/components/common/SidebarFilter";
import { useFilteredProducts } from "@/hooks/useFilteredProducts";
import type { SortOption } from "@/hooks/useFilteredProducts";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Drawer } from "@/components/ui/Drawer";

const HomePage: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const pageSize = 6;
  const { products, total } = useFilteredProducts(
    mockProducts,
    filters,
    searchText,
    sortOption,
    currentPage,
    pageSize
  );

  const isMobile = useIsMobile();
  const totalPages = Math.ceil(total / pageSize);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 1000); // mô phỏng loading
    return () => clearTimeout(timeout);
  }, [filters, searchText, sortOption, currentPage]);

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Danh sách sản phẩm</h1>

      {isMobile && (
        <button
          className="mb-4 px-4 py-2 bg-primary text-white rounded"
          onClick={() => setDrawerOpen(true)}
        >
          Bộ lọc
        </button>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        {!isMobile && (
          <SidebarFilter
            filters={filters}
            setFilters={setFilters}
            config={filterConfig}
            canClose={false}
          />
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

          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCard key={i} loading />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400">
              Không tìm thấy sản phẩm phù hợp với bộ lọc.
            </div>
          ) : isMobile ? (
            <div className="space-y-4">
              {products.map((product) => (
                <ProductListCard
                  key={product.id}
                  product={product}
                  onDetailClick={() => {}}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onDetailClick={() => {}}
                />
              ))}
            </div>
          )}

          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalPages }).map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  className={`px-3 py-1 border rounded ${
                    currentPage === page ? "bg-primary text-white" : ""
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {isMobile && (
        <Drawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
          <SidebarFilter
            filters={filters}
            setFilters={setFilters}
            config={filterConfig}
            canClose
            onClose={() => setDrawerOpen(false)}
          />
        </Drawer>
      )}
    </div>
  );
};

export default HomePage;
