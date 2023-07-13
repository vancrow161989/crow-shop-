import SummaryItems from "./SummaryItems";
import SummaryTotals from "./SummaryTotals";
import CartNotes from "./CartNotes";

function CartSummary() {
  return (
    <div>
      <h2 className="sm:text-xlg font-body text-xl sm:text-gray-700">
        Cart Summary
      </h2>
      <SummaryItems />
      <br />
      <SummaryTotals />
      <CartNotes />
    </div>
  );
}

export default CartSummary;
