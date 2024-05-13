import React from 'react';
import { useNavigate } from 'react-router-dom';
import DynamicForm from '../../../../../components/shared/form/Form';
import { addDeaprtments } from '../../../../../apis/department';

const AddDepartments = () => {
    const navigate = useNavigate()
    const handleSubmit = async (formData) => {
        console.log(formData);
        await addDeaprtments(formData.name, formData.image, formData.code, formData.phone)
        await navigate('/warehouse/departments/show-departments')

    };

    const fields = [
        { type: 'text', name: 'name', placeholder: 'يجب عليك ادخال الاسم', required: true },
        { type: 'number', name: 'code', placeholder: 'يجب عليك ادخال الكود', required: true },
        { type: 'number', name: 'phone', placeholder: 'يجب عليك ادخال رقم التيليفون', required: true },
        { type: 'image', name: 'image', placeholder: 'يجب عليك ادخال الصوره', required: true },
    ];

    return (
        <div className='form-container'>
            <h1 className='form-title'>ادخال قسم جديد  </h1>
            <DynamicForm fields={fields} onSubmit={handleSubmit} />
        </div>
    );
};

export default AddDepartments;
