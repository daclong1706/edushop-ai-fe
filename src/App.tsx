import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./components/layout/Layout";
import FavoritesPage from "./pages/FavoritesPage";
import HistoryPage from "./pages/HistoryPage";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartProvider";
import { Toaster } from "sonner";
import NotFound from "./pages/NotFound";
import { FavoritesProvider } from "./context/FavoritesProvider";

function App() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            classNames: {
              icon: "text-primary",
            },
          }}
        />
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="favorites" element={<FavoritesPage />} />
              <Route path="history" element={<HistoryPage />} />
              <Route path="cart" element={<CartPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </FavoritesProvider>
    </CartProvider>
  );
}

export default App;
