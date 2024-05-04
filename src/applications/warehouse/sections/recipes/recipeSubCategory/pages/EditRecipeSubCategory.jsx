import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getRecipeCategoryParent } from '../../../../../../apis/recipes/recipeCategoryParent';
import { eidtRecipeSubCategory, getRecipeSubCategoryById } from '../../../../../../apis/recipes/recipeSubCategory';
import DynamicForm from '../../../../../../components/shared/form/Form';

const EditRecipeSubCategory = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null); // Initialize data as null
    const { id } = useParams();
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const recipeData = await getRecipeSubCategoryById(id);
                setData(recipeData);
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };

        fetchData(); // Call fetchData when component mounts
    }, [id]); // useEffect dependency on id

    const handleSubmit = (formData) => {
        console.log(formData);
        eidtRecipeSubCategory(formData.name, formData.description, formData.image, formData.category_id, id);
        navigate(`/warehouse/recipes/subCategory/show-recipe-subcategory/${formData.category_id}`);
    };

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
        <div>
            <h1>تعديل تصنيف الفرعى</h1>
            {data && <DynamicForm fields={fields} initialValues={data} onSubmit={handleSubmit} />} {/* Pass initial values if data is available */}
        </div>
    );
};

export default EditRecipeSubCategory;