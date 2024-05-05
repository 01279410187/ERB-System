import Table from "../../../../../../components/shared/table/Table";
import { getRecipeCategoryParent } from "../../../../../../apis/recipes/recipeCategoryParent";
import { Link } from "react-router-dom";

const ShowRecipesCategoryParent = () => {
  const tableHeaders = [
    { key: "id", value: "الكود" },
    { key: "name", value: "الإسم" },
    { key: "image", value: "الصوره", type: "image" },
  ];
  const filters = [{ key: "الإسم", type: "text", placeholder: "إبحث باللإسم" }];
  return (
    <div>
      <Table
        headers={tableHeaders}
        title=" الاقسام"
        filters={filters}
        fetchData={getRecipeCategoryParent}
        addition={{ navigate: true, route: "/warehouse/recipes/add-recipes-parent" }}

      >
        <Link to={`/warehouse/recipes/edit-recipes-parent/:id`}>
          <button className="button edit">تعديل</button>
        </Link>
        <Link to={`/warehouse/suppliers/delete-supplier/:id`}>
          <button className="button delete">حذف</button>
        </Link>
      </Table>
    </div>
  );
};

export default ShowRecipesCategoryParent;
