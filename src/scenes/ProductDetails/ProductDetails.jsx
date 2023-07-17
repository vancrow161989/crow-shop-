import { useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import Markdown from "marked-react";
import useFetch from "../../hooks/useFetch";
import { baseUrl } from "../../../config.json";
import ItemGallery from "./itemGallery";
import ItemContent from "./ItemContent";
import AddToCart from "./AddToCart";

function ProductDetails() {
  const { productId } = useParams();
  const url = `${baseUrl}/api/items/${productId}?populate=*`;

  const { data, isLoading, errors } = useFetch(url);
  const { data: product } = data ?? {};

  useEffect(() => {
    console.log("isLoading", isLoading);
  }, [isLoading]);

  const transformProduct = useMemo(() => {
    return product && mapToViewModel(product);
  }, [product]);

  function mapToViewModel(product) {
    return {
      id: product.id,
      name: product.attributes?.name,
      shortDescription: product.attributes?.shortDescription,
      longDescription: product.attributes?.longDescription,
      price: product.attributes?.price,
      image: product.attributes?.mainImage?.data?.attributes?.url,
      subImages: product.attributes?.subImages?.data
    };
  }

  const {
    id,
    name,
    shortDescription,
    longDescription,
    price,
    image,
    subImages
  } = transformProduct ?? {};

  if (isLoading) return null;
  return (
    <div className="item-details pb-9 pt-10 md:pt-20">
      <div className="container lg:px-44">
        <div className="px-4 md:flex md:gap-10 md:px-0">
          <div className="md:flex md:w-7/12  md:gap-[40px] ">
            <ItemGallery img={image} subImages={subImages} />
          </div>
          <div className="md:w-5/12">
            <ItemContent
              name={name}
              price={price}
              description={shortDescription}
            />
            <AddToCart productName={name} productId={id} price={price} />
          </div>
        </div>
        <div className="item-details mt-4 px-4 md:ml-auto md:mt-0 md:mt-14 md:w-11/12 md:px-0 md:pl-6">
          <p>
            <b>Product Description:</b>
          </p>
          <div className="item-long-desc">
            <Markdown>{longDescription}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
