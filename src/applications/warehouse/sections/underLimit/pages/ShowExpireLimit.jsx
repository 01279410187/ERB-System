import Table from "../../../../../components/shared/table/Table";
import "../../../../../components/shared/table/Table.scss";
import { getExpireLimit, getUnderExiperById } from "../../../../../apis/underLimit";
const ShowExpireLimit = () => {
    const tableHeaders = [
        { key: "id", value: "الكود" },
        { key: "name", value: "التصنيف الفرعى " },
        { key: "recipe_category", nestedKey: "name", value: " التصنيف الرئيسى " },
        { key: "unit", nestedKey: "name", value: "الوحدة " },
        { key: "days_before_expire", value: "عدد ايام الصلاحية " },

        // { key: "quantity", value: "الكمية المتبقية  " },
    ];

    const tableHeadersDetailes = [
        { key: "expire_date", label: "تاريخ الصلاحيه" },
        { key: "quantity", label: "الكميه" },

    ];
    // const filters = [
    //     { key: "name", type: "text", placeholder: "إبحث باللإسم", id: "الإسم" },

    // ];

    const actions = [
        {
            type: "show",
            label: "التفاصيل",
        },
    ];


    return (
        <div>
            <Table
                headers={tableHeaders}
                title="حد الصلاحية"
                header={"quantities"}
                detailsHeaders={tableHeadersDetailes}
                // filters={filters}
                actions={actions}
                fetchData={(filterValues, currentPage) =>
                    getExpireLimit(filterValues, currentPage, "")
                }
                showFn={getUnderExiperById}


            />
        </div>
    );
};

export default ShowExpireLimit;
