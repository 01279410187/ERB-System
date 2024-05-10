import axios from "axios";
import { API_ENDPOINT, Token } from "../../../../config";
const domain = API_ENDPOINT;
export async function getRecipeCategoryParent(filteredValues = { name: "", page: "" }) {
    try {
        const { name, page } = filteredValues;

        const res = await axios.get(
            `${domain}/api/v1/store/recipe_category_parent`, {
            params: {
                name: name,
                page,
            },
            headers: {
                Authorization: `Bearer ${Token}`
            }
        }
        );
        console.log(res.data);
        return res.data
    } catch (error) {
        console.log("Error fetching data:", error);
    }
}

export async function addRecipe(name, description, image) {
    try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('image', image[0].originFileObj
        ); // Only send the first image

        const res = await axios.post(
            `${domain}/api/v1/store/recipe_category_parent/create`,
            formData,
            {
                headers: {
                    'Accept': 'application/json',
                    Authorization: `Bearer ${Token}`
                }
            }
        );
        return res.data;
    } catch (error) {
        console.log("Error fetching data:", error);
        throw error; // Rethrow the error to handle it in the calling code if necessary
    }
}
export async function eidtRecipe(name, description, image, id) {
    try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);

        formData.append('image', image[0].originFileObj ? image[0].originFileObj : 0
        );
        formData.append('_method', "PUT"); // Only send the first image

        const res = await axios.post(
            `${domain}/api/v1/store/recipe_category_parent/update/${id}`,
            formData,
            {
                headers: {
                    'Accept': 'application/json',
                    Authorization: `Bearer ${Token}`
                }
            }
        );
        return res.data;
    } catch (error) {
        console.log("Error fetching data:", error);
        throw error; // Rethrow the error to handle it in the calling code if necessary
    }
}
export async function getRecipeById(id) {
    try {
        const res = await axios.get(
            `${domain}/api/v1/store/recipe_category_parent/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${Token}`
                }
            }
        );
        console.log(res.data)
        return res.data.data
    } catch (error) {
        console.log("Error fetching data:", error);
    }
}
