// pages/CartPage.tsx
import React from "react";
import { useCart } from "@/hooks/useCart";

const CartPage: React.FC = () => {
  const { items, updateQuantity, removeFromCart, total, clearCart } = useCart();
  console.log(items);
  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-4">Giỏ hàng của bạn</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">Giỏ hàng đang trống.</p>
      ) : (
        <div className="space-y-4">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex items-center justify-between border-b pb-3"
            >
              <div className="flex items-center gap-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-gray-600">
                    {product.price.toLocaleString()} VND
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    updateQuantity(product.id, parseInt(e.target.value) || 1)
                  }
                  className="w-16 text-center border rounded"
                  min={1}
                />
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Xoá
                </button>
              </div>
            </div>
          ))}
          <div className="text-right font-semibold mt-4">
            Tổng cộng: {total.toLocaleString()} VND
          </div>
          <div className="text-right">
            <button
              onClick={clearCart}
              className="text-sm text-red-600 hover:underline"
            >
              Xoá toàn bộ giỏ hàng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
