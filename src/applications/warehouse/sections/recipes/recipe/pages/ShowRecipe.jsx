import Table from "../../../../../../components/shared/table/Table";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getRecipesFilterById,
  deleteRecipe,
  getRecipesById,
  getRecipes,
} from "../../../../../../apis/recipes/recipe";
const ShowRecipe = () => {
  const tableHeaders = [
    { key: "id", value: "الكود" },
    { key: "name", value: "الإسم" },
    { key: "image", value: "الصوره", type: "image" },
  ];
  const filters = [
    { key: "name", type: "text", placeholder: "إبحث باللإسم", id: "الإسم" },
  ];
  const { id } = useParams();

  const actions = [
    {
      type: "edit",
      label: "تعديل",
      route: "/warehouse/recipes/recipe/:id/edit-recipes",
    },
    {
      type: "delete",
      label: "حذف",
    },
    {
      type: "add",
      label: "إضافة تصنيف فرعى",
      route: "/warehouse/recipes/recipe/add-recipes",
    },
    {
      type: "show",
      label: "تفاصيل",
    },
  ];
  const detailsHeaders = [
    { key: "type", label: "النوع", isArray: false },
    { key: "unit", label: "الوحدة", isArray: false },
    { key: "minimum_limit", label: "الحد الأدنى", isArray: false },
  ];
  return (
    <div>
      <Table
        headers={tableHeaders}
        detailsHeaders={detailsHeaders}
        filters={filters}
        actions={actions}
        deleteFn={deleteRecipe}
        showFn={getRecipesById}
        title="التصنيف الفرعى"
        id={id}
        fetchData={(filters, currentPage) =>
          getRecipes(filters, currentPage, id)
        }
      />
    </div>
  );
};

export default ShowRecipe;
