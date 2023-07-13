import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ClickablePanelsSkeleton() {
  const numCard = new Array(8).fill(0);

  return (
    <>
      <h2 className="mt-10 mb-5 text-center font-serif text-large md:mt-20 md:mb-10 md:text-4xl">
        Our Products
      </h2>
      <div>
        <div className="grid grid-cols-2 gap-1 md:grid-cols-4">
          {numCard.map((el, index) => (
            <div key={index} className="mb-0">
              <Skeleton height={208} className="mb-1" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ClickablePanelsSkeleton;
