import Table from "../../../../../../components/shared/table/Table";
import { deleteRecipeSubCategoryParent, getRecipeCategoryParent } from "../../../../../../apis/recipes/recipeCategoryParent";
import { Link } from "react-router-dom";

const ShowRecipesCategoryParent = () => {
  const tableHeaders = [
    { key: "id", value: "الكود" },
    { key: "name", value: "الإسم" },
    { key: "image", value: "الصوره", type: "image" },
  ];

  const actions = [
    {
      type: "edit",
      label: "تعديل",
      route: "/warehouse/recipes/edit-recipes-parent/:id",
    },
    {
      type: "delete",
      label: "حذف",
    },
    {
      type: "add",
      label: "إضافة قسم المخزن",
      route: `/warehouse/recipes/add-recipes-parent`,
    },
  ];
  const filters = [{ key: "name", type: "text", placeholder: "إبحث باللإسم" }];
  return (
    <div>
      <Table
        headers={tableHeaders}
        filters={filters}
        title="القسم"
        actions={actions}
        fetchData={(filters, currentPage) =>
          getRecipeCategoryParent(filters, currentPage)
        }
        deleteFn={deleteRecipeSubCategoryParent}
      />
    </div>
  );
};

export default ShowRecipesCategoryParent;
