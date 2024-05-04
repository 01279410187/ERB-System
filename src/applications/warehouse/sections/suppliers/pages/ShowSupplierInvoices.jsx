import { useParams } from "react-router-dom";
import { getSupplierInvoices } from "../../../../../apis/suppliers";
import Table from "../../../../../components/shared/table/Table";
import ShowDataModal from "../../../../../components/ui/ShowDataModal/ShowDataModal";
const ShowSupplierInvoices = () => {
  const { id } = useParams();
  const tableHeaders = [
    { key: "code", value: "كود الفاتورة" },
    { key: "invoice_date", value: "تاريخ الإصدار" },
    { key: "total_price", value: "القيمة" },
    { key: "status", value: "الحالة" },
  ];
  return (
    <div>
      <ShowDataModal>
        <Table
          headers={tableHeaders}
          title="الفواتير"
          routes={{ showInvoices: "/warehouse/suppliers" }}
          fetchData={() => getSupplierInvoices(id)}
        />
      </ShowDataModal>
    </div>
  );
};

export default ShowSupplierInvoices;
