import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import LogoutIcon from "../../../components/icons/LogoutIcon";
import { selectCurrentUser } from "../../../store/authSlice";
import useDropdown from "../../../hooks/useDropdown";
import Minicart from "../../../components/Minicart/Minicart";

function ActionLinks() {
  const { Dropdown, isDropdownShow, setDropdownShow } = useDropdown();
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  return (
    <ul className="flex text-left">
      {currentUser?.username ? (
        <li className="group/profile md:relative">
          <button
            onDoubleClick={() => navigate("/profile")}
            onClick={() => setDropdownShow(!isDropdownShow)}
            className=" ml-4 inline-block px-2 py-2 md:ml-4 md:px-4">
            <UserIcon className="mr-2 inline-block w-6 align-middle" />
            <span className="hidden md:inline-block md:align-middle">{`Hi ${currentUser.username}`}</span>
          </button>
          <div className="hidden group-hover/profile:block  ">
            <Dropdown>
              <ul className="space-y-4">
                <li>
                  <Link className=" hover:text-primary-500" to="/profile">
                    <UserCircleIcon className="mr-2 inline-block w-6 align-middle" />
                    Profile
                  </Link>
                </li>
                <li>
                  <Link className="group hover:text-primary-500" to="/logout">
                    <LogoutIcon />
                    Logout
                  </Link>
                </li>
              </ul>
            </Dropdown>
          </div>
        </li>
      ) : (
        <li>
          <Link to="/login" className="ml-4 inline-block px-2 py-2 md:px-4">
            <UserIcon className="mr-2 inline-block w-6 align-middle" />
            <span className="hidden md:inline-block md:align-middle">
              Login
            </span>
          </Link>
        </li>
      )}

      <li>
        <Minicart />
      </li>
    </ul>
  );
}

export default ActionLinks;
