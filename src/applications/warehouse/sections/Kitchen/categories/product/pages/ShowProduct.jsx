import Table from "../../../../../../../components/shared/table/Table";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  deleteProduct,
  getProductsFilterById,
  getProductsById,
} from "../../../../../../../apis/product";
import { useAuth } from "../../../../../../../context/AuthContext";
const ShowProduct = () => {
  const { user } = useAuth();
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
      type: `${
        user?.permissions.some((permission) => permission.id === 103)
          ? "edit"
          : ""
      }`,
      label: "تعديل",
      route: "/warehouse/returants/subcategory/:id/edit-product",
    },

    {
      type: `${
        user?.permissions.some((permission) => permission.id === 104)
          ? "delete"
          : ""
      }`,
      label: "حذف",
    },
    {
      type: `${
        user?.permissions.some((permission) => permission.id === 105)
          ? "add"
          : ""
      }`,
      label: "إضافة منتج",
      route: `/warehouse/returants/subcategory/add-product/${id}`,
    },

    {
      type: `${
        user?.permissions.some((permission) => permission.id === 103)
          ? "show"
          : ""
      }`,
      label: "تفاصيل",
    },
    {
      type: `${
        user?.permissions.some((permission) => permission.id === 108)
          ? "navigate"
          : ""
      }`,
      label: "اضافة مكون",
      route: "/warehouse/returants/subcategory/:id/add-rescipes",
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
        header={"recipes"}
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
