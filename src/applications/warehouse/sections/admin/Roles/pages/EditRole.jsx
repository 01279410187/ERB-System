import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editRoles, getRoleById } from "../../../../../../apis/roles";
import { Form, Input, Button, Select, message } from "antd";
const { Option } = Select;

const EditRole = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState([]);
  const [name, setName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchRole = async () => {
      const res = await getRoleById(id);
      console.log(res.data);
      setSelectedPermissions(res.data?.permission);
      setName(res.data.name);
    };
    fetchRole();
    const fetchPermissions = async () => {
      const res = await fetch("/src/apis/permissions/permissions.json");
      const data = await res.json();
      setPermissions(data);
    };
    fetchPermissions();
  }, []);

  const onFinish = async (values) => {
    console.log(selectedPermissions);

    const formData = {
      id: id,
      name: values.name,
      permissions: selectedPermissions,
    };
    console.log(formData);
    const res = await editRoles(formData);
    if (res instanceof Error) message.error(res.message);
    else {
      navigate(`/warehouse/roles/show-roles`);
    }
  };

  const handlePermissionSelect = (values, options) => {
    const selectedPermissions = values.map((value) =>
      permissions.find((permission) => permission.value === value)
    );
    console.log(selectedPermissions);
    setSelectedPermissions(selectedPermissions);
  };

  const validatePermissions = (_, value) => {
    if (!value || value.length === 0) {
      return Promise.reject(new Error("يرجى اختيار صلاحية واحدة على الأقل!"));
    }
    return Promise.resolve();
  };

  return (
    <div className="form-container">
      <h1 className="form-title" style={{ marginBottom: "20px" }}>
        عدل الدور
      </h1>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          label="إسم الدور"
          name="name"
          rules={[{ required: true, message: "من فضلك أضف إسم" }]}
          initialValue=""
          style={{ marginBottom: "20px" }}
        >
          <Input placeholder="أضف إسم للدور" />
        </Form.Item>
        <Form.Item
          label="الأدوار"
          name="permissions"
          rules={[{ validator: validatePermissions }]}
          style={{ marginBottom: "20px" }}
        >
          <Select
            options={selectedPermissions}
            fieldNames={{ label: "name", value: "id" }}
            mode="multiple"
            placeholder="اختر الصلاحيات"
            onChange={handlePermissionSelect}
            style={{ width: "100%" }}
          >
            {permissions.map((permission) => (
              <Option key={permission.value}>{permission.label}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            تعديل
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditRole;
