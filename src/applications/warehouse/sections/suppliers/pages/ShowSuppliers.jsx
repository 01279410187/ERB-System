import Table from "../../../../../components/shared/table/Table";
import { getSuppliers } from "../../../../../apis/suppliers";
import { useEffect, useState } from "react";
const ShowSuppliers = () => {
  const tableHeaders = [
    { key: "id", value: "الكود" },
    { key: "name", value: "الإسم" },
    { key: "phone", value: "الرقم" },
    { key: "address", value: "العنوان" },
  ];
  return (
    <div>
      <Table
        headers={tableHeaders}
        routes={{
          edit: "/warehouse/suppliers/edit-supplier",
          delete: "/warehouse/suppliers/delete-supplier",
          showInvoices: "/warehouse/suppliers",
          add: "/warehouse/suppliers/add-supplier",
        }}
        actions={{ edit: true, delete: true, showInvoices: true, add: true }}
        title="الموردين"
        filters={{
          الاسم: "ابحث بالإسم",
          الموبايل: "ابحث بالموبايل",
        }}
        fetchData={getSuppliers}
      />
    </div>
  );
};

export default ShowSuppliers;
