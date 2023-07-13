import { useLocation } from "react-router-dom";
import HeaderTop from "./HeaderTop";
import HeaderBottom from "./HeaderBottom";
import Breadcrumbs from "../../../components/common/breadcrumbs";

function Header({ setOpenMenu }) {
  const location = useLocation();

  return (
    <>
      <header className="header">
        <HeaderTop setOpenMenu={setOpenMenu} />
        <HeaderBottom setOpenMenu={setOpenMenu} />
      </header>
      {location.pathname !== "/" && <Breadcrumbs />}
    </>
  );
}

export default Header;
