import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddRoles } from "../../../../../../apis/roles";
import { Form, Input, Button, Select } from "antd";
const { Option } = Select;

const AddRole = () => {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
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
      name: values.name,
      permissions: selectedPermissions,
    };
    console.log(formData);
    await AddRoles(formData);
    navigate(`/warehouse/roles/show-roles`);
  };

  const handlePermissionSelect = (values, options) => {
    const selectedPermissions = values.map((value) =>
      permissions.find((permission) => permission.label === value)
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
        أضف دور
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
          initialValue={[]}
          style={{ marginBottom: "20px" }}
        >
          <Select
            mode="multiple"
            placeholder="اختر الصلاحيات"
            onChange={handlePermissionSelect}
            style={{ width: "100%" }}
            value={selectedPermissions}
          >
            {permissions?.map((permission) => (
              <Option key={permission.label}>{permission.label}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            أضف
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddRole;
