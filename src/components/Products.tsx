import { useProducts } from "../Hooks/ProvideContext";
import Item from "./Item";

function Products() {
  const { products } = useProducts();
  return (
    <div className="products">
      {products.map((product, i) => (
        <Item product={product} key={i} />
      ))}
    </div>
  );
}

export default Products;
