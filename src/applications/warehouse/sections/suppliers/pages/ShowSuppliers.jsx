import Table from "../../../../../components/shared/table/Table";
import { getSuppliers, deleteSupplier } from "../../../../../apis/suppliers";
import { Link } from "react-router-dom";
import "../../../../../components/shared/table/Table.scss";
const ShowSuppliers = () => {
  const tableHeaders = [
    { key: "id", value: "الكود" },
    { key: "name", value: "الإسم" },
    { key: "phone", value: "الرقم" },
    { key: "address", value: "العنوان" },
  ];
  const filters = [
    { key: "name", type: "text", placeholder: "إبحث باللإسم", id: "الإسم" },
    {
      key: "phone",
      type: "text",
      placeholder: "إبحث برقم الموبايل",
      id: "رقم الموبايل",
    },
  ];
  const actions = [
    {
      type: "edit",
      label: "تعديل",
      route: "/warehouse/suppliers/:id/edit-supplier",
    },
    {
      type: "delete",
      label: "حذف",
    },
    {
      type: "show",
      label: "فواتير",
      route: "/warehouse/suppliers/:id/show-invoices",
    },
    {
      type: "add",
      label: "إضافة موردين",
      route: "/warehouse/suppliers/add-supplier",
    },
  ];
  const info = {
    title: "User Information",
    data: [
      { Name: "John Doe", Age: 30, Email: "john@example.com" },
      { Name: "Jane Smith", Age: 25, Email: "jane@example.com" },
    ],
  };
  return (
    <div>
      <Table
        headers={tableHeaders}
        title="الموردين"
        filters={filters}
        fetchData={(filterValues, currentPage) =>
          getSuppliers(filterValues, currentPage, "")
        }
        actions={actions}
        deleteFn={deleteSupplier}
        info={info}
      />
    </div>
  );
};

export default ShowSuppliers;
