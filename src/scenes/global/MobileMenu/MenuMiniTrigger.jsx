import { Bars3Icon } from "@heroicons/react/24/solid";

function MenuMiniTrigger({ setOpenMenu }) {
  return (
    <button
      onClick={() => setOpenMenu((prevValue) => !prevValue)}
      className="inline-block h-9  w-9  rounded-sm text-white md:hidden">
      <Bars3Icon className="inline-block w-6 align-middle" />
    </button>
  );
}

export default MenuMiniTrigger;
