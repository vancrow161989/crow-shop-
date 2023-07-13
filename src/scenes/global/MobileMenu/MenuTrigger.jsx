import { Bars3Icon } from "@heroicons/react/24/solid";

function MenuTrigger({ setOpenMenu }) {
  return (
    <button
      onClick={() => setOpenMenu((prevValue) => !prevValue)}
      className="mobile-menu-trigger mb-0.5 inline-block rounded-sm bg-primary-500 py-3 px-5 align-middle text-white md:hidden">
      <Bars3Icon className="inline-block w-4 align-middle" />
      <span className="inline-block pl-2">Menu</span>
    </button>
  );
}

export default MenuTrigger;
