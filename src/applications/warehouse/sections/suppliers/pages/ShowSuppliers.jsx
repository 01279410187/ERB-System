import Table from "../../../../../components/shared/table/Table";
import { getSuppliers } from "../../../../../apis/suppliers";
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
  return (
    <div>
      <Table
        headers={tableHeaders}
        title="الموردين"
        filters={filters}
        fetchData={(filterValues, currentPage) =>
          getSuppliers(filterValues, currentPage, "")
        }
      >
        <Link to={`/warehouse/suppliers/edit-supplier/:id`}>
          <button className="button edit">تعديل</button>
        </Link>
        <Link to={`/warehouse/suppliers/delete-supplier/:id`}>
          <button className="button delete">حذف</button>
        </Link>
        <Link to={`/warehouse/suppliers/:id/show-invoices`}>
          <button className="button show">فواتير</button>
        </Link>
      </Table>
    </div>
  );
};

export default ShowSuppliers;
