

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { eidtProduct, getProductsById } from '../../../../../../../apis/product';

import DynamicForm from '../../../../../../../components/shared/form/Form';

const EditProduct = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(); // Initialize data as null

    const { id } = useParams()
    const handleSubmit = async (formData) => {
        console.log("=================>" + formData.name);

        await eidtProduct(formData.name, formData.description, formData.image, formData.price, ProductParentId, id);
        await navigate(`/warehouse/returants/subcategory/show-product/${ProductParentId}`);
    };
    // const [units, setUnits] = useState([]); // Initialize categories state
    const [parentName, setParentName] = useState('')
    // const [recipeUnit, setRecipeUnit] = useState('')
    const [ProductParentId, setRecipeParentId] = useState('')





    useEffect(() => {
        const fetchData = async () => {
            try {
                const recipeData = await getProductsById(id);
                console.log("================>" + recipeData.data)
                setData(recipeData.data);
                setParentName(recipeData.data.sub_category_name)
                // setRecipeUnit(recipeData.data.unit)
                setRecipeParentId(recipeData.data.sub_category_id)




                console.log("================>" + recipeData.data)
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };
        fetchData();
    }, [id]); // useEffect dependency on id


    const fields = [
        { type: 'text', name: 'parent', placeholder: `${parentName}`, required: false, disabled: true },
        { type: 'text', name: 'name', placeholder: 'يجب عليك ادخال الاسم', required: false, disabled: false },
        { type: 'number', name: 'price', placeholder: 'يجب عليك ادخال السعر', required: true },
        { type: 'text', name: 'description', placeholder: 'يجب عليك ادخال الوصف', required: true },
        { type: 'image', name: 'image', placeholder: 'يجب عليك ادخال الصوره' },


    ];

    // Map the recipe data to match form field names
    const initialValues = {
        name: data?.name || '',
        description: data?.description || '',
        price: data?.price !== undefined ? data.price : '', // Check if day_before_expire is present
        // unit_id: data?.unit.id || '', // Check if unit_id is present
        image: data?.image || null, // Assuming image is present in recipe data
    };

    console.log(initialValues)
    console.log("Name from data:", data?.name);
    // console.log("Minimum limit from data:", data?.minimum_limt);


    return (
        <div className='form-container'>
            <h1 className='form-title'>تعديل منتج</h1>
            {data && <DynamicForm fields={fields} initialValues={initialValues} onSubmit={handleSubmit} />}
        </div>
    );
};

export default EditProduct;
