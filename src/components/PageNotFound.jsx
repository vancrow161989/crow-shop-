import { Link } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import Running from ".././Running";

function PageNotFound() {
  return (
    <div className="about  bg-road bg-cover bg-bottom-road pt-6 md:mt-4 ">
      <div className="container px-6 text-center  md:px-0">
        <h1 className="text-center font-body text-[20vw] leading-[1]  text-gray-700">
          404
        </h1>
        <p className="text-lg">
          Oppss.. Sorry, page not found. Go back to{" "}
          <Link className="text-primary-500" to="/product-list" replace>
            shopping
          </Link>
          ?
        </p>
        <div className="h-[300px] md:h-[400px] lg:h-[500px]">
          <Canvas className="ml-[-1.4rem] mt-[10vw] md:ml-[-1.9rem] md:mt-0 ">
            <directionalLight intensity={1.5} />
            <ambientLight intensity={1.2} />
            <Running />
          </Canvas>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
