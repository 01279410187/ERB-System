import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  editSupplier,
  getSupplierById,
} from "../../../../../apis/suppliers/index";
import DynamicForm from "../../../../../components/shared/form/Form";

const EditSuppliers = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null); // Initialize data as null
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recipeData = await getSupplierById(id);
        setData(recipeData?.data);
        console.log(recipeData.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData(); // Call fetchData when component mounts
  }, [id]); // useEffect dependency on id

  const handleSubmit = async (formData) => {
    console.log(formData);
    await editSupplier(formData.name, formData.phone, formData.address, id);
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
      <h1 className='form-title'>تعديل مورد</h1>
      {data && (
        <DynamicForm
          fields={fields}
          initialValues={data}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default EditSuppliers;
