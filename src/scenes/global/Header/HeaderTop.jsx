import { useState, useRef, useEffect } from "react";
import MenuMiniTrigger from "../MobileMenu/MenuMiniTrigger";
import ActionLinks from "./ActionLinks";
import SearchBox from "../../../components/common/SearchBox";

function HeaderTop({ setOpenMenu }) {
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef();

  const handleScroll = () => {
    const sticky = headerRef.current?.offsetTop;
    if (window.scrollY > sticky) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.onscroll = function () {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    };
  }, []);

  return (
    <div
      ref={headerRef}
      className={`header-top fixed z-10 h-[41px] w-full bg-primary-900 pl-4 text-white  md:relative md:h-auto md:w-auto md:px-0 ${
        isSticky && "sticky-header"
      }`}>
      <div className="md:container md:text-right">
        <div className="top-actions flex  items-center justify-between md:justify-end">
          <div className={!isSticky ? "hidden" : ""}>
            <MenuMiniTrigger setOpenMenu={setOpenMenu} />
          </div>
          <div className="ml-auto md:ml-0">
            <SearchBox />
          </div>
          <ActionLinks />
        </div>
      </div>
    </div>
  );
}

export default HeaderTop;
