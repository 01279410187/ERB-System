import React, { useState } from "react";
import "./InvoiceCategory.scss";
import Button from "./Button/Button";
import { getIncomingInvoiceByType, getOutgoingInvoiceByType, getReturndInvoiceByType } from "../../../../../apis/invoices";
import Table from "../../../../../components/shared/table/Table";

function Categories(props) {
    const [selectedCategory, setSelectedCategory] = useState("inComing"); // Default selected category is "الوارد"

    const tableHeaders = [
        { key: "id", value: "الكود" },
        { key: "code", value: "  كود الفاتوره" },
        { key: "status", value: "الحاله" },
        // { key: "image", value: "الصوره", type: "image" },

    ];

    const filtersIncoming = [
        { key: "name", type: "text", placeholder: "إبحث باللإسم", id: "الإسم" },
    ];
    const filtersOutcoming = [
        { key: "name", type: "text", placeholder: "إبحث باللإسم", id: "الإسم" },
    ];
    const filtersReturn = [
        { key: "name", type: "text", placeholder: "إبحث باللإسم", id: "الإسم" },
    ];

    const actionsIncoming = [

        {
            type: "delete",
            label: "حذف",
        },
        {
            type: "add",
            label: "إضافة فاتوره  وارده",
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
                            onClick={() => handleCategoryClick(category.type)}
                        />
                    ))}
                    {selectedCategory === "inComing" && (
                        <Table
                            headers={tableHeaders}
                            filters={filtersIncoming}
                            title=" الفواتير الورده"
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
                            title=" الفواتير الصادره"
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
                            title=" الفواتير المرتجع"
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
