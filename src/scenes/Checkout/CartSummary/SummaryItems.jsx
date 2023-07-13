import { useMemo } from "react";
import useProductsInCart from "../../../hooks/useProductsInCart";
import { Numeral } from "react-numeral";
import config from "../../../../config.json";
const { baseUrl } = config;

function SummaryItems() {
  const { productsInCart } = useProductsInCart();

  const cartProducts = useMemo(
    () =>
      productsInCart?.map((product) => ({
        ...product,
        prevValue: product.count
      })),
    [productsInCart]
  );

  return (
    <>
      <table className="table-responsive w-full text-left text-sm sm:shadow-lg">
        <thead>
          <tr>
            <th className="border border-gray-200 p-3" colSpan="2">
              Product
            </th>
            <th className="border border-gray-200 p-3 text-center">Qty</th>
            <th
              data-title="Price"
              className="border border-gray-200 p-3 text-center">
              Price
            </th>
            <th
              data-title="Total"
              className="border border-gray-200 p-3 text-center">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {cartProducts.map((product, index) => (
            <tr key={product.item?.id || index}>
              <td data-title="Name" className="border border-gray-200 p-3">
                {product.item?.attributes?.name}
              </td>
              <td data-title="Product" className="border  border-gray-200 p-3">
                <img
                  className="inline-block max-w-[70px]  sm:max-w-[50px]"
                  src={`${baseUrl}${product.item?.attributes?.mainImage?.data?.attributes?.url}`}
                  alt=""
                />
              </td>
              <td
                data-title="Qty"
                className="border border-gray-200 p-3 text-center">
                {product.count}
              </td>
              <td
                data-title="Price"
                className="border border-gray-200 p-3 text-center">
                <Numeral
                  value={product.item?.attributes?.price}
                  format={"$0,0.00"}
                />
              </td>
              <td
                data-title="Total"
                className="border border-gray-200 p-3 text-center">
                <Numeral
                  value={product.item?.attributes?.price * product.count}
                  format={"$0,0.00"}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default SummaryItems;
