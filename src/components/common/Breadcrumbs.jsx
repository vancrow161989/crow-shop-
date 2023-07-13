import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProductById } from "../../store/productsSlice";
function Breadcrumbs() {
  const location = useLocation();
  const { productId } = useParams();
  const currentProduct = useSelector((state) =>
    selectProductById(state, productId)
  );
  let currentLocation = "";

  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currentLocation = currentLocation + `/${crumb}`;

      return (
        <li key={crumb} className="leading-normal">
          {currentLocation !== location.pathname ? (
            <Link
              className="inline-block align-middle text-xs text-gray-600 after:inline-block after:pl-3 after:align-middle after:text-lg after:content-['\003E'] hover:text-primary-500 hover:after:text-primary-500"
              to={currentLocation}>
              {crumb}
            </Link>
          ) : (
            <span className="mt-[-2px] inline-block align-top text-xs text-gray-400  after:text-lg">
              {currentProduct?.attributes?.name
                ? currentProduct?.attributes?.name
                : crumb}
            </span>
          )}
        </li>
      );
    });

  return (
    <div className="breadcrumbs border-b border-gray-300 px-4 py-2 md:px-0">
      <div className="container">
        <ul className="breadcrumbs-list flex list-none space-x-3 p-0">
          <li className="leading-normal">
            <Link
              className="inline-block align-middle text-xs text-gray-600  after:pl-3 after:align-middle after:text-lg after:content-['\003E'] hover:text-primary-500 hover:after:text-primary-500"
              to="/">
              Home
            </Link>
          </li>
          {crumbs}
        </ul>
      </div>
    </div>
  );
}

export default Breadcrumbs;
