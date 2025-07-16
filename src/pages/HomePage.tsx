import { fetchSuggestions } from "@/api/suggestions";
import emptySearchSVG from "@/assets/search.svg";
import { HorizontalScroller } from "@/components/common/HorizontalScroller";
import { SearchBar } from "@/components/common/SearchBar";
import { SidebarFilter } from "@/components/common/SidebarFilter";
import EmptyState from "@/components/EmptyState";
import ProductCard from "@/components/product/ProductCard";
import ProductCardMobile from "@/components/product/ProductCardMobile";
import ProductDetailModal from "@/components/product/ProductDetailModal";
import ProductListCard from "@/components/product/ProductListCard";
import Button from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import Dropdown from "@/components/ui/Dropdown";
import Pagination from "@/components/ui/Pagination";
import { filterConfig } from "@/config/filterConfig";
import { mockProducts } from "@/data/products";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import type { SortOption } from "@/hooks/useFilteredProducts";
import { useFilteredProducts } from "@/hooks/useFilteredProducts";
import { useProductActions } from "@/hooks/useProductActions";
import { initialFilterState, type FilterState } from "@/types/filter";
import type { Product } from "@/types/product";
import clsx from "clsx";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const HomePage: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  // const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const searchText = searchParams.get("search") || "";

  const pageSize = 6;
  const { products, total } = useFilteredProducts(
    mockProducts,
    filters,
    searchText,
    sortOption,
    currentPage,
    pageSize
  );

  const {
    handleToggleFavorite,
    handleViewDetail,
    isFavorite,
    selectedProduct,
    setSelectedProduct,
  } = useProductActions();

  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const isDesktop = breakpoint === "desktop";

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, [filters, searchText, sortOption, currentPage]);

  const [highlightedProducts, setHighlightedProducts] = useState<Product[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleGetSuggestions = async () => {
    setIsSuggesting(true);
    setShowSuggestions(true);

    await toast.promise(fetchSuggestions("id-10101", "home"), {
      loading: "Đang lấy gợi ý sản phẩm...",
      success: (res) => {
        setTimeout(() => {
          setHighlightedProducts(res);
          setIsSuggesting(false);
        }, 1000);
        return "Đã lấy được gợi ý phù hợp!";
      },
      error: (err) => {
        console.error("Failed to fetch suggestions", err);
        setIsSuggesting(false);
        return "Không thể lấy gợi ý lúc này.";
      },
    });
  };

  const handleSearchChange = (value: string) => {
    const newParams = new URLSearchParams(location.search);
    if (value) {
      newParams.set("search", value);
    } else {
      newParams.delete("search");
    }

    navigate({
      pathname: location.pathname,
      search: newParams.toString(),
    });
  };

  const sortOptions = [
    { label: "Mới nhất", value: "newest" },
    { label: "Giá tăng dần", value: "priceAsc" },
    { label: "Giá giảm dần", value: "priceDesc" },
    { label: "Đánh giá cao", value: "ratingDesc" },
  ];

  return (
    <div className="container mx-auto pb-3 md:py-6">
      <div className="sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        {showSuggestions && !isMobile && (
          <HorizontalScroller className="mt-4">
            {isSuggesting
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={`loading-${i}`}
                    className="min-w-[300px] max-w-[300px] flex-shrink-0 mb-4"
                  >
                    <ProductCardMobile loading />
                  </div>
                ))
              : highlightedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="min-w-[250px] max-w-[300px] flex-shrink-0 mb-8"
                  >
                    <ProductCardMobile
                      product={product}
                      onDetailClick={handleViewDetail}
                      onLikeClick={handleToggleFavorite}
                      isLiked={isFavorite(product.id)}
                    />
                  </div>
                ))}
          </HorizontalScroller>
        )}
      </div>
      {/* <h1 className="text-2xl font-bold mb-4">Danh sách sản phẩm</h1> */}

      {!isMobile && (
        <div className="flex gap-2 mb-4">
          <Button
            outline
            onClick={() => setShowSidebar((prev) => !prev)}
            iconLeft={<IoFilter />}
            className="!text-gray-600 !border-gray-600 hover:!border-primary hover:!text-primary dark:!text-gray-300 dark:!border-gray-300"
          >
            Bộ lọc
          </Button>

          <Dropdown
            options={sortOptions}
            selectedValue={sortOption}
            onSelect={(value) => setSortOption(value as SortOption)}
            placeholder="Sắp xếp theo"
            className="w-full !text-gray-600 !border-gray-600 hover:!border-primary hover:!text-primary dark:!text-gray-300 dark:!border-gray-300"
          />

          <Button onClick={handleGetSuggestions}>Gợi ý sản phẩm phù hợp</Button>

          {showSuggestions && (
            <Button ghost onClick={() => setShowSuggestions(false)}>
              Ẩn gợi ý
            </Button>
          )}
        </div>
      )}

      {isMobile && (
        <>
          <SearchBar value={searchText} onChange={handleSearchChange} />
          <div className="flex gap-1 mt-3">
            <Button
              outline
              onClick={() => setDrawerOpen((prev) => !prev)}
              iconLeft={<IoFilter />}
              className="!text-gray-600 !border-gray-600 active:!border-primary active:!text-primary active:!bg-primary/20 dark:!text-gray-300 dark:!border-gray-300"
            >
              Bộ lọc
            </Button>

            <Dropdown
              options={sortOptions}
              selectedValue={sortOption}
              onSelect={(value) => setSortOption(value as SortOption)}
              placeholder="Sắp xếp theo"
              className="w-full !text-gray-600 !border-gray-600 active:!border-primary active:!text-primary active:!bg-primary/20 dark:!text-gray-300 dark:!border-gray-300"
            />

            <Button onClick={handleGetSuggestions}>Gợi ý</Button>
          </div>

          <Drawer
            isOpen={isDrawerOpen}
            onClose={() => setDrawerOpen(false)}
            position="right"
            width="w-2/3"
          >
            <SidebarFilter
              filters={filters}
              setFilters={setFilters}
              config={filterConfig}
              onClose={() => setDrawerOpen(false)}
            />
          </Drawer>
        </>
      )}

      {showSuggestions && isMobile && (
        <div className="flex flex-col">
          <p
            className="w-full text-right mt-1 underline"
            onClick={() => setShowSuggestions(false)}
          >
            Ẩn gợi ý
          </p>
          <HorizontalScroller className="mt-2">
            {isSuggesting
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={`loading-${i}`} className="w-[250px] flex-shrink-0">
                    <ProductCardMobile loading />
                  </div>
                ))
              : highlightedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="min-w-[200px] max-w-[250px] flex-shrink-0"
                  >
                    <ProductCardMobile
                      product={product}
                      onDetailClick={handleViewDetail}
                      onLikeClick={handleToggleFavorite}
                      isLiked={isFavorite(product.id)}
                    />
                  </div>
                ))}
          </HorizontalScroller>
        </div>
      )}

      <div className="overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {!isMobile && (
            <motion.div
              animate={{
                x: showSidebar ? 0 : -300,
                opacity: showSidebar ? 1 : 0,
              }}
              transition={{ type: "tween", duration: 0.4 }}
              className="w-[300px] shrink-0"
              style={{ pointerEvents: showSidebar ? "auto" : "none" }}
            >
              <SidebarFilter
                filters={filters}
                setFilters={setFilters}
                config={filterConfig}
              />
            </motion.div>
          )}

          <motion.div
            animate={{
              marginLeft: !isMobile && !showSidebar ? -300 : 0,
              scale: showSidebar ? 0.98 : 1,
              opacity: showSidebar ? 0.95 : 1,
            }}
            transition={{ type: "tween", duration: 0.4 }}
            className="flex-1 px-0 md:px-4"
          >
            <div>
              {loading ? (
                <div
                  className={clsx({
                    "grid grid-cols-2 lg:grid-cols-3 gap-6": isDesktop,
                    "space-y-2 flex flex-col": !isDesktop,
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
              ) : products.length === 0 ? (
                <EmptyState
                  imageSrc={emptySearchSVG}
                  description=" Không tìm thấy sản phẩm phù hợp với bộ lọc."
                />
              ) : (
                <div
                  className={clsx({
                    "grid grid-cols-2 lg:grid-cols-3 gap-6": isDesktop,
                    "flex flex-col": !isDesktop,
                  })}
                >
                  {showSuggestions && isMobile && (
                    <hr className="text-gray-300 mb-1" />
                  )}
                  {products.map((product) =>
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
              )}

              <Pagination
                total={total}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          </motion.div>
        </div>
      </div>

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
