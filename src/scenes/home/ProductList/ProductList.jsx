import { Link } from "react-router-dom";
import useProducts from "../../../hooks/useProducts";
import useCategories from "../../../hooks/useCategories";
import ProductSkeleton from "./ProductSkeleton";
import CategoryLinks from "../../../components/common/CategoryLinks";
import ProductBox from "../../../components/common/ProductBox";
const options = "&pagination[limit]=15";

function ProductList() {
  const { transformProducts, isLoading, isError } = useProducts(options);
  const { featuredCategories } = useCategories();
  return isLoading || isError ? (
    <ProductSkeleton />
  ) : (
    <div className="container px-4 md:px-0">
      <h2 className="mb-5 mt-14 text-center font-serif text-2xl md:mb-10 md:mt-20 md:text-4xl">
        Our Products
      </h2>
      <CategoryLinks categories={featuredCategories} layout="horizontal" />
      <div className="sm:Lgrid-cols-3 my-9 grid grid-cols-2 gap-2 md:my-16 md:grid-cols-5 md:gap-4">
        {transformProducts?.map((item) => (
          <ProductBox key={item.id} product={item} />
        ))}
      </div>
      <div className="mb-8 md:mb-16">
        <Link to="/product-list" className="btn btn-primary btn-wide  mx-auto">
          discover more
        </Link>
      </div>
    </div>
  );
}

export default ProductList;
