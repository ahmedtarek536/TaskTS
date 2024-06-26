import { useProducts } from "../Hooks/ProvideContext";

function Footer() {
  const { totalItems, totalPrices } = useProducts();

  return (
    <div className="footer">
      <p>Total Items: {totalItems}</p>
      <p>Total Price: ${totalPrices.toFixed(2)}</p>
      <p>Shopping Cart &copy; 2022</p>
    </div>
  );
}

export default Footer;
