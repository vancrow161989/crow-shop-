import React from "react";

function Pagination({
  pages,
  pageSize,
  pageTotal,
  pageIndex,
  onPagination,
  onPrev,
  onNext
}) {
  if (pageTotal <= pageSize) return;
  return (
    <div className="pagination">
      {!(pageIndex === 1) && (
        <button
          className={`btn btn-primary ml-1 px-4 py-2 px-2 text-sm md:px-6 md:py-3 md:text-base`}
          onClick={() => onPrev()}>
          Prev
        </button>
      )}

      {pages.map((page) => (
        <button
          disabled={page === pageIndex}
          key={page}
          className={`btn ml-1 px-4 py-2 px-2 text-sm md:px-6 md:py-3 md:text-base ${
            page === pageIndex ? "btn-disabled" : "btn-primary"
          }`}
          onClick={() => onPagination(page)}>
          {page}
        </button>
      ))}
      {!(pageIndex === pages.length) && (
        <button
          className={`btn btn-primary ml-1 px-4 py-2 px-2 text-sm md:px-6 md:py-3 md:text-base`}
          onClick={() => onNext()}>
          Next
        </button>
      )}
    </div>
  );
}

export default Pagination;
