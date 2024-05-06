// Import useState and useEffect if not already imported
import React, { useState, useEffect } from 'react';
import { API_ENDPOINT } from '../../../../config';

const InvoiceDetails = ({ onAddItem, onDeleteItem }) => {
    const [item, setItem] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [epireDate, setExpireDate] = useState();

    const [errorMessage, setErrorMessage] = useState('');
    const [recipeCategoryParents, setRecipeCategoryParents] = useState([]);
    const [recipeCategories, setRecipeCategories] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [fields, setFields] = useState([]);
    const [selectedParent, setSelectedParent] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedRecipe, setSelectedRecipe] = useState('');

    useEffect(() => {
        fetchRecipeCategoryParents();
    }, []);

    const fetchRecipeCategoryParents = async () => {
        try {
            const response = await fetch(`${API_ENDPOINT}/api/v1/store/recipe_category_parent`);
            const data = await response.json();
            setRecipeCategoryParents(data.data);
        } catch (error) {
            console.error('Error fetching recipe category parents:', error);
        }
    };

    const handleParentChange = async (parentId) => {
        setSelectedParent(parentId);
        try {
            const response = await fetch(`${API_ENDPOINT}/api/v1/store/recipe_category?parent_id=${parentId}`);
            const data = await response.json();
            setRecipeCategories(data.data);
        } catch (error) {
            console.error('Error fetching recipe categories:', error);
        }
    };

    const handleCategoryChange = async (categoryId) => {
        setSelectedCategory(categoryId);
        try {
            const response = await fetch(`${API_ENDPOINT}/api/v1/store/recipe?recipe_category_id=${categoryId}`);
            const data = await response.json();
            setRecipes(data.data);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    };

    useEffect(() => {
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
                options: recipes.map(recipe => ({ value: recipe.id, label: recipe.name })),
                required: true,
                onChange: (value) => setSelectedRecipe(value) // Update selectedRecipe state with selected recipe value
            }
        ]);
    }, [recipeCategoryParents, recipeCategories, recipes]);

    const onSubmit = (formData) => {
        // Handle form submission here
        console.log('Form data:', formData);
    };

    const handleAddItem = () => {
        if (!selectedRecipe.trim()) {
            setErrorMessage(`Please select a recipe.`);
            return;
        }
        // Logging for troubleshooting
        console.log('recipes:', recipes);
        console.log('selectedRecipe:', selectedRecipe);

        // Find the selected recipe object from the recipes array
        const selectedRecipeObj = recipes.find(recipe => String(recipe.id) === selectedRecipe);

        // Logging for troubleshooting
        console.log('selectedRecipeObj:', selectedRecipeObj);

        // If the selected recipe is found, extract its name
        const recipeName = selectedRecipeObj ? selectedRecipeObj.name : '';
        const recipeImage = selectedRecipeObj ? selectedRecipeObj.image : '';

        // Logging for troubleshooting
        console.log('recipeName:', recipeName);
        console.log('recipeName:', recipeImage);

        // Additional validation or processing logic

        const newItem = {
            name: recipeName,
            image: recipeImage,
            recipeId: selectedRecipe, // Accessing selectedRecipe directly
            quantity: parseInt(quantity),
            price: parseFloat(price),
            expireDate: epireDate
        };

        onAddItem(newItem);
        setItem('');
        setQuantity(1);
        setPrice(0);
        setErrorMessage('');
    };



    return (
        <div>
            {fields.map((field, index) => (
                <div key={index}>
                    <label className="form-label" >{field.label}</label>
                    <select
                        className='form-select'
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        required={field.required}>
                        <option value="">{field.placeholder}</option>
                        {field.options.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
            ))}
            <label className="form-label" >Quantity:</label>
            <input className="form-input" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} onWheel={event => event.currentTarget.blur()} />
            <label className="form-label" >Price:</label>
            <input className="form-input" type="number" value={price} onChange={(e) => setPrice(e.target.value)} onWheel={event => event.currentTarget.blur()} />
            <label className="form-label" >Expire Date:</label>
            <input className="form-input" type="date" value={epireDate} onChange={(e) => setExpireDate(e.target.value)} />
            <button className='form-btn' onClick={handleAddItem}>Add Item</button>
            <p style={{ color: 'red' }}>{errorMessage}</p>

        </div>
    );
};

export default InvoiceDetails;
