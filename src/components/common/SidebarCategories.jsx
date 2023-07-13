import ListItems from "./../../components/common/ListItems";
import useCategories from "../../hooks/useCategories";

function SidebarCategories() {
  const categories = useCategories();

  return (
    <aside>
      <h2>Categories</h2>
      <ListItems />
    </aside>
  );
}
export default SidebarCategories;
