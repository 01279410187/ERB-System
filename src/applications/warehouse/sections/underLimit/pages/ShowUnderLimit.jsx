import Table from "../../../../../components/shared/table/Table";
import "../../../../../components/shared/table/Table.scss";
import { getUderLimit } from "../../../../../apis/underLimit";
import { useAuth } from "../../../../../context/AuthContext";
import { useState, useEffect } from "react";
import { getAllDeaprtments } from "../../../../../apis/department";
const ShowUnderLimit = () => {
  const { user } = useAuth();
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    const fetchDepartments = async () => {
      const res = await getAllDeaprtments();
      setDepartments(res.data);
    };
    fetchDepartments();
  }, []);
  const tableHeaders = [
    { key: "id", value: "الكود" },
    { key: "name", value: "التصنيف الفرعى " },
    { key: "recipe_category", nestedKey: "name", value: " التصنيف الرئيسى " },
    { key: "unit", nestedKey: "name", value: "الوحدة " },

    { key: "quantity", value: "الكمية المتبقية  " },
  ];
  const filters = [
    { key: "name", type: "text", placeholder: "إبحث باللإسم", id: "الإسم" },
    user?.department.type === "master"
      ? {
          key: "department_id",
          type: "selection",
          id: "نوع القسم",
          placeholder: "إختار قسم لإظهار نتائج",
          options: departments.map((department) => {
            return { value: department.id, label: department.name };
          }),
        }
      : null,
  ];

  return (
    <div>
      <Table
        headers={tableHeaders}
        title="حد الامان"
        filters={filters}
        fetchData={(filterValues, currentPage) =>
          getUderLimit(filterValues, currentPage, "")
        }
      />
    </div>
  );
};

export default ShowUnderLimit;
