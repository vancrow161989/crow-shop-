import { useSelector } from "react-redux";
import Numeral from "react-numeral";

function SummaryTotals() {
  const cartTotals = useSelector((store) => store.cart.cartTotalAmount);
  const cartTotalQuantity = useSelector(
    (store) => store.cart.cartTotalQuantity
  );

  return (
    <table className="w-full text-left shadow-lg">
      <tbody>
        <tr>
          <th className="border border-gray-200 p-3">Total Items</th>
          <td className="border border-gray-200 p-3 text-right">
            {cartTotalQuantity}
          </td>
        </tr>
        <tr>
          <th className="border border-gray-200 p-3">Tax</th>
          <td className="border border-gray-200 p-3 text-right">
            <Numeral value="0" format={"$0,0.00"} />
          </td>
        </tr>
        <tr>
          <th className="border border-t-2 border-gray-200 border-t-gray-600 p-3">
            Totals
          </th>
          <td className="border border-t-2 border-gray-200 border-t-gray-600 p-3 text-right">
            <Numeral
              className="text-md font-semibold"
              value={cartTotals}
              format={"$0,0.00"}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default SummaryTotals;
