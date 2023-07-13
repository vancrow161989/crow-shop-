import React, { forwardRef } from "react";
import { MagnifyingGlassIcon, BackspaceIcon } from "@heroicons/react/24/solid";
import SearchResults from "./SearchResults";

function SearchForm({ handleSearchSubmit, handleClearSearch, searchKey }, ref) {
  const { searchFormRef, searchInputRef } = ref;
  return (
    <div className="search-box w-[80vw] md:w-auto md:min-w-[35rem]">
      <h2 className="text-center">Search Products</h2>
      <form onSubmit={handleSearchSubmit} ref={searchFormRef}>
        <div className="field-group relative">
          <label htmlFor="search" className="field-label hidden">
            Search
          </label>
          <div className="control">
            <input
              autoFocus
              ref={searchInputRef}
              autoComplete="off"
              className="h-12 w-full pr-12 pl-3 text-base text-gray-600"
              type="search"
              name="search"
              placeholder="Search products..."
            />
          </div>
          <button className="absolute top-[13px] right-[8px]" type="submit">
            <MagnifyingGlassIcon className="ml-auto  w-6 cursor-pointer stroke-none text-primary-900" />
          </button>
        </div>
      </form>
      <p className="mt-2 text-right">
        <button
          className="mr-2 align-middle text-sm hover:text-primary-500"
          onClick={handleClearSearch}>
          <BackspaceIcon className="mr-2 ml-auto inline-block w-6  cursor-pointer stroke-none align-middle " />
          <span className="inline-block align-middle">Clear Search</span>
        </button>
      </p>
      {searchKey && <SearchResults searchKey={searchKey} />}
    </div>
  );
}

export default forwardRef(SearchForm);
