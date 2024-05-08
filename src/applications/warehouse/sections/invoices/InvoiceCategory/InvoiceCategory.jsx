import React, { useEffect, useState } from "react";
import "./InvoiceCategory.scss";
import Button from "./Button/Button";
import { getIncomingInvoiceByType, getOutgoingInvoiceByType, getReturndInvoiceByType } from "../../../../../apis/invoices";
import Table from "../../../../../components/shared/table/Table";
import { getSuppliers } from "../../../../../apis/suppliers";

function Categories(props) {
    const [selectedCategory, setSelectedCategory] = useState("inComing"); // Default selected category is "الوارد"
    const [supplier, setAllSupplier] = useState([]);

    useEffect(() => {
        const fetchSupplier = async () => {
            const res = await getSuppliers();
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
        // { key: "image", value: "الصوره", type: "image" },

    ];

    const filtersIncoming = [
        // { key: "name", type: "text", placeholder: "إبحث باللإسم", id: "الإسم" },
        { key: "code", type: "text", placeholder: "إبحث بالكود", id: "الكود" },
        { key: "invoice_price", type: "text", placeholder: "إبحث بسعر الفاتورة", id: "سعر الفاتورة" },

        { key: "from_date", type: "date", id: "من تاريخ" },
        { key: "to_date", type: "date", id: "إلى تاريخ" },

        {
            key: "supplier_id",
            type: "selection",
            id: "اختر المورد",
            placeholder: "المورد",
            options: supplier,
        },

    ];
    const filtersOutcoming = [
        { key: "code", type: "text", placeholder: "إبحث بالكود", id: "الكود" },
        { key: "invoice_price", type: "text", placeholder: "إبحث بسعر الفاتورة", id: "سعر الفاتورة" },

        { key: "from_date", type: "date", id: "من تاريخ" },
        { key: "to_date", type: "date", id: "إلى تاريخ" },

        {
            key: "supplier_id",
            type: "selection",
            id: "اختر المورد",
            placeholder: "المورد",
            options: supplier,
        },
    ];
    const filtersReturn = [
        { key: "code", type: "text", placeholder: "إبحث بالكود", id: "الكود" },
        { key: "invoice_price", type: "text", placeholder: "إبحث بسعر الفاتورة", id: "سعر الفاتورة" },

        { key: "from_date", type: "date", id: "من تاريخ" },
        { key: "to_date", type: "date", id: "إلى تاريخ" },

        {
            key: "supplier_id",
            type: "selection",
            id: "اختر المورد",
            placeholder: "المورد",
            options: supplier,
        },
    ];

    const actionsIncoming = [
        {
            type: "delete",
            label: "حذف",
        },
        {
            type: "add",
            label: "إضافة فاتورة واردة",
            route: "/warehouse/invoices/incoming/add-Invoices/in_coming",
        },
    ];

    const actionsOutComing = [
        {
            type: "delete",
            label: "حذف",
        },
        {
            type: "add",
            label: "إضافة فاتوره  صادره",
            route: "/warehouse/invoices/incoming/add-Invoices/out_going",
        },
    ];

    const actionsReturnd = [
        {
            type: "delete",
            label: "حذف",
        },
        {
            type: "add",
            label: "إضافة فاتوره  مرتجع",
            route: "/warehouse/invoices/incoming/add-Invoices/returned",
        },
    ];

    const CategoriesData = [
        { cat: "الوارد", type: "inComing" },
        { cat: "الصادر", type: "outGoing" },
        { cat: "المرتجع", type: "returnd" },
    ];

    const handleCategoryClick = (type) => {
        setSelectedCategory(type);
        console.log(type)
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
                            title=" الفواتير الوردة"
                            actions={actionsIncoming}
                            fetchData={(filters, currentPage) =>
                                getIncomingInvoiceByType(filters, currentPage)
                            }
                        />
                    )}
                    {selectedCategory === "outGoing" && (
                        <Table
                            headers={tableHeaders}
                            filters={filtersOutcoming}
                            title=" الفواتير الصادرة"
                            actions={actionsOutComing}
                            fetchData={(filters, currentPage) =>
                                getOutgoingInvoiceByType(filters, currentPage)
                            }
                        />
                    )}
                    {selectedCategory === "returnd" && (
                        <Table
                            headers={tableHeaders}
                            filters={filtersReturn}
                            title=" الفواتير المرتجعة"
                            actions={actionsReturnd}
                            fetchData={(filters, currentPage) =>
                                getReturndInvoiceByType(filters, currentPage)
                            }
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default Categories;
