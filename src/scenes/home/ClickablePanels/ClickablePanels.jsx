import useCategories from "../../../hooks/useCategories";
import config from "../../../../config.json";
import Panels from "../../../components/common/Panels";
import ClickablePanelsSkeleton from "./ClickablePanelsSkeleton";
const { baseUrl } = config;

function ClickablePanels() {
  const { simpleCategories, isLoading, isError } = useCategories();

  return (
    <section className="clickable-panels mt-14 md:mt-28">
      {isLoading || isError ? (
        <ClickablePanelsSkeleton />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4">
          {simpleCategories?.map((category) => (
            <Panels
              key={category.id}
              label={category.label}
              categoryId={category.id}
              imgUrl={baseUrl + category.imgUrl}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ClickablePanels;
