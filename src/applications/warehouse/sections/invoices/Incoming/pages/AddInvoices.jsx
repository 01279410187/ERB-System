import React, { useState, useEffect } from 'react';
import DynamicForm from '../../../../../../components/shared/form/Form';
// Adjust the path based on the actual location of your DynamicForm component

const AddInvoices = () => {
    const [recipeCategoryParents, setRecipeCategoryParents] = useState([]);
    const [recipeCategories, setRecipeCategories] = useState([]);
    const [recipe, setRecipe] = useState([]);
    const [fields, setFields] = useState([]);
    const [selectedParent, setSelectedParent] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedRecipe, setSelectedRecipe] = useState('');

    useEffect(() => {
        // Fetch recipe category parents when component mounts
        fetchRecipeCategoryParents();
    }, []);

    const fetchRecipeCategoryParents = async () => {
        try {
            const response = await fetch('http://192.168.0.116:8000/api/v1/store/recipe_category_parent');
            const data = await response.json();
            setRecipeCategoryParents(data.data);
        } catch (error) {
            console.error('Error fetching recipe category parents:', error);
        }
    };

    const handleParentChange = async (parentId) => {
        setSelectedParent(parentId);
        try {
            const response = await fetch(`http://192.168.0.116:8000/api/v1/store/recipe_category/filter_by_parent/${parentId}`);
            const data = await response.json();
            setRecipeCategories(data.data);
        } catch (error) {
            console.error('Error fetching recipe categories:', error);
        }
    };

    const handleCategoryChange = async (categoryId) => {
        setSelectedCategory(categoryId);
        try {
            const response = await fetch(`http://192.168.0.116:8000/api/v1/store/recipe/filter_by_category/${categoryId}`);
            const data = await response.json();
            setRecipe(data.data);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    };

    useEffect(() => {
        // Update the fields array whenever recipeCategoryParents or recipeCategories change
        setFields([
            {
                label: 'Recipe Category Parent',
                type: 'select',
                placeholder: 'Select Parent',
                options: recipeCategoryParents.map(parent => ({ value: parent.id, label: parent.name })),
                required: true,
                onChange: handleParentChange
            },
            {
                label: 'Recipe Category',
                type: 'select',
                placeholder: 'Select Category',
                options: recipeCategories.map(category => ({ value: category.id, label: category.name })),
                required: true,
                onChange: handleCategoryChange
            },
            {
                label: 'Recipe',
                type: 'select',
                placeholder: 'Select Recipe',
                options: recipe.map(recipe => ({ value: recipe.id, label: recipe.name })),
                required: true
            }
        ]);
    }, [recipeCategoryParents, recipeCategories, recipe]);

    const onSubmit = (formData) => {
        // Handle form submission here
        console.log('Form data:', formData);
    };

    return (
        <div>
            <DynamicForm
                fields={fields}
                onSubmit={onSubmit}
            />
        </div>
    );
};

export default AddInvoices;
