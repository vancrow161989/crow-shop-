import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addItemToCart } from "../../store/cart";
import { calculateCartTotals } from "../../store/cart";

function AddToCart({ productName, productId, price }) {
  const [count, setProductCount] = useState(1);
  const dispatch = useDispatch();

  const onAddToCart = () => {
    const newProduct = { productId, count, price };
    dispatch(addItemToCart(newProduct));
    dispatch(calculateCartTotals());
    setProductCount(1);
    const msgSuccess = (
      <>
        Successfully Added {count} <b className="underline">{productName}</b>
      </>
    );
    toast.success(msgSuccess, {
      position: "top-center",
      hideProgressBar: true
    });
  };

  return (
    <div className="add-to-cart py-7">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group mb-4 flex items-center space-x-3">
          <span className="form-label font-semibold text-black">quantity</span>
          <button
            className="btn h-12 w-12 p-1 text-2xl hover:text-white"
            onClick={() => setProductCount((count) => Math.max(count - 1, 1))}>
            -
          </button>
          <div className="form-control ml-3 flex h-12 w-12 max-w-[80px] items-center justify-center rounded-md  border border-gray-400 p-4 pl-3">
            {count}
          </div>
          <button
            className="btn h-12 w-12 p-1 text-2xl hover:text-white"
            onClick={() => setProductCount((count) => count + 1)}>
            +
          </button>
        </div>
        <button
          className="btn btn-primary btn-full md:btn-wide mt-7"
          type="submit"
          onClick={onAddToCart}>
          Add To Cart
        </button>
        {/* <button className="btn btn-secondary btn-wide mt-2" type="submit">
          Add To Wishlist
        </button> */}
      </form>
    </div>
  );
}

export default AddToCart;
