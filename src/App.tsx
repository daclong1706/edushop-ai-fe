import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./components/layout/Layout";
import FavoritesPage from "./pages/FavoritesPage";
import HistoryPage from "./pages/HistoryPage";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartProvider";
import { Toaster } from "sonner";

function App() {
  return (
    <CartProvider>
      <Toaster
        position="bottom-right"
        toastOptions={{
          classNames: {
            icon: "text-primary",
          },
        }}
      />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/cart" element={<CartPage />} />
            {/* Thêm các Route khác sau */}
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  );
}

export default App;
