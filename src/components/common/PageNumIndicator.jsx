import React from "react";

function PageNumIndicator({ pageIndex, pageSize, pageTotal }) {
  const renderNumIndicators = () => {
    const startIndex = (pageIndex - 1) * pageSize + 1;
    let endIndex = startIndex + pageSize - 1;
    if (endIndex > pageTotal) endIndex = pageTotal;

    return `Showing ${startIndex} to ${endIndex} of ${pageTotal} 
        ${pageTotal > 1 ? "products" : "product"}`;
  };

  return <div className="mb-2 md:mb-0">{renderNumIndicators()}</div>;
}

export default PageNumIndicator;
