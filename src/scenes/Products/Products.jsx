import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import useCategories from "../../hooks/useCategories";
import ProductsSidebar from "./ProductsSidebar";
import ProductsContent from "./ProductsContent";
import ProductAllSkeleton from "./ProductAllSkeleton";
import PageTitle from "../../components/common/PageTitle";

function Products() {
  const [pageIndex, setPageIndex] = useState(1);
  const { catId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(
    catId ? Number(catId) : ""
  );
  const options = selectedCategory
    ? `&publicationState=live&pagination[page]=${pageIndex}&pagination[pageSize]=8&filters[categories][id]=${selectedCategory}`
    : `&publicationState=live&pagination[page]=${pageIndex}&pagination[pageSize]=8`;
  const { transformProducts, meta, isLoading, isError } = useProducts(options);
  const { transformCategories } = useCategories();

  const sortedCategories = transformCategories
    ? [...transformCategories].sort((a, b) => b.id - a.id)
    : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageIndex, transformProducts, catId]);

  useEffect(() => {
    setSelectedCategory(Number(catId));
    setPageIndex(1);
  }, [catId]);

  const handleSelectedCategory = (id) => {
    setSelectedCategory(Number(id));
    setPageIndex(1);
  };

  const renderedTitle = () => {
    if (selectedCategory === "") return "All Products";
    const title = transformCategories?.find(
      (cat) => cat.id === selectedCategory
    );

    if (title?.label) {
      return title.label
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
    } else {
      return "";
    }
  };

  return (
    <div className="products">
      <div className="content">
        <PageTitle title={renderedTitle()} />
        <div className="container">
          <div className="content-body md:flex md:justify-between md:gap-16">
            <ProductsSidebar
              categories={sortedCategories}
              selectedCategory={selectedCategory}
              handleSelectedCategory={handleSelectedCategory}
            />
            {isLoading || isError ? (
              <ProductAllSkeleton />
            ) : (
              <ProductsContent
                transformProducts={transformProducts}
                pagination={meta?.pagination}
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
