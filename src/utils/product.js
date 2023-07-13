export function mapToViewModel(product) {
  return {
    id: product.id,
    name: product.attributes?.name,
    shortDescription: product.attributes?.shortDescription,
    longDescription: product.attributes?.longDescription,
    price: product.attributes?.price,
    image: product.attributes?.mainImage.data?.attributes?.url
  };
}

export function findProductinCart(productId) {
  return cartItems?.find((item) => item.productId === productId);
}

export function formattedAmount(amount) {
  return numeral(amount).format("$0,0");
}
