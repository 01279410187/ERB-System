import Table from "../../../../../../components/shared/table/Table";
import { getOrders } from "../../../../../../apis/orders";
import { getOrderById, deleteOrder } from "../../../../../../apis/orders";
import { getAllUsers } from "../../../../../../apis/users";
import { getAllDepartments } from "../../../../../../apis/departments";
import "../../../../../../components/shared/table/Table.scss";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../../../context/AuthContext";
const KitchenRequests = () => {
  const [departments, setDepartments] = useState([]);
  const [users, setusers] = useState([]);
  const { user } = useAuth();

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
    // { key: "id", value: "كود الأوردر" },
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
      type: `${user?.permissions.some(
        (permission) => permission.name === "delete order"
      )
          ? "delete"
          : ""
        }`,
      label: "حذف",
    },
    {
      type: `${user?.permissions.some(
        (permission) => permission.name === "change order status"
      )
          ? "show"
          : ""
        }`,
      label: "مراجعة",
    },
    {
      type: `${user?.permissions.some((permission) => permission.name === "edit order")
          ? "edit"
          : ""
        }`,
      label: "تعديل",
    },
  ];
  const detailsHeaders = [
    {
      key: "casher",
      label: "الكاشير",
      isInput: true,
    },
    {
      key: "code",
      label: "الكود",
      isInput: true,
    },

    {
      key: "products",
      label: "المنتجات",
      isArray: true,
      isInput: true,
      details: [
        { key: "price", label: "السعر", isInput: true },
        { key: "quantity", label: "الكمية", isInput: false },
      ],
    },
  ];

  return (
    <div>
      <Table
        headers={tableHeaders}
        title="الأوردرات"
        filters={filters}
        fetchData={(filterValues, id, setIsLoading) =>
          getOrders(filterValues, id, setIsLoading)
        }
        header={"products"}
        actions={actions}
        deleteFn={deleteOrder}
        showFn={getOrderById}
        // updateFn={updateRequests}
        changeStatusFn={() => { }}
        detailsHeaders={detailsHeaders}
      />
    </div>
  );
};

export default KitchenRequests;
