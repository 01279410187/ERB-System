import Table from "../../../../../../components/shared/table/Table";
import { getOrders } from "../../../../../../apis/orders";
import { getOrderById } from "../../../../../../apis/orders";
import { getAllDepartments } from "../../../../../../apis/departments";
import "../../../../../../components/shared/table/Table.scss";
import { useEffect, useState } from "react";

const KitchenRequests = () => {
  const [departments, setDepartments] = useState([]);
  const [users, setusers] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      const res = await getAllDepartments();
      setDepartments(
        [{ label: "", value: "" }].concat(
          res.data.map((item) => {
            return { label: item.name, value: item.id };
          })
        )
      );
      console.log(departments);
    };
    const fetchUsers = async () => {
      const res = await getAllUsers();
      setusers(
        [{ label: "", value: "" }].concat(
          res.data.map((item) => {
            return { label: item.name, value: item.id };
          })
        )
      );
      console.log(users);
    };
    fetchDepartments();
    fetchUsers();
  }, []);
  const tableHeaders = [
    { key: "discount", value: "قيمة الخصم" },
    { key: "discount_resones", value: "سبب الخصم" },
    { key: "id", value: "كود الأوردر" },
    { key: "status", value: "الحالة" },
    { key: "order_date", value: "التاريخ" },
  ];
  const filters = [
    { key: "from_date", type: "date", id: "من تاريخ" },
    { key: "to_date", type: "date", id: "إلى تاريخ" },
    {
      key: "user_id",
      type: "selection",
      id: "من",
      placeholder: "المستخدمين",
      options: users,
    },
    {
      key: "department_id",
      type: "selection",
      id: "إلى",
      placeholder: "الأقسام",
      options: departments,
    },
    {
      key: "status",
      type: "selection",
      id: "الحالة",
      placeholder: "الحالة",
      options: [
        {
          value: "",
          label: "",
        },
        {
          value: "pending",
          label: "تحت المراجعة",
        },
        {
          value: "approved",
          label: "تم المراجعة",
        },
        {
          value: "done",
          label: "تم الصرف",
        },
        {
          value: "rejected",
          label: "مرفوض",
        },
      ],
    },
  ];
  const actions = [
    {
      type: "delete",
      label: "حذف",
    },
    {
      type: "show",
      label: "مراجعة",
    },
    {
      type: "add",
      label: "إضافة طلبات",
      route: "/warehouse/cashier/add-orders",
    },
  ];
  const detailsHeaders = [
    {
      key: "id",
      label: "الكود",
    },
    {
      key: "name",
      label: "الإسم",
    },
    {
      key: "quantity",
      label: "الكمية",
    },
    {
      key: "price",
      label: "السعر",
    },
    {
      key: "image",
      label: "الصورة",
    },
  ];

  return (
    <div>
      <Table
        headers={tableHeaders}
        title="الطلبات"
        filters={filters}
        fetchData={(filterValues, id, setIsLoading) =>
          getOrders(filterValues, id, setIsLoading)
        }
        header={"products"}
        actions={actions}
        // deleteFn={deleteRequest}
        showFn={getOrderById}
        // updateFn={updateRequests}
        // changeStatusFn={() => {}}
        detailsHeaders={detailsHeaders}
      />
    </div>
  );
};

export default KitchenRequests;
