import Table from "../../../../../../../components/shared/table/Table";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { deleteProduct, getProductsFilterById, getProductsById } from "../../../../../../../apis/product";

const ShowProduct = () => {
    const tableHeaders = [
        { key: "id", value: "الكود" },
        { key: "name", value: "الإسم" },
        { key: "image", value: "الصوره", type: "image" },
    ];
    const filters = [
        { key: "name", type: "text", placeholder: "إبحث باللإسم", id: "الإسم" },
    ];
    const { id } = useParams();

    const actions = [
        {
            type: "edit",
            label: "تعديل",
            route: "/warehouse/returants/subcategory/:id/edit-product",
        },

        {
            type: "delete",
            label: "حذف",
        },
        {
            type: "add",
            label: "إضافة منتج",
            route: `/warehouse/returants/subcategory/add-product/${id}`,
        },


        {
            type: "show",
            label: "تفاصيل",

        },
        {
            type: "navigate",
            label: "اضافة مكون",
            route: "/warehouse/returants/subcategory/:id/add-rescipes"
        },



    ];
    const detailsHeaders = [
        { key: "id", label: "الكود" },
        { key: "quantity", label: "الكمية", isInput: true },
        { key: "name", label: "الإسم" },
        { key: "type", label: "النوع" },
        { key: "unit", label: "الوحدة" },

    ];
    return (
        <div>
            <Table
                headers={tableHeaders}
                detailsHeaders={detailsHeaders}
                filters={filters}
                actions={actions}
                deleteFn={deleteProduct}
                header={'recipes'}
                showFn={getProductsById}
                title="المنتجات"
                id={id}
                fetchData={(filters, currentPage) =>
                    getProductsFilterById(filters, currentPage, id)
                }
            />
        </div>
    );
};

export default ShowProduct;
