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
    title: "Premium Widget",
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

  const totalItems = cart.reduce((prev, current) => prev + current.num, 0);
  const totalPrices = cart.reduce(
    (prev, current) => prev + current.num * current.price,
    0
  );

  function addToCart(product: ProductType): void {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.title === product.title
      );
      if (existingProduct && existingProduct.num < 10) {
        return prevCart.map((item) =>
          item.title === product.title ? { ...item, num: item.num + 1 } : item
        );
      } else if (!existingProduct) {
        return [...prevCart, { ...product, num: 1 }];
      }
      return prevCart;
    });
  }

  function removeFromCart(product: CartType): void {
    setCart((prevCart) =>
      prevCart.filter((item) => item.title !== product.title)
    );
  }

  function updateItemInCart(product: CartType, newNum: number): void {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.title === product.title ? { ...item, num: newNum } : item
      )
    );
  }

  const contextValue: ProductContextType = {
    products,
    cart,
    totalItems,
    totalPrices,
    pageIsProducts,
    setPageIsProducts,
    setProducts,
    setCart,
    addToCart,
    removeFromCart,
    updateItemInCart,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
}

function useProducts(): ProductContextType {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProvideContext");
  }
  return context;
}

export { ProvideContext, useProducts };
