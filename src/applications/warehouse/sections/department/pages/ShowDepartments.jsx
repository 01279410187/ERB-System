import Table from "../../../../../components/shared/table/Table";
import "../../../../../components/shared/table/Table.scss";
import { deleteDeaprtment, getDeaprtments } from "../../../../../apis/department";
const ShowDepartment = () => {
    const tableHeaders = [
        { key: "code", value: "الكود" },
        {
            key: "name", value: " الاسم ", clickable: true,
            route: "/warehouse/departments/show-departments/product/:id",
        },
        { key: "image", value: "الصوره", type: "image" },


    ];
    const filters = [
        { key: "name", type: "text", placeholder: "إبحث باللإسم", id: "الإسم" },

    ];
    const actions = [
        {
            type: "edit",
            label: "تعديل",
            route: "/warehouse/departments/:id/edit-departments",
        },
        {
            type: "delete",
            label: "حذف",
        },


        {
            type: "add",
            label: "إضافة قسم ",
            route: "/warehouse/departments/add-departments",
        },
    ];

    return (
        <div>
            <Table
                headers={tableHeaders}
                title=" المنافذ"
                filters={filters}

                fetchData={(filterValues, currentPage, setIsLoading) =>
                    getDeaprtments(filterValues, currentPage, setIsLoading)
                }
                actions={actions}
                deleteFn={deleteDeaprtment}


            />
        </div>
    );
};

export default ShowDepartment;
