import { useProducts } from "../Hooks/ProvideContext";

interface ItemProps {
  title: string;
  img: string;
  price: number;
}

function Item({ product }: { product: ItemProps }) {
  const { addToCart } = useProducts();
  return (
    <div>
      <h4>{product.title}</h4>
      <img src={product.img} alt="img-product" />
      <p>${product.price}</p>
      <button
        onClick={() => {
          addToCart(product);
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default Item;
