import { useMemo } from "react";
import { useGetProductsQuery } from "../store/productsSlice";

function useProducts(options) {
  const {
    data: products,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetProductsQuery(options);

  const meta = products?.meta ? products?.meta : null;
  const transformProducts = useMemo(() => {
    return products?.ids.map((id) => {
      return {
        id: products.entities[id].id,
        name: products.entities[id].attributes?.name,
        shortDescription: products.entities[id].attributes?.shortDescription,
        longDescription: products.entities[id].attributes?.longDescription,
        price: products.entities[id].attributes?.price,
        image:
          products.entities[id].attributes?.mainImage?.data?.attributes?.url,
        subImages: products.entities[id].attributes?.subImages?.data,
        categories: products.entities[id].attributes?.categories
      };
    });
  }, [products]);

  return {
    transformProducts,
    isLoading,
    isSuccess,
    isError,
    error,
    meta
  };
}

export default useProducts;
