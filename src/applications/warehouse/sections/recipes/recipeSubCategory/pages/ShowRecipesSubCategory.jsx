import Table from "../../../../../../components/shared/table/Table";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeSubCategoryFilterById } from "../../../../../../apis/recipes/recipeSubCategory";
const ShowRecipesSubCategory = () => {
  const tableHeaders = [
    { key: "id", value: "الكود" },
    { key: "name", value: "الإسم" },
    { key: "image", value: "الصوره", type: "image" },

  ];
  const { id } = useParams()

  return (
    <div>
      <Table
        headers={tableHeaders}
        routes={{
          edit: "/warehouse/recipes/subCategory/edit-recipes",
          delete: "/warehouse/recipes/subCategory/delete-recipes",

          add: "/warehouse/recipes/subCategory/add-recipes",
        }}
        actions={{ edit: true, delete: true, add: true }}
        title="التصنيف الفرعى"
        filters={{
          الاسم: "ابحث بالإسم",

        }}
        id={id}
        fetchData={(filters, currentPage) => getRecipeSubCategoryFilterById(filters, currentPage, id)}
      />
    </div>
  );
};

export default ShowRecipesSubCategory;
