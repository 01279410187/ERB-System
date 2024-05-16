import Table from "../../../../../components/shared/table/Table";
import "../../../../../components/shared/table/Table.scss";
import {
  getExpireLimit,
  getUnderExiperById,
} from "../../../../../apis/underLimit";
import { useAuth } from "../../../../../context/AuthContext";
const ShowExpireLimit = () => {
  const { user } = useAuth()
  const tableHeaders = [
    { key: "name", value: "التصنيف الفرعى " },
    { key: "recipe_category", nestedKey: "name", value: " التصنيف الرئيسى " },
    { key: "unit", nestedKey: "name", value: "الوحدة " },
    { key: "days_before_expire", value: "أيام التنبيه قبل انتهاء الصلاحية" },

    // { key: "quantity", value: "الكمية المتبقية  " },
  ];

  const tableHeadersDetailes = [
    {
      key: "quantities",
      label: "الكميات",
      isArray: true,
      isInput: false,
      details: [
        { key: "quantity", label: "الكمية", isInput: false },
        { key: "expire_date", label: "تاريخ الصلاحية", isInput: false },
      ],
    },
  ]

  const actions = [
    {
      type: `${user?.permissions.some(
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
        header={"quantities"}
        detailsHeaders={tableHeadersDetailes}
        // filters={filters}
        actions={actions}
        fetchData={(filterValues, id) =>
          getExpireLimit(filterValues, user.department.id)
        }
        updateFn={() => getUnderExiperById(user.department.id)}
      />
    </div>
  );
};

export default ShowExpireLimit;
