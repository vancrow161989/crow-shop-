import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../store/productsSlice";

function useProductsInCart() {
  const cartItems = useSelector((store) => store.cart.cart);

  const products = useSelector(selectAllProducts);

  const productsInCart = useMemo(() => {
    return cartItems?.map((cart) => {
      return {
        item: products?.find((product) => product.id === cart.productId),
        count: cart.count
      };
    });
  }, [cartItems, products]);

  return { productsInCart };
}

export default useProductsInCart;
