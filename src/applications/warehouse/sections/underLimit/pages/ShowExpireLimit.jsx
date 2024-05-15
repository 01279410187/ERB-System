import Table from "../../../../../components/shared/table/Table";
import "../../../../../components/shared/table/Table.scss";
import {
  getExpireLimit,
  getUnderExiperById,
} from "../../../../../apis/underLimit";
import { useAuth } from "../../../../../context/AuthContext";
import { getAllDeaprtments } from "../../../../../apis/department";
import { useEffect, useState } from "react";
const ShowExpireLimit = () => {
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
    { key: "days_before_expire", value: "أيام التنبيه قبل انتهاء الصلاحية" },

    // { key: "quantity", value: "الكمية المتبقية  " },
  ];

  const tableHeadersDetailes = [
    { key: "expire_date", label: "تاريخ انتهاء الصلاحيه" },
    { key: "quantity", label: "الكميه" },
  ];
  // const filters = [
  //     { key: "name", type: "text", placeholder: "إبحث باللإسم", id: "الإسم" },

  // ];
  const filters = [
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

  const actions = [
    {
      type: `${
        user?.permissions.some(
          (permission) => permission.name === "expire_date limit"
        )
          ? "show"
          : ""
      }`,
      label: "التفاصيل",
    },
  ];

  return (
    <div>
      <Table
        headers={tableHeaders}
        title="حد الصلاحية"
        detailsHeaders={tableHeadersDetailes}
        filters={filters}
        actions={actions}
        fetchData={(filterValues, currentPage) =>
          getExpireLimit(filterValues, currentPage, "")
        }
      />
    </div>
  );
};

export default ShowExpireLimit;
