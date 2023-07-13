import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function ItemGallery({ img, subImages }) {
  return (
    <>
      <div>
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={true}
          showIndicators={false}
          interval={2000}
          showStatus={false}
          emulateTouch={true}
          selectedItem={-1}>
          {subImages?.map((images) => (
            <img
              key={images.id}
              src={images?.attributes?.url}
              alt={images?.attributes?.name}
            />
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default ItemGallery;
