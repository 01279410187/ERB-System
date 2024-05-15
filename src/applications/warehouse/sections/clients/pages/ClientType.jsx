import Table from "../../../../../components/shared/table/Table";
import {
  getClientTypes,
  deleteClientType,
} from "../../../../../apis/clients/ClientType";
import { useAuth } from "../../../../../context/AuthContext";
const ClientType = () => {
  const { user } = useAuth();
  const tableHeaders = [
    { key: "id", value: "الكود" },
    { key: "name", value: "النوع" },
    { key: "new_client", value: "عميل قديم /جديد" },
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
      route: "/warehouse/clients/:id/edit-client-type",
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
      label: "إضافة نوع عميل",
      route: "/warehouse/clients/add-client-type",
    },
  ];

  return (
    <div>
      <Table
        headers={tableHeaders}
        title="أنواع العملاء"
        filters={filters}
        fetchData={(filterValues, currentPage, setIsLoading) =>
          getClientTypes(filterValues, currentPage, setIsLoading)
        }
        actions={actions}
        deleteFn={deleteClientType}
      />
    </div>
  );
};

export default ClientType;
