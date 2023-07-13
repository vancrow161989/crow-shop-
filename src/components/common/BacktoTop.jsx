import React from "react";
import { ArrowUpIcon } from "@heroicons/react/24/solid";

function BacktoTop() {
  const handleToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="back-to-top" onClick={handleToTop}>
      <ArrowUpIcon className="inline-block w-10 align-middle" />
    </div>
  );
}

export default BacktoTop;
