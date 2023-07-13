import { useState, useEffect } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import ListItems from "../../components/common/ListItems";

function ProductsSidebar({
  categories,
  selectedCategory,
  handleSelectedCategory
}) {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    return () => setOpen(false);
  }, []);

  const handleSelectCategory = (category) => {
    handleSelectedCategory(category);
    setOpen(false);
  };
  return (
    <div className="sidebar md:w-2/12">
      <aside className="px-4 pt-4 md:px-0">
        <h2 className="my-7 hidden text-xl md:block">Categories</h2>
        <button
          onClick={() => setOpen((prevValue) => !prevValue)}
          className="btn btn-primary btn-sm btn-full  my-7px-4 text-sm md:hidden">
          Categories
          <ChevronDownIcon
            className={` ${
              !isOpen ? "inline-block" : "hidden"
            }  ml-2 mr-2  w-3 align-middle md:hidden md:w-4`}
          />
          <ChevronUpIcon
            className={` ${
              isOpen ? "inline-block" : "hidden"
            } ml-2 mr-2 w-3 align-middle md:hidden md:w-4`}
          />
        </button>
        <div className={`${isOpen ? "block" : "hidden"} md:block`}>
          <ListItems
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
          />
        </div>
      </aside>
    </div>
  );
}

export default ProductsSidebar;
