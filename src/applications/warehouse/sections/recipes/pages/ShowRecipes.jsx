import Table from "../../../../../components/shared/table/Table";
import { getRecipeCategoryParent } from "../../../../../apis/recipes/recipeCategoryParent";
import { Link } from "react-router-dom";

const Showrecipes = () => {
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
        title="التصنيف الرئيسي"
        filters={filters}
        fetchData={getRecipeCategoryParent}
      >
        <Link to={`/warehouse/suppliers/edit-supplier/:id`}>
          <button className="button edit">تعديل</button>
        </Link>
        <Link to={`/warehouse/suppliers/delete-supplier/:id`}>
          <button className="button delete">حذف</button>
        </Link>
      </Table>
    </div>
  );
};

export default Showrecipes;
