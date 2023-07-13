function CartNotes() {
  return (
    <div className="mt-7 border p-4 text-sm text-gray-500">
      <h3 className="font-body text-lg font-bold text-gray-400">
        For Testing Only
      </h3>
      <p>
        After clicking the <b>"Proceed to Payment"</b> button, you will be
        redirected to the Stripe website to perform a test payment. For testing
        purposes, you can utilize the following Visa card details for making the
        payment:
      </p>
      <p className="mb-0">
        Card Number: <b>4242 4242 4242 4242</b>
      </p>
      <p className="mb-0">
        Card Name: <b>(any)</b>
      </p>
      <p className="mb-0">
        Expiration: <b>(any future dates)</b>
      </p>
      <p className="mb-0">
        CVV: <b>(any 3 digit numbers)</b>
      </p>
    </div>
  );
}

export default CartNotes;
