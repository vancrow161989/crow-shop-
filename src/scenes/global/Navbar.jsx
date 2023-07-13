import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  CubeIcon,
  EnvelopeIcon,
  ChatBubbleBottomCenterIcon,
  UserCircleIcon
} from "@heroicons/react/24/solid";

function Navbar() {
  return (
    <nav className="nav">
      <ul className="md:flex md:items-center md:space-x-5">
        <li className="mb-4 md:mb-0">
          <NavLink className="block p-2" to="/">
            <HomeIcon className="mr-2 inline-block w-6 fill-gray-600 align-middle md:mb-0 md:hidden" />
            <span className="inline-block pl-1 align-middle">Home</span>
          </NavLink>
        </li>
        <li className="mb-4 md:mb-0">
          <NavLink className="block p-2" to="/product-list">
            <CubeIcon className="mr-2 inline-block w-6 fill-gray-600 align-middle md:mb-0 md:hidden" />
            <span className="inline-block pl-1 align-middle">Products</span>
          </NavLink>
        </li>
        <li className="mb-4 md:mb-0">
          <NavLink className="block p-2" to="/about">
            <UserCircleIcon className="mr-2 inline-block w-6 fill-gray-600 align-middle md:mb-0 md:hidden" />
            <span className="inline-block pl-1 align-middle">About</span>
          </NavLink>
        </li>
        <li className="mb-4 md:mb-0">
          <NavLink className="block p-2" to="/blog">
            <ChatBubbleBottomCenterIcon className="mr-2 inline-block w-6 fill-gray-600 align-middle md:mb-0 md:hidden" />
            <span className="inline-block pl-1 align-middle"> Blog</span>
          </NavLink>
        </li>
        <li className="mb-4 md:mb-0">
          <NavLink className="block p-2" to="/contact">
            <EnvelopeIcon className="mr-2 inline-block w-6 fill-gray-600 align-middle md:mb-0 md:hidden" />
            <span className="inline-block pl-1 align-middle"> contact</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
