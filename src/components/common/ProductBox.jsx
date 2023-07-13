import { Link } from "react-router-dom";
import Numeral from "react-numeral";

function ProductBox({ product, baseUrl }) {
  const { id, name, price, image } = product;
  return (
    <Link
      to={`/product-list/${id}`}
      href="#"
      className="mb-8 block border border-gray-300 shadow-2xl hover:opacity-80 md:mb-16">
      <img className="h-auto w-full" src={baseUrl + image} alt={name} />
      <div className="p-3">
        <p>{name}</p>
        <p>
          <Numeral value={price} format={"$0,0"} />
        </p>
      </div>
    </Link>
  );
}

export default ProductBox;
