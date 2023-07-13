import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function CardSkeleton() {
  return (
    <div>
      <Skeleton height={650}></Skeleton>
    </div>
  );
}

export default CardSkeleton;
