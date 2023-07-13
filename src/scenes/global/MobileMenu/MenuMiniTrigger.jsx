import { Bars3Icon } from "@heroicons/react/24/solid";

function MenuMiniTrigger({ setOpenMenu }) {
  return (
    <button
      onClick={() => setOpenMenu((prevValue) => !prevValue)}
      className="inline-block rounded-sm text-white md:hidden">
      <Bars3Icon className="inline-block w-6 align-middle" />
    </button>
  );
}

export default MenuMiniTrigger;
