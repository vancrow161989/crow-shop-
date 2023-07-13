import { Link } from "react-router-dom";
import useCategories from "../../hooks/useCategories";

function CategoryWidget() {
  const { transformCategories } = useCategories();
  const sortedCategories = transformCategories
    ? [...transformCategories].sort((a, b) => b.id - a.id)
    : [];

  return (
    <div>
      <h3 className="mb-4 text-white">Categories</h3>
      <ul>
        {sortedCategories?.map((cat) => (
          <li className="mb-1 text-sm " key={cat.id}>
            <Link
              className="hover:text-white"
              to={`/product-list/category/${cat.id}`}>
              {cat.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryWidget;
