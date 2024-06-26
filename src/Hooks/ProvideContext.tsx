import React, { createContext, ReactNode, useContext, useState } from "react";

interface ProductType {
  title: string;
  img: string;
  price: number;
}

interface CartType extends ProductType {
  num: number;
}

const initProducts: ProductType[] = [
  {
    title: "Widget",
    img: "https://m.media-amazon.com/images/I/61I22cL7v+L._AC_UL480_FMwebp_QL65_.jpg",
    price: 9.99,
  },
  {
    title: "Premium",
    img: "https://m.media-amazon.com/images/I/71kbRVr8YfL._AC_UL480_FMwebp_QL65_.jpg",
    price: 19.99,
  },
  {
    title: "Deluxe Widget",
    img: "https://m.media-amazon.com/images/I/71FnggdCAJL._AC_SX466_.jpg",
    price: 29.99,
  },
];

interface ProductContextType {
  products: ProductType[];
  cart: CartType[];
  totalItems: number;
  totalPrices: number;
  pageIsProducts: boolean;
  setPageIsProducts: React.Dispatch<React.SetStateAction<boolean>>;
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  setCart: React.Dispatch<React.SetStateAction<CartType[]>>;
  addToCart: (product: ProductType) => void;
  removeFromCart: (product: CartType) => void;
  updateItemInCart: (product: CartType, newNum: number) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProvideContextProps {
  children: ReactNode;
}

function ProvideContext({ children }: ProvideContextProps) {
  const [pageIsProducts, setPageIsProducts] = useState<boolean>(true);
  const [products, setProducts] = useState<ProductType[]>(initProducts);
  const [cart, setCart] = useState<CartType[]>([]);
  const totalItems: number = cart.reduce(
    (prev: number, current: CartType) => prev + current.num,
    0
  );
  const totalPrices: number = cart.reduce(
    (prev: number, current: CartType) => prev + current.num * current.price,
    0
  );

  // add item to cart
  function addToCart(product: ProductType): void {
    const inCart = cart.find((item) => item.title === product.title);
    if (inCart) {
      setCart((prev) =>
        prev.map((item) => {
          if (item.title === product.title && item.num < 10) {
            return { ...item, num: item.num + 1 };
          } else {
            return item;
          }
        })
      );
    } else {
      setCart((prev) => [...prev, { ...product, num: 1 }]);
    }
  }

  // remove item from cart
  function removeFromCart(product: CartType): void {
    setCart((items) => items.filter((item) => item.title !== product.title));
  }

  // update item in cart
  function updateItemInCart(product: CartType, newNum: number): void {
    setCart((items) =>
      items.map((item) =>
        item.title === product.title ? { ...item, num: newNum } : item
      )
    );
  }

  const contextValue: ProductContextType = {
    products,
    totalItems,
    totalPrices,
    pageIsProducts,
    cart,
    setCart,
    setProducts,
    addToCart,
    removeFromCart,
    setPageIsProducts,
    updateItemInCart,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      <section>{children}</section>
    </ProductContext.Provider>
  );
}

function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProvideContext");
  }
  return context;
}

export { ProvideContext, useProducts, ProductType };
