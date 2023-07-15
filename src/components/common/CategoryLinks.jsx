import { Link } from "react-router-dom";

function CategoryLinks({ categories }) {
  return (
    <div className="list-items">
      <ul className="list-wrap flex justify-center gap-4 text-sm sm:text-lg md:gap-10">
        {categories?.map((category) => (
          <li key={category.id}>
            <Link
              className=" hover:text-primary-500"
              to={`/product-list/category/${category.id}`}>
              {category.label
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryLinks;
