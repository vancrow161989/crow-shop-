import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ProductSkeleton() {
  const numCard = new Array(15).fill(0);

  return (
    <div className="container">
      <h2 className="mb-5 mt-14 text-center font-serif text-2xl md:mb-10 md:mt-20 md:text-4xl">
        Our Products
      </h2>
      <div>
        <div className="sm:Lgrid-cols-3 my-9 grid grid-cols-2 gap-2 md:my-16 md:grid-cols-5 md:gap-4">
          {numCard.map((el, index) => (
            <div key={index} className="mb-8">
              <Skeleton height={450} className="mb-3" />
              <Skeleton height={20} className="mb-3" />
              <Skeleton height={20} width={80} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductSkeleton;
