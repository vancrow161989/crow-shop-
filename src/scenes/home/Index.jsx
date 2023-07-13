import Slideshow from "./Slideshow/Slideshow";
import ProductList from "./ProductList/ProductList";
import ClickablePanels from "./ClickablePanels/ClickablePanels";
import MiniBlog from "./MiniBlog/MiniBlog";

function Index() {
  return (
    <div className="home">
      <Slideshow />
      <ProductList />
      <ClickablePanels />
      <MiniBlog />
    </div>
  );
}

export default Index;
