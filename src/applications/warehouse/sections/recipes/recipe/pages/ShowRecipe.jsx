import Table from "../../../../../../components/shared/table/Table";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  deleteRecipe,
  getRecipesById,
  getRecipes,
} from "../../../../../../apis/recipes/recipe";
import { useAuth } from "../../../../../../context/AuthContext";

const ShowRecipe = () => {

  const { user } = useAuth();

  const tableHeaders = [
    { key: "name", value: "الإسم" },
    { key: "image", value: "الصوره", type: "image" },
  ];
  const filters = [
    { key: "name", type: "text", placeholder: "إبحث باللإسم", id: "الإسم" },
  ];
  const { id } = useParams();

  const actions = [
    {
      type: `${user?.permissions.some((permission) => permission.name === "edit recipe")
        ? "edit"
        : ""
        }`,
      label: "تعديل",
      route: "/warehouse/recipes/recipe/:id/edit-recipes",
    },
    {
      type: `${user?.permissions.some((permission) => permission.name === "delete recipe")
        ? "delete"
        : ""
        }`,
      label: "حذف",
    },
    {
      type: `${user?.permissions.some((permission) => permission.name === "add recipe")
        ? "add"
        : ""
        }`,
      label: "إضافة تصنيف فرعى",
      route: `/warehouse/recipes/recipe/add-recipes/${id}`,
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
        showFn={(id, setIsLoading) => getRecipesById(id, setIsLoading)}
        title="التصنيف الفرعى"
        id={id}
        fetchData={(filters, id, setIsLoading) =>
          getRecipes(filters, id, setIsLoading)
        }
      />
    </div>
  );
};

export default ShowRecipe;
