// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { getRecipeCategoryParent } from '../../../../../../apis/recipes/recipeCategoryParent';
// import { eidtRecipeSubCategory, getRecipeSubCategoryById } from '../../../../../../apis/recipes/recipeSubCategory';
// import DynamicForm from '../../../../../../components/shared/form/Form';

// const EditRecipees = () => {
//     const navigate = useNavigate();
//     const [data, setData] = useState(null); // Initialize data as null
//     const { id } = useParams();
//     const [categories, setCategories] = useState([]); // Initialize categories state

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const recipeData = await getRecipeCategoryParent();
//                 setCategories(recipeData.data);
//             } catch (error) {
//                 console.log("Error fetching data:", error);
//             }
//         };

//         fetchData(); // Call fetchData when component mounts
//     }, []);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const recipeData = await getRecipeSubCategoryById(id);
//                 setData(recipeData);
//             } catch (error) {
//                 console.log("Error fetching data:", error);
//             }
//         };

//         fetchData(); // Call fetchData when component mounts
//     }, [id]); // useEffect dependency on id

//     const handleSubmit = (formData) => {
//         console.log(formData);
//         eidtRecipeSubCategory(formData.name, formData.description, formData.image, formData.category_id, id);
//         navigate(`/warehouse/recipes/subCategory/show-recipe-subcategory/${formData.category_id}`);
//     };

//     const fields = [
//         { type: 'text', name: 'name', placeholder: 'يجب عليك ادخال الاسم', required: true },
//         { type: 'text', name: 'description', placeholder: 'يجب عليك ادخال الوصف', required: true },
//         { type: 'image', name: 'image', placeholder: 'يجب عليك ادخال الصوره' },
//         {
//             type: 'select',
//             name: 'category_id',
//             placeholder: 'اختر التصنيف الرئيسي',
//             options: categories.map(category => ({ value: category.id, label: category.name }))
//         }
//     ];

//     return (
//         <div>
//             <h1>تعديل تصنيف الفرعى</h1>
//             {data && <DynamicForm fields={fields} initialValues={data} onSubmit={handleSubmit} />} {/* Pass initial values if data is available */}
//         </div>
//     );
// };

// export default EditRecipees;




import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { eidtRecipes, getRecipes, getRecipesById, getUnits } from '../../../../../../apis/recipes/recipe';
import DynamicForm from '../../../../../../components/shared/form/Form';

const EditRecipes = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null); // Initialize data as null

    const { id } = useParams()
    const handleSubmit = (formData) => {
        console.log("=================>" + formData.name);

        eidtRecipes(formData.name, formData.quantity, formData.image, formData.price, formData.recipe_category_id, formData.unit_id, formData.minimum_limt, formData.day_before_expire, id);
        navigate(`/warehouse/recipes/recipe/show-recipe/${formData.category_id}`);
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
                const recipeData = await getRecipesById(id);
                setData(recipeData);
                console.log(recipeData)
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };

        fetchData(); // Call fetchData when component mounts
    }, [id]); // useEffect dependency on id




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
            <h1>تعديل تصنيف الفرعى</h1>
            <DynamicForm fields={fields} initialValues={data} onSubmit={handleSubmit} />
        </div>
    );
};

export default EditRecipes;
