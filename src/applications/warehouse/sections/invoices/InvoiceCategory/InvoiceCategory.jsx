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
import { useAuth } from "../../../../../context/AuthContext";
function Categories(props) {
  const [selectedCategory, setSelectedCategory] = useState("inComing"); // Default selected category is "الوارد"
  const [supplier, setAllSupplier] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    const fetchSupplier = async () => {
      const res = await getSuppliers({}, "", () => { });
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
  const statusOptions = [
    { value: "", label: "" },
    { value: "approved", label: "تم المراجعة" },
    { value: "pending", label: "تحت المراجعة" },
    { value: "rejected", label: "مرفوضة" },
  ];
  const tableHeaders = [
    { key: "code", value: "  كود الفاتوره" },
    { key: "invoice_date", value: "تاريخ الإصدار" },
    { key: "registration_date", value: "تاريخ التسجيل" },
    { key: "status", value: "الحالة" },
  ];
  const detailsHeaders = [

    {
      key: "recipes",
      label: "المواد الخام",
      isArray: true,
      isInput: true,
      details: [
        { key: "name", label: "الإسم", isInput: false },
        { key: "quantity", label: "الكمية", isInput: true },
        { key: "price", label: "السعر", isInput: true },
      ],
    },

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
    {
      key: "status",
      type: "selection",
      id: "اختر الحالة",
      placeholder: "الحالة",
      options: statusOptions,
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
      key: "status",
      type: "selection",
      id: "اختر الحالة",
      placeholder: "الحالة",
      options: statusOptions,
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
      key: "status",
      type: "selection",
      id: "اختر الحالة",
      placeholder: "الحالة",
      options: statusOptions,
    },
    { key: "from_date", type: "date", id: "من تاريخ" },
    { key: "to_date", type: "date", id: "إلى تاريخ" },
  ];

  const actionsIncoming = [
    {
      type: `${user?.permissions.some((permission) => permission.name === "create invoice")
        ? "add"
        : ""
        }`,
      label: "اضافة فاتورة مورد",
      route: "/warehouse/invoices/incoming/add-Invoices/in_coming",
    },
    {
      type: `${user?.permissions.some((permission) => permission.name === "edit invoice")
        ? "show"
        : ""
        }`,
      label: "مراجعة",
    },
    {
      type: "navigate",
      label: " طباعه",
      route: "/warehouse/invoices/print/:id"
    },
  ];

  const actionsOutComing = [
    {
      type: `${user?.permissions.some((permission) => permission.name === "create invoice")
        ? "add"
        : ""
        }`,
      label: "اضافة فاتورة صرف القسم",
      route: "/warehouse/invoices/incoming/add-Invoices/out_going",
    },
    {
      type: `${user?.permissions.some((permission) => permission.name === "edit invoice")
        ? "show"
        : ""
        }`,
      label: "مراجعة",
    },
    {
      type: "navigate",
      label: " طباعه",
      route: "/warehouse/invoices/print/:id"
    },
  ];

  const actionsReturnd = [
    {
      type: `${user?.permissions.some((permission) => permission.name === "create invoice")
        ? "add"
        : ""
        }`,
      label: "إضافة   فاتورة مرتجع من القسم",
      route: "/warehouse/invoices/incoming/add-Invoices/returned",
    },
    {
      type: `${user?.permissions.some((permission) => permission.name === "edit invoice")
        ? "show"
        : ""
        }`,
      label: "مراجعة",

    },
    {
      type: "navigate",
      label: " طباعه",
      route: "/warehouse/invoices/print/:id"
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
