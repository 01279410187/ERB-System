import React from 'react';
import { Form, Input, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { API_ENDPOINT } from '../../../../config';

const DynamicForm = ({ fields, onSubmit, initialValues }) => {
    const [form] = Form.useForm();

    const handleFormSubmit = async () => {
        try {
            const formData = await form.validateFields();
            onSubmit(formData);
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    return (
        <Form form={form} onFinish={handleFormSubmit} initialValues={initialValues}>
            {fields.map((field, index) => (
                <Form.Item
                    key={index}
                    name={field.name}
                    label={field.label}
                    rules={[{ required: field.required, message: field.placeholder }]}
                >
                    {field.type === 'text' && (
                        <Input placeholder={field.placeholder} />
                    )}
                    {field.type === 'image' && (
                        <div>
                            {initialValues && initialValues[field.name] && (
                                <img
                                    src={`${API_ENDPOINT}/${initialValues[field.name]}`}
                                    alt={`alt-${initialValues.name}`}
                                    style={{ width: "50px", height: "50px" }}
                                />
                            )}
                            <Form.Item
                                name={field.name}
                                valuePropName="file"
                                getValueFromEvent={(e) => e.fileList}
                                rules={[{ required: true, message: 'Please upload a file' }]}
                            >
                                <Upload name={field.name} listType="text" beforeUpload={() => false}>
                                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                                </Upload>
                            </Form.Item>
                        </div>
                    )}
                </Form.Item>
            ))}
            <Form.Item>
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
        </Form>
    );
};

export default DynamicForm;
