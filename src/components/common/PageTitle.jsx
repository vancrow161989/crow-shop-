function PageTitle({ title }) {
  return (
    <div className="content-head relative border-b border-gray-300 bg-banner-image bg-cover bg-center px-3 py-6 md:py-10">
      <div className="bg-overlay bg-overlay-500"></div>
      <div className="container relative">
        <h1 className="mb-0 text-center text-white">{title}</h1>
      </div>
    </div>
  );
}

export default PageTitle;
