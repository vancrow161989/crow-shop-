import { Link } from "react-router-dom";
function Panels({ label, categoryId, imgUrl }) {
  return (
    <Link
      key={label}
      to={`/product-list/category/${categoryId}`}
      className="relative block h-24 w-full bg-cover bg-center bg-no-repeat md:h-52"
      style={{
        backgroundImage: `url(${imgUrl})`
      }}>
      <div className="bg-overlay hover:bg-transparent"></div>
      <div className="absoluteCenter ">
        <p className="m-0 font-serif text-md tracking-widest text-white md:text-2xl">
          {label}
        </p>
      </div>
    </Link>
  );
}

export default Panels;
