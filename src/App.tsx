import { useProducts } from "./Hooks/ProvideContext";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Products from "./components/Products";

export default function App() {
  const { pageIsProducts } = useProducts();
  return (
    <div className="container">
      <Header />
      {pageIsProducts ? <Products /> : <Cart />}
      <Footer />
    </div>
  );
}
