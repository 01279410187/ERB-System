import Table from "../../../../../components/shared/table/Table";
import { getRecipeCategoryParent } from "../../../../../apis/recipes/recipeCategoryParent";
import { useEffect, useState } from "react";
const Showrecipes = () => {
  const tableHeaders = [
    { key: "id", value: "الكود" },
    { key: "name", value: "الإسم" },
    { key: "image", value: "الصوره", type: "image" },

  ];
  return (
    <div>
      <Table
        headers={tableHeaders}
        routes={{
          edit: "/warehouse/recipes/edit-recipes",
          delete: "/warehouse/recipes/delete-recipes",

          add: "/warehouse/recipes/add-recipes",
        }}
        actions={{ edit: true, delete: true, add: true }}
        title="التصنيف الرئيسي"
        filters={{
          name: "ابحث بالإسم",

        }}
        fetchData={getRecipeCategoryParent}
      />
    </div>
  );
};

export default Showrecipes;
