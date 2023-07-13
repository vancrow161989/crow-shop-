import { Carousel } from "react-responsive-carousel";
import config from "../../../../config.json";
import useFetch from "../../../hooks/useFetch";
import Slider from "./Slider";
import CardSkeleton from "../../../components/common/CardSkeleton";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const { apiUrl } = config;
const apiEndPoint = `${apiUrl}/home-sliders?populate=image`;

function Slideshow() {
  const { data, isLoading, errors } = useFetch(apiEndPoint);

  return (
    <>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
        interval={3000}
        showStatus={false}>
        {isLoading || errors ? (
          <CardSkeleton />
        ) : (
          data?.data.map((item) => (
            <Slider
              key={`slider-${item.id}`}
              title={item.attributes.title}
              content={item.attributes.content}
              btnText="learn more"
              img={`${config.baseUrl}${item.attributes.image?.data.attributes.url}`}
            />
          ))
        )}
      </Carousel>
    </>
  );
}

export default Slideshow;
