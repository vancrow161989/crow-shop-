import Skeleton from "react-loading-skeleton";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
function Slider({ title, content, img, btnText }) {
  const bgStyle = { backgroundImage: `url(${img})` };
  return (
    <div
      className="slideshow border-slate-200 relative border  bg-cover bg-center bg-no-repeat"
      style={bgStyle}>
      <div className="bg-overlay  bg-overlay-200"></div>
      <div className="relative h-[400px] p-2 md:container md:h-[650px] md:px-4 ">
        <div className="absoluteVCenter p-4 text-left md:ml-32 md:max-w-[600px]">
          <h1 className="mb-5 font-serif font-extrabold leading-none text-white  md:text-large ">
            {title || <Skeleton />}
          </h1>
          <p className="mb-8 text-white">{content || <Skeleton />}</p>
          <Link
            to={`/product-list/2`}
            className="btn btn-primary btn-wide border-0 ">
            {btnText || <Skeleton />}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Slider;
