import axios from "axios";
import { API_ENDPOINT } from "../../../../config";
import { message } from 'antd'
const domain = API_ENDPOINT;
export async function getRecipeSubCategory(filteredValues = { name: "", page: "" }, id) {
    try {
        const { name, page } = filteredValues;

        const res = await axios.get(
            `${domain}/api/v1/store/recipe_category`, {
            params: {
                name: name,
                category_id: id,
                page,
            },
        }
        );
        console.log(res.data);
        return res.data
    } catch (error) {
        console.log("Error fetching data:", error);
    }
}

export async function addRecipeSubCategory(name, description, image, category_id) {
    try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('image', image[0].originFileObj
        ); // Only send the first image
        formData.append('category_id', category_id);

        const res = await axios.post(
            `${domain}/api/v1/store/recipe_category/create`,
            formData,
            {
                headers: {
                    'Accept': 'application/json'
                }
            }
        );
        return res.data;
    } catch (error) {
        console.log("Error fetching data:", error);
        throw error; // Rethrow the error to handle it in the calling code if necessary
    }
}
export async function eidtRecipeSubCategory(name, description, image, category_id, id) {
    try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);

        formData.append('image', image[0].originFileObj ? image[0].originFileObj : 0);
        formData.append('category_id', category_id);
        formData.append('_method', "PUT"); // Only send the first image

        const res = await axios.post(
            `${domain}/api/v1/store/recipe_category/update/${id}`,
            formData,
            {
                headers: {
                    'Accept': 'application/json'
                }
            }
        );
        return res.data;
    } catch (error) {
        message.error(error.response.data.error.message)
        console.log("Error fetching data:", error.response.data.error.message);
        throw error; // Rethrow the error to handle it in the calling code if necessary
    }
}
export async function getRecipeSubCategoryById(id) {
    try {
        const res = await axios.get(
            `${domain}/api/v1/store/recipe_category/${id}`
        );
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log("Error fetching data:", error);
    }
}


export async function getRecipeSubCategoryFilterById(filteredValues = { name: "", page: "" }, id) {
    const { name, page } = filteredValues;
    try {

        const res = await axios.get(
            `${domain}/api/v1/store/recipe_category/filter_by_parent/${id}`, {
            params: {
                name: name,
                page,
            },
        }
        );
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log("Error fetching data:", error);
    }
}

export async function deleteRecipeSubCategory(id) {
    try {
        const res = await axios.delete(
            `${domain}/api/v1/store/recipe_category/delete/${id}`

        );
        return res.data
    } catch (error) {
        console.log("Error fetching data:", error);
    }
}