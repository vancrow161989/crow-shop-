import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ProductAllSkeleton() {
  const numCard = new Array(8).fill(0);

  return (
    <div className="container">
      <div>
        <div className="my-8 grid grid-cols-2 gap-2 md:my-16 md:grid-cols-4 md:gap-4">
          {numCard.map((el, index) => (
            <div key={index} className="mb-8">
              <Skeleton height={350} className="mb-3" />
              <Skeleton height={20} className="mb-3" />
              <Skeleton height={20} width={80} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductAllSkeleton;
