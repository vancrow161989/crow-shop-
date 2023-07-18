import React from "react";
import Numeral from "react-numeral";
import { Link } from "react-router-dom";
import useProducts from "../../../hooks/useProducts";
import Loader from "../Loader";

function SearchResults({ searchKey }) {
  const options = `&publicationState=live&filters[name][$contain]=${searchKey.toLowerCase()}`;
  const { transformProducts, isLoading } = useProducts(options);

  if (isLoading) return <Loader loadingText="Search results loading..." />;
  return (
    <div className="searchResults mt-5 max-w-[632px]">
      {searchKey && (
        <p className="mb-8 mt-9">
          {transformProducts?.length > 0 ? (
            <span>
              {transformProducts?.length} Search{" "}
              {transformProducts?.length > 1 ? "results" : "result"} for{" "}
              <b> "{searchKey}"</b>
            </span>
          ) : (
            <span>
              No result found for<b> "{searchKey}"</b>
            </span>
          )}
        </p>
      )}
      <ul className="searchBody max-h-[36vh] overflow-y-auto">
        {transformProducts?.map((product) => (
          <li key={product.id} className="mb-8">
            <Link
              className="group/product flex justify-between gap-4"
              to={`/product-list/${product.id}`}>
              <div className="search-img w-2/12">
                <img
                  className="block w-full"
                  src={product.image}
                  alt={product.name}
                />
              </div>
              <div className="search-content w-10/12">
                <p className="searchName mb-0 group-hover/product:text-primary-500">
                  {product.name}
                </p>
                <p className="searchPrice">
                  <Numeral value={product.price} format={"$0,0"} />
                </p>

                {product?.categories?.data && (
                  <ul className="searchMeta flex flex-wrap gap-2 text-sm text-gray-400 md:flex-nowrap [&>*:last-child]:after:hidden">
                    {product?.categories?.data.map((cat) => (
                      <li key={cat.id} className="last- after:content-[',']">
                        {cat?.attributes?.title
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;
