import Table from "../../../../../components/shared/table/Table";
import "../../../../../components/shared/table/Table.scss";
import { deleteDeaprtment, deleteProductDeaprtment, getDeaprtmentsFilterById } from "../../../../../apis/department";
import { useParams } from "react-router-dom";
const ShowProductDepartment = () => {
    const { id } = useParams();
    const tableHeaders = [
        // { key: "code", value: "الكود" },
        {
            key: "name", value: " الاسم ",
        },
        { key: "image", value: "الصوره", type: "image" },


    ];
    const filters = [
        { key: "name", type: "text", placeholder: "إبحث باللإسم", id: "الإسم" },

    ];
    const actions = [
        {
            type: "delete",
            label: "حذف",
        },


        {
            type: "add",
            label: "إضافة منتج الى القسم ",
            route: `/warehouse/departments/add-product-to-department/${id}`,
        },
    ];


    return (
        <div>
            <Table
                headers={tableHeaders}
                title=" منتجات القسم"
                filters={filters}

                id={id}
                fetchData={(filters, id, setIsLoading) =>
                    getDeaprtmentsFilterById(filters, id, setIsLoading)
                }
                actions={actions}
                deleteFn={deleteProductDeaprtment}


            />
        </div>
    );
};

export default ShowProductDepartment;
