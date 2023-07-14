import { Link } from "react-router-dom";
import SearchBox from "../../components/common/SearchBox/SearchBox";
import WidgetLinks from "../../components/common/WidgetLinks";
import CategoryWidget from "../../components/common/CategoryWidget";
function Footer() {
  const d = new Date();
  let year = d.getFullYear();

  return (
    <footer className="bg-gray-900 pt-9 text-gray-400">
      <div className="container max-w-screen-lg overflow-hidden">
        <div className="gap-4 px-4 md:flex md:px-0">
          <div className="mb-8 md:mb-0 md:w-4/12 md:pr-8">
            <h1 className="logo text-capitalize mb-1 font-serif text-lg font-bold text-white">
              <a href="/">CROW SHOP</a>
            </h1>
            <p className="text-xs">
              Built with cutting-edge technologies such as React.js, Redux,
              Tailwind, and Strapi for CMS, this fully responsive website
              showcases my web development skills and experience.
            </p>
          </div>
          <div className="float-right mb-8 w-6/12 md:float-none md:mb-0 md:w-2/12">
            <WidgetLinks />
          </div>
          <div className="float-left mb-8 w-6/12 md:float-none md:mb-0 md:w-2/12">
            <CategoryWidget />
          </div>

          <div className="mb-8 hidden md:mb-0 md:block md:w-3/12">
            <h3 className="mb-4  text-white">Search</h3>
            <SearchBox />
          </div>
        </div>
      </div>
      <div className="mt-0 border-t border-gray-100 border-opacity-10 py-3  md:mt-10 md:text-center">
        <span className="text-xs">
          © {year} Michael Ivan Togeno. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
