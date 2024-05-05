import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addRecipes, getRecipes, getUnits } from '../../../../../../apis/recipes/recipe';
import DynamicForm from '../../../../../../components/shared/form/Form';

const AddRecipes = () => {
    const navigate = useNavigate();

    const handleSubmit = (formData) => {
        console.log(formData);
        addRecipes(formData.name, formData.quantity, formData.image, formData.price, formData.recipe_category_id, formData.unit_id, formData.minimum_limt, formData.day_before_expire);
        navigate(`/warehouse/recipes/recipe/show-recipe/${formData.recipe_category_id}`);
    };

    const [categories, setCategories] = useState([]); // Initialize categories state
    const [units, setUnits] = useState([]); // Initialize categories state


    useEffect(() => {
        const fetchData = async () => {
            try {
                const recipeData = await getRecipes();
                setCategories(recipeData.data);
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };

        fetchData(); // Call fetchData when component mounts
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const unitData = await getUnits();
                setUnits(unitData.data);
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };

        fetchData(); // Call fetchData when component mounts
    }, []);

    const fields = [
        { type: 'text', name: 'name', placeholder: 'يجب عليك ادخال الاسم', required: true },
        { type: 'number', name: 'quantity', placeholder: 'يجب عليك ادخال الكميه', required: true },
        { type: 'number', name: 'price', placeholder: 'يجب عليك ادخال السعر', required: true },
        { type: 'number', name: 'minimum_limt', placeholder: 'يجب عليك ادخال حد الامان', required: true },
        { type: 'number', name: 'day_before_expire', placeholder: 'يجب عليك ادخال تاريح الصلاحيه', required: true },



        { type: 'image', name: 'image', placeholder: 'يجب عليك ادخال الصوره' },
        {
            type: 'select',
            name: 'recipe_category_id',
            placeholder: 'اختر التصنيف الرئيسي',
            options: categories.map(category => ({ value: category.id, label: category.name }))
        },
        {
            type: 'select',
            name: 'unit_id',
            placeholder: 'اختر  الكميه',
            options: units.map(units => ({ value: units.id, label: units.name }))
        }
    ];

    return (
        <div>
            <h1>ادخال تصنيف الفرعى</h1>
            <DynamicForm fields={fields} onSubmit={handleSubmit} />
        </div>
    );
};

export default AddRecipes;
