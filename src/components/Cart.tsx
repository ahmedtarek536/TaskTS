import { useState } from "react";
import { useProducts } from "../Hooks/ProvideContext";

export default function Cart() {
  const { cart } = useProducts();
  return (
    <div>
      {cart.map((item) => (
        <ItemCart key={item.title} item={item} />
      ))}
    </div>
  );
}

interface CartType {
  title: string;
  img: string;
  price: number;
  num: number;
}

function ItemCart({ item }: { item: CartType }) {
  const { removeFromCart, updateItemInCart } = useProducts();
  const [numitems, setNumItems] = useState<number>(item.num);

  return (
    <div className="cart-item">
      <img src={item.img} alt="product-image" />
      <p>${item.price}</p>
      <select
        value={numitems}
        onChange={(e) => {
          setNumItems(+e.target.value);
          updateItemInCart(item, +e.target.value);
        }}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
      <p>${(item.price * item.num).toFixed(2)}</p>
      <button onClick={() => removeFromCart(item)}>X</button>
    </div>
  );
}
