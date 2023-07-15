import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function CardSkeleton() {
  return (
    <div>
      <Skeleton className="h-[400px] md:h-[650px]"></Skeleton>
    </div>
  );
}

export default CardSkeleton;
