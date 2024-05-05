import Table from "../../../../../../components/shared/table/Table";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRecipeSubCategoryFilterById } from "../../../../../../apis/recipes/recipeSubCategory";
const ShowRecipesSubCategory = () => {
  const tableHeaders = [
    { key: "id", value: "الكود" },
    { key: "name", value: "الإسم", clickable: true, route: "/warehouse/recipes/recipe/show-recipe/:id" },
    { key: "image", value: "الصوره", type: "image" },

  ];
  const filters = [
    { key: "name", type: "text", placeholder: "إبحث باللإسم", id: "الإسم" },

  ];
  const { id } = useParams()
  // routes={{
  //   edit: "/warehouse/recipes/subCategory/edit-recipes",
  //   delete: "/warehouse/recipes/subCategory/delete-recipes",

  //   add: "/warehouse/recipes/subCategory/add-recipes",
  // }}

  return (
    <div>
      <Table
        headers={tableHeaders}

        filters={filters}
        addition={{ navigate: true, route: "/warehouse/recipes/subCategory/add-recipes" }}

        title="التصنيف الرئيسى"

        id={id}
        fetchData={(filters, currentPage) => getRecipeSubCategoryFilterById(filters, currentPage, id)}
      >
        <Link to={`/warehouse/recipes/subCategory/edit-recipes/:id`}>
          <button className="button edit">تعديل</button>
        </Link>
        <Link to={`/warehouse/recipes/subCategory/delete-recipes/:id`}>
          <button className="button delete">حذف</button>
        </Link>
      </Table>
    </div>
  );
};

export default ShowRecipesSubCategory;
