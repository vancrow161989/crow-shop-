import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import useScrollToTop from "../../hooks/useScrollToTop";
import Header from "./Header/Header";
import Footer from "./Footer";
import BacktoTop from "../../components/common/BacktoTop";
import MobileMenu from "./MobileMenu/MobileMenu";

function SharedLayout() {
  const [isOpenMenu, setOpenMenu] = useState(false);
  const location = useLocation();
  useScrollToTop();

  useEffect(() => {
    if (isOpenMenu) setOpenMenu(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isOpenMenu) document.body.classList.add("menu-active");
    else document.body.classList.remove("menu-active");
  }, [isOpenMenu]);

  const renderClass = () => {
    return isOpenMenu ? "absolute overflow-hidden" : "relative";
  };

  return (
    <div className={renderClass()}>
      <MobileMenu isOpenMenu={isOpenMenu} setOpenMenu={setOpenMenu} />
      <div className="mobile-menu-content">
        <Header setOpenMenu={setOpenMenu} />
        <main className="min-h-[400px] md:min-h-[600px]">
          <Outlet />
        </main>
        <Footer />
        <BacktoTop />
      </div>
    </div>
  );
}

export default SharedLayout;
