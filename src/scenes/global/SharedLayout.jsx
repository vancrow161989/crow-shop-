import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer";
import BacktoTop from "../../components/common/BacktoTop";
import MobileMenu from "./MobileMenu/MobileMenu";


function SharedLayout() {
  const [isOpenMenu, setOpenMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isOpenMenu) setOpenMenu(false);
  }, [location.pathname]);

  const renderClass = () => {
    return isOpenMenu ? "fixed h-[100vh] overflow-hidden" : "relative";
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
