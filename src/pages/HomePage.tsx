import React, { useState } from "react";
import ProductCard from "../components/product/ProductCart";
import type { Product } from "@/types/product";
import { mockProducts } from "@/data/products";
// import Modal from "../components/ui/Modal"; // nếu bạn đã tạo rồi

const HomePage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Danh sách sản phẩm</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mockProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDetailClick={setSelectedProduct}
          />
        ))}
        {mockProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDetailClick={setSelectedProduct}
          />
        ))}
        {mockProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDetailClick={setSelectedProduct}
          />
        ))}
      </div>

      {/* Modal chi tiết sản phẩm (đơn giản tạm thời) */}
      {/* {selectedProduct && (
        <Modal isOpen={true} onClose={() => setSelectedProduct(null)}>
          <div>
            <h2 className="text-xl font-semibold mb-2">
              {selectedProduct.name}
            </h2>
            <img
              src={selectedProduct.image}
              className="w-full h-60 object-cover rounded mb-4"
            />
            <p className="mb-2">{selectedProduct.shortDescription}</p>
            <p className="font-bold text-blue-500">
              {selectedProduct.price.toLocaleString()} VND
            </p>
          </div>
        </Modal>
      )} */}
    </div>
  );
};

export default HomePage;
