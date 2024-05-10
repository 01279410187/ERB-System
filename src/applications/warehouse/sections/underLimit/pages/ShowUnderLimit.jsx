import Table from "../../../../../components/shared/table/Table";
import "../../../../../components/shared/table/Table.scss";
import { getUderLimit } from "../../../../../apis/underLimit";
const ShowUnderLimit = () => {
    const tableHeaders = [
        { key: "id", value: "الكود" },
        { key: "name", value: "التصنيف الفرعى " },
        { key: "recipe_category", nestedKey: "name", value: " التصنيف الرئيسى " },
        { key: "unit", nestedKey: "name", value: "الوحدة " },

        { key: "quantity", value: "الكمية المتبقية  " },
    ];
    const filters = [
        { key: "name", type: "text", placeholder: "إبحث باللإسم", id: "الإسم" },

    ];


    return (
        <div>
            <Table
                headers={tableHeaders}
                title="حد الامان"
                filters={filters}
                fetchData={(filterValues, currentPage) =>
                    getUderLimit(filterValues, currentPage, "")
                }


            />
        </div>
    );
};

export default ShowUnderLimit;
