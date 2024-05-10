import Table from "../../../../../../../components/shared/table/Table";
import { useParams } from "react-router-dom";
import { deleteSubCategory, getSubCategoryFilterById } from "../../../../../../../apis/subCategory";

const ShowSubCategory = () => {
    const tableHeaders = [
        { key: "id", value: "الكود" },
        {
            key: "name",
            value: "الإسم",
            clickable: true,
            route: "/warehouse/returants/subcategory/show-product/:id",
        },
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
            route: "/warehouse/returants/subCategory/:id/edit-subCategory",
        },
        {
            type: "delete",
            label: "حذف",
        },
        {
            type: "add",
            label: "إضافة قسم فرعى",
            route: `/warehouse/returants/add-subcategory/${id}`,
        },
    ];
    return (
        <div>
            <Table
                headers={tableHeaders}
                filters={filters}
                title="اقسام فرعيه"
                actions={actions}
                id={id}
                fetchData={(filters, currentPage) =>
                    getSubCategoryFilterById(filters, currentPage, id)
                }
                deleteFn={deleteSubCategory}
            />
        </div>
    );
};

export default ShowSubCategory;
