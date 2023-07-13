import { ArrowPathIcon } from "@heroicons/react/24/solid";

function Loader({ loadingText = "" }) {
  return (
    <div className="text-center">
      <ArrowPathIcon className="my-4 mx-auto h-20 w-20 animate-spin py-4" />
      <p className="text-gray-400">{loadingText}</p>
    </div>
  );
}

export default Loader;
