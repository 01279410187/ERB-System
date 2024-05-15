import React from "react";
import Table from "../../../../../../components/shared/table/Table";
import { getUsers, deleteUser } from "../../../../../../apis/users";
import { useAuth } from "../../../../../../context/AuthContext";
const ShowUsers = () => {
  const tableHeaders = [
    { key: "id", value: "الكود" },
    { key: "name", value: "الإسم" },
    { key: "phone", value: "الرقم" },
  ];

  const { user } = useAuth()
  const filters = [
    { key: "name", type: "text", placeholder: "إبحث باللإسم", id: "الإسم" },
    {
      key: "phone",
      type: "text",
      placeholder: "إبحث برقم الموبايل",
      id: "رقم الموبايل",
    },
  ];
  const actions = [
    {
      type: `${user?.permissions.some((permission) => permission.name === 115)
        ? "edit"
        : ""
        }`,
      label: "تعديل",
      route: "/warehouse/users/:id/edit-user",
    },
    {
      type: `${user?.permissions.some((permission) => permission.name === 116)
        ? "delete"
        : ""
        }`,
      label: "حذف",
    },

    {
      type: `${user?.permissions.some((permission) => permission.name === 114)
        ? "add"
        : ""
        }`,
      label: "إضافة مستخدمين",
      route: "/warehouse/users/add-user",
    },
  ];

  return (
    <div>
      <Table
        headers={tableHeaders}
        title="المستخدمين"
        filters={filters}
        fetchData={(filterValues, id, setIsLoading) =>
          getUsers(filterValues, id, setIsLoading)
        }
        actions={actions}
        deleteFn={deleteUser}
      />
    </div>
  );
};

export default ShowUsers;
