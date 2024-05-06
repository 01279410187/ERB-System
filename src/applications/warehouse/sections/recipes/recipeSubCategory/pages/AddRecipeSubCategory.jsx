import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRecipeCategoryParent } from '../../../../../../apis/recipes/recipeCategoryParent';
import { addRecipeSubCategory } from '../../../../../../apis/recipes/recipeSubCategory';
import DynamicForm from '../../../../../../components/shared/form/Form';

const AddRecipeSubCategory = () => {
    const navigate = useNavigate();

    const handleSubmit = (formData) => {
        console.log(formData);
        addRecipeSubCategory(formData.name, formData.description, formData.image, formData.category_id);
        navigate(`/warehouse/recipes/subCategory/show-recipe-subcategory/${formData.category_id}`);
    };

    const [categories, setCategories] = useState([]); // Initialize categories state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const recipeData = await getRecipeCategoryParent();
                setCategories(recipeData.data);
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };

        fetchData(); // Call fetchData when component mounts
    }, []);

    const fields = [
        { type: 'text', name: 'name', placeholder: 'يجب عليك ادخال الاسم', required: true },
        { type: 'text', name: 'description', placeholder: 'يجب عليك ادخال الوصف', required: true },
        { type: 'image', name: 'image', placeholder: 'يجب عليك ادخال الصوره' },
        {
            type: 'select',
            name: 'category_id',
            placeholder: 'اختر التصنيف الرئيسي',
            options: categories.map(category => ({ value: category.id, label: category.name }))
        }
    ];

    return (
        <div className='form-container'>
            <h1 className='form-title'>ادخال تصنيف الرئيسى</h1>
            <DynamicForm fields={fields} onSubmit={handleSubmit} />
        </div>
    );
};

export default AddRecipeSubCategory;
