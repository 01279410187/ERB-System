import Table from "../../../../../../components/shared/table/Table";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRecipesFilterById } from "../../../../../../apis/recipes/recipe";
const ShowRecipe = () => {
  const tableHeaders = [
    { key: "id", value: "الكود" },
    { key: "name", value: "الإسم", },
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
        addition={{ navigate: true, route: "/warehouse/recipes/recipe/add-recipes" }}

        title="التصنيف الفرعى"

        id={id}
        fetchData={(filters, currentPage) => getRecipesFilterById(filters, currentPage, id)}
      >
        <Link to={`/warehouse/recipes/recipe/edit-recipes/:id`}>
          <button className="button edit">تعديل</button>
        </Link>
        <Link to={`/warehouse/recipes/recipe/delete-recipes/:id`}>
          <button className="button delete">حذف</button>
        </Link>
        <Link to={`/warehouse/recipes/recipe/details-recipe/:id`}>
          <button className="button show">تفاصيل</button>
        </Link>
      </Table>
    </div>
  );
};

export default ShowRecipe;
