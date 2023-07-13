import { useSelector } from "react-redux";
import Numeral from "react-numeral";
import { XCircleIcon } from "@heroicons/react/24/solid";

function MinicartHead({ handleCartToggle }) {
  const cartTotals = useSelector(
    // (store) => store.entities.cart.cartTotalAmount
    (store) => store.cart.cartTotalAmount
  );
  const cartTotalQuantity = useSelector(
    // (store) => store.entities.cart.cartTotalQuantity
    (store) => store.cart.cartTotalQuantity
  );

  return (
    <>
      <XCircleIcon
        className="ml-auto mb-2  w-7 cursor-pointer stroke-none text-gray-400"
        onClick={handleCartToggle}
      />

      <div className="mt-3 flex items-center justify-between">
        <p className="mb-0">
          <span className="font-bold">{cartTotalQuantity}</span> item
          {cartTotalQuantity > 1 && `s`}
        </p>
        <div className="flex items-center text-right">
          <span>Subtotal:</span>
          <p className="mb-0 font-bold">
            {cartTotals === 0 ? (
              "$0.00"
            ) : (
              <Numeral
                className="ml-1 text-md"
                value={cartTotals}
                format={"$0,0.00"}
              />
            )}
          </p>
        </div>
      </div>
    </>
  );
}

export default MinicartHead;
