import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import MenuTrigger from "../MobileMenu/MenuTrigger";

function HeaderBottom({ setOpenMenu }) {
  return (
    <div className="header-bottom border-slate-500 md-px-0 border-y-2 px-1 pt-[41px] md:pt-0 ">
      <div className="container flex items-center  justify-between">
        <h1 className="logo text-capitalize mb-0 font-serif text-lg font-bold">
          <Link to="/">CROW SHOP</Link>
        </h1>
        <div className="hidden  md:block">
          <Navbar />
        </div>
        <MenuTrigger setOpenMenu={setOpenMenu} />
      </div>
    </div>
  );
}

export default HeaderBottom;
