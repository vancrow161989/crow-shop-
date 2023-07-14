import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { clearCart } from "../../store/cart";
import useModal from "../../hooks/useModal";
import useDropdown from "../../hooks/useDropdown";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import MinicartHead from "./MinicartHead";
import MinicartItems from "./MinicartItems";

function Minicart() {
  // const [minCart, setMinCart] = useState({ isShow: false });
  const { Dropdown, isDropdownShow, setDropdownShow } = useDropdown();
  const { isModalShow, Modal, handleCloseModal, handleOpenModal } = useModal();
  const dispatch = useDispatch();
  const location = useLocation();
  const cartTotalQuantity = useSelector(
    // (store) => store.entities.cart.cartTotalQuantity
    (store) => store.cart.cartTotalQuantity
  );
  useEffect(() => {
    return () => {
      setDropdownShow(false);
    };
  }, [location]);

  const handleClearCart = () => {
    dispatch(clearCart());
    handleCloseModal();
  };

  const renderMinCart = () => {
    return (
      <>
        {isModalShow && (
          <Modal
            message="Are you sure you want to remove all your cart items?"
            cloeModalLabel="Cancel"
            closeModal={handleCloseModal}
            confirmedActionLabel="Yes"
            confirmedAction={() => handleClearCart()}
            buttonConfirmedColor="danger"
          />
        )}
        <Dropdown size="medium">
          <div className="relative pb-2">
            <MinicartHead handleCartToggle={handleCartToggle} />

            <MinicartItems />
            {cartTotalQuantity > 0 && (
              <>
                <p
                  className="m-0 p-2 text-center hover:cursor-pointer hover:underline"
                  onClick={() => handleOpenModal()}>
                  Clear Cart Items
                </p>
                <Link to="/checkout" className="btn btn-primary w-full">
                  Proceed to Checkout
                </Link>
              </>
            )}
          </div>
        </Dropdown>
      </>
    );
  };

  const handleCartToggle = () => {
    setDropdownShow(!isDropdownShow);
  };

  const cartActiveClasses = () => {
    return isDropdownShow
      ? "py-2 pl-2 md:pl-4 pr-11 bg-white text-primary-500"
      : "py-2 pl-2 md:pl-4 pr-11";
  };

  return (
    <div className="md:relative">
      <div className="relative">
        <button onClick={handleCartToggle} className={cartActiveClasses()}>
          <ShoppingBagIcon className="mr-2 inline-block w-6 align-middle" />
          <span className="hidden md:inline-block">Cart</span>
        </button>
        <div
          className={`absolute left-10 top-[10px] h-6  w-6 overflow-hidden rounded-2xl border border-gray-400 px-[2px] text-center text-xs font-bold leading-6 md:left-[86px] ${
            isDropdownShow
              ? "bg-primary-500 text-white"
              : "bg-white text-primary-900"
          }`}>
          <span>{cartTotalQuantity > 99 ? 99 + "+" : cartTotalQuantity}</span>
        </div>
      </div>
      {isDropdownShow && renderMinCart()}
    </div>
  );
}

export default Minicart;
