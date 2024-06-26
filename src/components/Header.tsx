import { useProducts } from "../Hooks/ProvideContext";

function Header() {
  const { totalItems, totalPrices, pageIsProducts, setPageIsProducts } =
    useProducts();
  return (
    <div className="header">
      <h2>Acm Co.</h2>
      <div>
        <p>Total Items: {totalItems}</p>
        <p>Total Price: ${totalPrices.toFixed(2)}</p>
        <button onClick={() => setPageIsProducts((val) => !val)}>
          View {pageIsProducts ? "Cart" : "Products"}
        </button>
      </div>
    </div>
  );
}

export default Header;
