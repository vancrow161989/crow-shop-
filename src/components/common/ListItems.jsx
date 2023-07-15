function ListItems({ categories, onSelectCategory, selectedCategory }) {
  const renderActiveClass = (id) => {
    console.log("selected", selectedCategory);
    return selectedCategory === id
      ? "block w-full bg-primary-500 p-2 text-left text-sm md:text-lg text-white"
      : id === "" && selectedCategory === 0
      ? "block w-full p-2 bg-primary-500 text-left text-white text-sm md:text-lg  "
      : "block w-full p-2 text-left text-sm md:text-lg  hover:text-primary-500";
  };

  return (
    <div className="list-items">
      <ul className="list-wrap mt-4 border px-2 shadow-xl md:mt-0 md:border-0 md:px-0 md:shadow-none ">
        <li className="border-b border-gray-200 md:border-0">
          <button
            className={renderActiveClass("")}
            onClick={() => onSelectCategory("")}>
            All
          </button>
        </li>
        {categories?.map((category) => (
          <li
            className="border-b border-gray-200 md:border-0"
            key={category.id}>
            <button
              className={renderActiveClass(category.id)}
              onClick={() => onSelectCategory(category.id)}>
              {category.label
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListItems;
