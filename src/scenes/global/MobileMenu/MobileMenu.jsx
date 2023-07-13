import { Link } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/24/solid";
import Navbar from "../Navbar";

function MobileMenu({ isOpenMenu, setOpenMenu }) {
  return (
    <>
      {isOpenMenu && (
        <div
          onClick={() => setOpenMenu((prevValue) => !prevValue)}
          className="bg-overlay bg-overlay-500 z-20 "></div>
      )}
      <div className={`mobile-menu ${isOpenMenu && "active"}`}>
        <div className="text-right">
          <XCircleIcon
            className="mr-4 mt-4 inline-block w-6 cursor-pointer rounded-full bg-white align-middle text-gray-500 shadow-xl hover:text-primary-500"
            onClick={() => setOpenMenu((prevValue) => !prevValue)}
          />
        </div>
        <div className="mobile-menu-inner p-2">
          <h2 className="logo text-capitalize mb-4  font-serif text-lg font-bold text-gray-500">
            <Link to="/">CROW SHOP</Link>
          </h2>
          <Navbar />
        </div>
      </div>
    </>
  );
}

export default MobileMenu;
