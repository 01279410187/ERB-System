import Table from "../../../../../../components/shared/table/Table";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {

  deleteRecipeSubCategory,
  getRecipeSubCategory,
} from "../../../../../../apis/recipes/recipeSubCategory";
const ShowRecipesSubCategory = () => {
  const tableHeaders = [
    { key: "id", value: "الكود" },
    {
      key: "name",
      value: "الإسم",
      clickable: true,
      route: "/warehouse/recipes/recipe/show-recipe/:id",
    },
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
      route: "/warehouse/recipes/subCategory/:id/edit-recipes",
    },
    {
      type: "delete",
      label: "حذف",
    },
    {
      type: "add",
      label: "إضافة تصنيف رئيسى",
      route: "/warehouse/recipes/subCategory/add-recipes",
    },
  ];
  return (
    <div>
      <Table
        headers={tableHeaders}
        filters={filters}
        title="التصنيف الرئيسى"
        actions={actions}
        id={id}
        fetchData={(filters, currentPage) =>
          getRecipeSubCategory(filters, currentPage, id)
        }
        deleteFn={deleteRecipeSubCategory}
      />
    </div>
  );
};

export default ShowRecipesSubCategory;
