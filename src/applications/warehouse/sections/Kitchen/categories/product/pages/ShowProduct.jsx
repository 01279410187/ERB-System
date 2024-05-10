import Table from "../../../../../../../components/shared/table/Table";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { deleteProduct, getProductsFilterById } from "../../../../../../../apis/product";

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
    ];
    const detailsHeaders = [
        { key: "type", label: "النوع", isArray: false },
        { key: "unit", label: "الوحدة", isArray: false },
        { key: "minimum_limit", label: "الحد الأدنى", isArray: false },
    ];
    return (
        <div>
            <Table
                headers={tableHeaders}
                detailsHeaders={detailsHeaders}
                filters={filters}
                actions={actions}
                deleteFn={deleteProduct}
                // showFn={getRecipesById}
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
