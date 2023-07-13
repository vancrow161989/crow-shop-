import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/cart";
import { Link } from "react-router-dom";

function Confirmation() {
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    handleClearCart();
  }, []);

  return (
    <div className="container-sm container">
      <div className="confirmation mx-auto mt-2 max-w-2xl py-12 px-4 text-center md:mt-4 md:px-0">
        <h1 className="md:text-xlg font-body text-3xl  leading-normal text-gray-700">
          Congratulations on your purchase!{" "}
        </h1>
        <p>
          We're thrilled to have you as a valued customer. We hope your
          experience with us was exceptional and that you're completely
          satisfied with your purchase.
        </p>
        <p>
          We're committed to providing you with high-quality products and
          outstanding customer service, and we hope that you'll continue to shop
          with us in the future. As a token of our appreciation, we're offering
          a special discount on your next purchase. Simply use the code
          THANKYOU10 at checkout to receive 10% off your next order.
        </p>
        <p>
          Thank you again for choosing us. <br /> We look forward to serving you
          again soon!
        </p>
        <Link
          to="/product-list"
          className="btn btn-primary mt-5 inline-block"
          replace>
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default Confirmation;
