import React, { useEffect, useState } from "react";
import "./InvoiceCategory.scss";
import Button from "./Button/Button";
import {
  getIncomingInvoiceByType,
  getOutgoingInvoiceByType,
  getReturndInvoiceByType,
  getInvoiceById,
  updateInvoice,
  changeInvoiceStatus,
} from "../../../../../apis/invoices";
import Table from "../../../../../components/shared/table/Table";
import { getSuppliers } from "../../../../../apis/suppliers";

function Categories(props) {
  const [selectedCategory, setSelectedCategory] = useState("inComing"); // Default selected category is "الوارد"
  const [supplier, setAllSupplier] = useState([]);

  useEffect(() => {
    const fetchSupplier = async () => {
      const res = await getSuppliers({}, "", () => {});
      setAllSupplier(
        [{ label: "", value: "" }].concat(
          res.data.map((item) => {
            return { label: item.name, value: item.id };
          })
        )
      );
      console.log(departments);
    };

    fetchSupplier();
  }, []);
  const tableHeaders = [
    { key: "id", value: "الكود" },
    { key: "code", value: "  كود الفاتوره" },
    { key: "registration_date", value: "التاريخ" },
    { key: "status", value: "الحالة" },
  ];
  const detailsHeaders = [
    { key: "id", label: "الكود" },
    { key: "name", label: "الإسم" },
    { key: "quantity", label: "الكمية" },
    { key: "price", label: "السعر", isInput: true },
  ];
  const filtersIncoming = [
    {
      key: "code",
      type: "text",
      placeholder: "إبحث بكود الفاتورة",
      id: "كود فاتورة",
    },
    {
      key: "invoice_price",
      type: "text",
      placeholder: "إبحث بسعر الفاتورة",
      id: "سعر الفاتورة",
    },
    {
      key: "supplier_id",
      type: "selection",
      id: "اختر المورد",
      placeholder: "المورد",
      options: supplier,
    },
    { key: "from_date", type: "date", id: "من تاريخ" },
    { key: "to_date", type: "date", id: "إلى تاريخ" },
  ];
  const filtersOutcoming = [
    { key: "code", type: "text", placeholder: "إبحث بالكود", id: "الكود" },
    {
      key: "invoice_price",
      type: "text",
      placeholder: "إبحث بسعر الفاتورة",
      id: "سعر الفاتورة",
    },
    {
      key: "supplier_id",
      type: "selection",
      id: "اختر المورد",
      placeholder: "المورد",
      options: supplier,
    },
    { key: "from_date", type: "date", id: "من تاريخ" },
    { key: "to_date", type: "date", id: "إلى تاريخ" },
  ];
  const filtersReturn = [
    { key: "code", type: "text", placeholder: "إبحث بالكود", id: "الكود" },
    {
      key: "invoice_price",
      type: "text",
      placeholder: "إبحث بسعر الفاتورة",
      id: "سعر الفاتورة",
    },
    {
      key: "supplier_id",
      type: "selection",
      id: "اختر المورد",
      placeholder: "المورد",
      options: supplier,
    },
    { key: "from_date", type: "date", id: "من تاريخ" },
    { key: "to_date", type: "date", id: "إلى تاريخ" },
  ];

  const actionsIncoming = [
    {
      type: "add",
      label: "اضافة فاتورة مورد",
      route: "/warehouse/invoices/incoming/add-Invoices/in_coming",
    },
    {
      type: "show",
      label: "مراجعة",
    },
  ];

  const actionsOutComing = [
    {
      type: "add",
      label: "اضافة فاتورة صرف القسم",
      route: "/warehouse/invoices/incoming/add-Invoices/out_going",
    },
    {
      type: "show",
      label: "مراجعة",
    },
  ];

  const actionsReturnd = [
    {
      type: "add",
      label: "إضافة   فاتورة مرتجع من القسم",
      route: "/warehouse/invoices/incoming/add-Invoices/returned",
    },
    {
      type: "show",
      label: "مراجعة",
    },
  ];

  const CategoriesData = [
    { cat: "فاتورة مورد", type: "inComing" },
    { cat: "فاتورة صرف القسم", type: "outGoing" },
    { cat: "فاتورة مرتجع من القسم", type: "returnd" },
  ];

  const handleCategoryClick = (type) => {
    setSelectedCategory(type);
    console.log(type);
  };

  return (
    <>
      <div className="invoice-container">
        <h1 className="heading text-center p-3">الفواتير </h1>
        <div className="row">
          {CategoriesData.map((category, index) => (
            <Button
              key={index}
              title={category.cat}
              isActive={selectedCategory === category.type}
              onClick={() => handleCategoryClick(category.type)}
            />
          ))}
        </div>
        <div className="invoice-table">
          {selectedCategory === "inComing" && (
            <Table
              headers={tableHeaders}
              filters={filtersIncoming}
              title="فاتورة مورد"
              actions={actionsIncoming}
              fetchData={(filters, id, setIsLoading) =>
                getIncomingInvoiceByType(filters, id, setIsLoading)
              }
              header={"recipes"}
              showFn={getInvoiceById}
              detailsHeaders={detailsHeaders}
              updateFn={updateInvoice}
              changeStatusFn={changeInvoiceStatus}
            />
          )}
          {selectedCategory === "outGoing" && (
            <Table
              headers={tableHeaders}
              filters={filtersOutcoming}
              title="فاتورة صرف القسم"
              actions={actionsOutComing}
              fetchData={(filters, id, setIsLoading) =>
                getOutgoingInvoiceByType(filters, id, setIsLoading)
              }
              header={"recipes"}
              showFn={getInvoiceById}
              detailsHeaders={detailsHeaders}
              updateFn={updateInvoice}
              changeStatusFn={changeInvoiceStatus}
            />
          )}
          {selectedCategory === "returnd" && (
            <Table
              headers={tableHeaders}
              filters={filtersReturn}
              title="فاتورة مرتجع من القسم"
              actions={actionsReturnd}
              fetchData={(filters, id, setIsLoading) =>
                getReturndInvoiceByType(filters, id, setIsLoading)
              }
              header={"recipes"}
              showFn={getInvoiceById}
              detailsHeaders={detailsHeaders}
              updateFn={updateInvoice}
              changeStatusFn={changeInvoiceStatus}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Categories;
