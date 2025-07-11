import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
// import FavoritesPage from './pages/FavoritesPage';
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/favorites" element={<FavoritesPage />} /> */}
          {/* Thêm các Route khác sau */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
