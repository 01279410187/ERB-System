import Table from "../../../../../../components/shared/table/Table";
import {
  deleteRecipeSubCategoryParent,
  getRecipeCategoryParent,
} from "../../../../../../apis/recipes/recipeCategoryParent";
import { Link } from "react-router-dom";

const ShowRecipesCategoryParent = () => {
  const tableHeaders = [
    { key: "id", value: "الكود" },
    { key: "name", value: "الإسم" },
    { key: "image", value: "الصوره", type: "image" },
  ];

  const actions = [
    {
      type: `${
        user?.permissions.some((permission) => permission.id === 137)
          ? "edit"
          : ""
      }`,
      label: "تعديل",
      route: "/warehouse/recipes/edit-recipes-parent/:id",
    },
    {
      type: `${
        user?.permissions.some((permission) => permission.id === 138)
          ? "delete"
          : ""
      }`,
      label: "حذف",
    },
    {
      type: `${
        user?.permissions.some((permission) => permission.id === 136)
          ? "add"
          : ""
      }`,
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
        fetchData={(filters, id, setIsLoading) =>
          getRecipeCategoryParent(filters, id, setIsLoading)
        }
        deleteFn={deleteRecipeSubCategoryParent}
      />
    </div>
  );
};

export default ShowRecipesCategoryParent;
