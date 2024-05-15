import Table from "../../../../../components/shared/table/Table";
import {
  getPaymentMethods,
  deletePaymentMethod,
} from "../../../../../apis/clients/PaymentMethod";
import { useAuth } from "../../../../../context/AuthContext";
const PaymentMethod = () => {
  const { user } = useAuth();
  const tableHeaders = [
    { key: "id", value: "الكود" },
    { key: "name", value: "الإسم" },
    { key: "label", value: "النوع" },
  ];
  const filters = [
    // { key: "name", type: "text", placeholder: "إبحث باللإسم", id: "الإسم" },
  ];
  const actions = [
    {
      type: `${
        user?.permissions.some((permission) => permission.id === 123)
          ? "edit"
          : ""
      }`,
      label: "تعديل",
      route: "/warehouse/clients/:id/edit-payment-method",
    },
    {
      type: `${
        user?.permissions.some((permission) => permission.id === 123)
          ? "delete"
          : ""
      }`,
      label: "حذف",
    },
    {
      type: `${
        user?.permissions.some((permission) => permission.id === 123)
          ? "add"
          : ""
      }`,
      label: "إضافة طرق دفع",
      route: "/warehouse/clients/add-payment-method",
    },
  ];

  return (
    <div>
      <Table
        headers={tableHeaders}
        title="طرق الدفع"
        filters={filters}
        fetchData={(filterValues, currentPage, setIsLoading) =>
          getPaymentMethods(filterValues, currentPage, setIsLoading)
        }
        actions={actions}
        deleteFn={deletePaymentMethod}
      />
    </div>
  );
};

export default PaymentMethod;
