import { Link } from "react-router-dom";

function WidgetLinks() {
  return (
    <div>
      <h3 className="mb-4 text-white">Menu</h3>
      <ul>
        <li className="mb-1 text-sm">
          <Link className="hover:text-white" to="/">
            Home
          </Link>
        </li>
        <li className="mb-1 text-sm">
          <Link className="hover:text-white" to="/product-list">
            Products
          </Link>
        </li>
        <li className="mb-1 text-sm">
          <Link className="hover:text-white" to="/about">
            About
          </Link>
        </li>
        <li className="mb-1 text-sm">
          <Link className="hover:text-white" to="/blog">
            Blog
          </Link>
        </li>
        <li className="mb-1 text-sm">
          <Link className="hover:text-white" to="/contact">
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default WidgetLinks;
