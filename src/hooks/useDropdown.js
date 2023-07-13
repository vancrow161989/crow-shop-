import { useState } from "react";
import Dropdown from "../components/common/Dropdown";

function useDropdown() {
  const [isDropdownShow, setDropdownShow] = useState(false);

  return { Dropdown, isDropdownShow, setDropdownShow };
}

export default useDropdown;
