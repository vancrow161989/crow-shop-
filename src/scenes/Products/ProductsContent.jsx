import _ from "lodash";
import ProductBox from "../../components/common/ProductBox";
import { baseUrl } from "../../../config.json";
import PageNumIndicator from "../../components/common/PageNumIndicator";
import Pagination from "../../components/common/Pagination";

function ProductsContent({
  transformProducts,
  pagination,
  pageIndex,
  setPageIndex
}) {
  const handlePagination = (page) => {
    setPageIndex(page);
  };

  const handlePrev = () => {
    if (pageIndex > 1) {
      setPageIndex((prevValue) => prevValue - 1);
    }
  };

  const handleNext = () => {
    if (pageIndex < pagination?.pageCount) {
      setPageIndex((prevValue) => prevValue + 1);
    }
  };

  if (!transformProducts.length > 0)
    return (
      <div className="content-inner mt-12 px-4 text-center md:w-10/12 md:px-0 md:text-left md:text-2xl">
        <p>Sorry, no products belong to this category</p>
      </div>
    );

  const pages = _.range(1, pagination?.pageCount + 1);

  return (
    <div className="content-inner px-4 md:w-10/12 md:px-0">
      <div className="actions items-center justify-between pt-12 text-center md:flex md:text-left">
        <PageNumIndicator
          pageIndex={pageIndex}
          pageSize={pagination?.pageSize}
          pageTotal={pagination?.total}
        />
        <Pagination
          pages={pages}
          pageSize={pagination?.pageSize}
          pageTotal={pagination?.total}
          pageIndex={pageIndex}
          onPagination={handlePagination}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </div>
      <div className="my-8 grid grid-cols-2 gap-2 md:my-16 md:grid-cols-4 md:gap-4">
        {transformProducts?.map((item) => (
          <ProductBox key={item.id} product={item} baseUrl={baseUrl} />
        ))}
      </div>
      <div className="actions items-center justify-between pb-8 text-center md:flex md:pb-12  md:pt-12 md:text-left">
        <PageNumIndicator
          pageIndex={pageIndex}
          pageSize={pagination?.pageSize}
          pageTotal={pagination?.total}
        />
        <Pagination
          pages={pages}
          pageSize={pagination?.pageSize}
          pageTotal={pagination?.total}
          pageIndex={pageIndex}
          onPagination={handlePagination}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </div>
    </div>
  );
}

export default ProductsContent;
