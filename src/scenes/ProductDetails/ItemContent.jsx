function ItemContent({ name, price, description }) {
  return (
    <>
      <h1 className="mb-4 mt-6 text-3xl md:mt-0 md:text-4xl">{name}</h1>
      <p className="mb-4 text-2xl font-bold text-gray-600">
        {price && `$${price}`}
      </p>
      <div className="mt-5">
        <p className="mb-1 font-semibold text-black">description:</p>
        <p>{description}</p>
      </div>
    </>
  );
}

export default ItemContent;
