import { useMemo } from "react";
import { useGetAllCategoriesQuery } from "../store/categories";

function useCategories() {
  const {
    data: categories,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetAllCategoriesQuery();
  const transformCategories = useMemo(() => {
    return categories?.data?.map((category) => {
      return {
        id: category.id,
        label: category.attributes.title,
        link: category.attributes.link,
        featured: category.attributes.featured,
        imgUrl: category.attributes?.image?.data?.attributes?.url
      };
    });
  }, [categories]);

  const featuredCategories = useMemo(() => {
    return transformCategories?.filter((category) => category.featured);
  });

  const simpleCategories = useMemo(() => {
    return transformCategories?.filter((category) => !category.featured);
  });
  return {
    transformCategories,
    featuredCategories,
    simpleCategories,
    isLoading,
    isError
  };
}

export default useCategories;
