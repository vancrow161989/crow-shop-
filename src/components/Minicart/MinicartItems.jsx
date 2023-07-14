import { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Numeral from "react-numeral";
import { TrashIcon } from "@heroicons/react/24/solid";
import useProductsInCart from "../../hooks/useProductsInCart";
import useModal from "../../hooks/useModal";
import { handleKeyDown } from "../../utils/forms";
import {
  calculateCartTotals,
  updateCartItemQuantity,
  removeItemFromCart
} from "../../store/cart";

function MinicartItems() {
  const [selectedItem, setSelectedItem] = useState(null);
  const { productId } = useParams();
  const { productsInCart } = useProductsInCart();
  const { isModalShow, Modal, handleCloseModal, handleOpenModal } = useModal();
  const dispatch = useDispatch();
  const cartProducts = useMemo(
    () =>
      productsInCart?.map((product) => ({
        ...product,
        prevValue: product.count
      })),
    [productsInCart]
  );

  const [products, setproducts] = useState(cartProducts);

  useEffect(() => {
    dispatch(calculateCartTotals());
    setproducts(cartProducts);
  }, [productsInCart]);

  const setQuantityNewValue = useCallback((productId, newValue, prevValue) => {
    const updatedProducts = [...products];

    const index = updatedProducts.findIndex(
      (product) => product.item.id === productId
    );
    updatedProducts[index].count =
      newValue !== prevValue && newValue !== 0 && newValue !== ""
        ? newValue
        : prevValue;

    setproducts(updatedProducts);
  }, []);

  const handleInputChange = (productId, { value }, prevValue) => {
    const newValue = Number(value);
    setQuantityNewValue(productId, newValue, prevValue);
  };

  const handleIncreaseCount = (productId, quantityCount, prevValue) => {
    const newValue = Number(quantityCount) + 1;
    setQuantityNewValue(productId, newValue, prevValue);
  };

  const handleDecreaseCount = (productId, quantityCount, prevValue) => {
    let newValue = Number(quantityCount);
    if (newValue === 1) return;
    newValue = Number(quantityCount) - 1;
    setQuantityNewValue(productId, newValue, prevValue);
  };

  const handleUpdateCart = (productName, productId, quantityCount) => {
    dispatch(updateCartItemQuantity({ productId, quantityCount }));
    const msgSuccess = (
      <>
        The quantity of <b className="underline">{productName}</b> has been
        updated from cart
      </>
    );

    toast.success(msgSuccess, {
      position: "top-center",
      hideProgressBar: true
    });
  };

  const handleRemoveItem = (productId, productName) => {
    dispatch(removeItemFromCart(productId));
    handleCloseModal();
    setSelectedItem(null);
    const msgSuccess = (
      <>
        <b className="underline">{productName}</b> has been removed from cart
      </>
    );
    toast.success(msgSuccess, {
      position: "top-center",
      hideProgressBar: true
    });
  };

  const raiseOpenModal = (item) => {
    setSelectedItem(item);
    handleOpenModal();
  };

  const renderProductLink = (itemId, imgUrl) => {
    if (Number(productId) === itemId) {
      return <img src={imgUrl} />;
    } else {
      return (
        <Link to={`/product-list/${itemId}`}>
          <img src={imgUrl} />
        </Link>
      );
    }
  };

  const renderMessage = () => {
    return (
      <>
        `Are you sure you want to remove{" "}
        <b>{selectedItem?.item?.attributes?.name}?`</b>
      </>
    );
  };

  return (
    <>
      {isModalShow && (
        <Modal
          message={renderMessage()}
          cloeModalLabel="Close"
          closeModal={handleCloseModal}
          confirmedActionLabel="Yes"
          confirmedAction={() =>
            handleRemoveItem(
              selectedItem?.item?.id,
              selectedItem?.item?.attributes?.name
            )
          }
          buttonConfirmedColor="danger"
        />
      )}

      {products?.length !== 0 ? (
        <ul className="mb-4 mt-2 max-h-[50vh] min-h-[50px] overflow-y-auto border-t-[1px] border-gray-300 pb-1 pt-1">
          {products
            ?.map((product) => (
              <li
                key={product.item?.id}
                className="mb-4 border-b border-gray-100 px-1 pb-4">
                <div className="cart-item flex gap-4">
                  <div className="cart-img w-4/12">
                    {renderProductLink(
                      product?.item?.id,

                      product?.item?.attributes?.mainImage?.data?.attributes
                        ?.formats?.thumbnail?.url
                    )}
                  </div>
                  <div className="cart-details mt-1 w-8/12">
                    <p className="text-sm font-semibold">
                      {product.item?.attributes?.name}
                    </p>
                    <p>
                      <Numeral
                        value={product.item?.attributes?.price}
                        format={"$0,0"}
                      />
                    </p>
                    <div className="cartActions mt-5 flex items-center space-x-2 ">
                      <label htmlFor="qty">Qty: </label>
                      <button
                        className="btn h-9 w-9 p-1 text-2xl hover:text-white"
                        onClick={() =>
                          handleDecreaseCount(
                            product.item.id,
                            product.count,
                            product.prevValue
                          )
                        }>
                        -
                      </button>
                      <input
                        className="h-9 w-11 text-center"
                        type="text"
                        id="qty"
                        onKeyDown={handleKeyDown}
                        onChange={(e) =>
                          handleInputChange(
                            product.item.id,
                            e.target,
                            product.prevValue
                          )
                        }
                        value={product.count}
                      />
                      <button
                        className="btn h-9 w-9 p-1 text-2xl hover:text-white"
                        onClick={() =>
                          handleIncreaseCount(
                            product.item.id,
                            product.count,
                            product.prevValue
                          )
                        }>
                        +
                      </button>
                    </div>
                    {product.count !== product.prevValue && (
                      <button
                        className="btn btn-sm btn-wide my-2"
                        onClick={() =>
                          handleUpdateCart(
                            product.item?.attributes?.name,
                            product.item.id,
                            product.count
                          )
                        }>
                        Update Cart
                      </button>
                    )}
                    <div className="mt-5 flex items-center justify-between">
                      <div>
                        total:
                        <Numeral
                          className="ml-1 font-semibold"
                          value={
                            product.count * product.item?.attributes?.price || 0
                          }
                          format={"$0,0"}
                        />
                      </div>
                      <div>
                        <TrashIcon
                          className="mb-2 ml-auto  w-6 cursor-pointer stroke-none text-gray-500"
                          onClick={() => raiseOpenModal(product)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))
            .reverse()}
        </ul>
      ) : (
        <p className="my-4 border-y border-gray-200 px-4 py-8 text-center">
          Your cart is currently empty.
        </p>
      )}
    </>
  );
}

export default MinicartItems;
