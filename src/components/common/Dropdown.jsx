import React from "react";

function Dropdown({ size = "small", children }) {
  const renderClass = () => {
    return `border-gray w-[100vw] absolute right-0 top-full  rounded-sm z-[9999]  border bg-white p-4 pb-3 text-black shadow-2xl ${
      size === "medium" ? "sm:w-80" : "sm:w-60"
    } `;
  };
  return <div className={renderClass()}>{children}</div>;
}

export default Dropdown;
