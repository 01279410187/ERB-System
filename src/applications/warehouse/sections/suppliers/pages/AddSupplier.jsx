import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addSupplier } from "../../../../../apis/suppliers/index";
import DynamicForm from "../../../../../components/shared/form/Form";

const AddSupplier = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    console.log(formData);
    await addSupplier(formData.name, formData.phone, formData.address);
    navigate(`/warehouse/suppliers/show-suppliers`);
  };

  const fields = [
    {
      type: "text",
      name: "name",
      placeholder: "يجب عليك ادخال الاسم",
      required: true,
    },
    {
      type: "text",
      name: "phone",
      placeholder: "يجب عليك ادخال رقم الموبايل",
      required: true,
    },
    {
      type: "text",
      name: "address",
      placeholder: "يجب عليك ادخال العنوان",
      required: true,
    },
  ];

  return (
    <div className='form-container'>
      <h1 className='form-title'>إضافة مورد</h1>
      <DynamicForm fields={fields} onSubmit={handleSubmit} />
    </div>
  );
};

export default AddSupplier;
