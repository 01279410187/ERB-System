import axios from "axios";
import { API_ENDPOINT, Token } from "../../../../config";
const domain = API_ENDPOINT;
import { message } from "antd";
export async function getRecipes(filteredValues = { name: "", page: "" }, id) {
    try {
        const { name, page } = filteredValues;

        const res = await axios.get(
            `${domain}/api/v1/store/recipe`, {
            params: {
                name: name,
                recipe_category_id: id,
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

export async function getUnits() {
    try {


        const res = await axios.get(
            `${domain}/api/v1/store/unit`

        );
        console.log(res.data);
        return res.data
    } catch (error) {
        console.log("Error fetching data:", error);
    }
}

export async function addRecipes(name, image, recipe_category_id, unit_id, minimum_limt, day_before_expire) {
    try {
        const formData = new FormData();
        formData.append('name', name);
        // formData.append('quantity', quantity);
        formData.append('image', image[0].originFileObj
        );
        // formData.append('price', price);
        // Only send the first image
        formData.append('recipe_category_id', recipe_category_id);
        formData.append('unit_id', unit_id);
        formData.append('minimum_limt', minimum_limt);
        formData.append('days_before_expire', day_before_expire);

        const res = await axios.post(
            `${domain}/api/v1/store/recipe/create`,
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
        // message.error(error.response.data.error.message[0].errors)
        console.log("Error fetching data:", error);
        throw error; // Rethrow the error to handle it in the calling code if necessary
    }
}
export async function eidtRecipes(name, image, recipe_category_id, unit_id, minimum_limt, days_before_expire, id) {
    try {
        const formData = new FormData();
        formData.append('name', name);
        // formData.append('quantity', quantity);
        formData.append('image', image[0].originFileObj ? image[0].originFileObj : 0);
        // formData.append('price', price);
        // Only send the first image
        formData.append('recipe_category_id', recipe_category_id);
        formData.append('unit_id', unit_id);
        formData.append('minimum_limt', minimum_limt);
        formData.append('days_before_expire', days_before_expire);
        formData.append('_method', "PUT"); // Only send the first image

        const res = await axios.post(
            `${domain}/api/v1/store/recipe/update/${id}`,
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


export async function getRecipesById(id) {

    try {
        const res = await axios.get(
            `${domain}/api/v1/store/recipe/${id}`, {
            headers: {
                Authorization: `Bearer ${Token}`
            }
        }
        );
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log("Error fetching data:", error);
    }
}


export async function getRecipesFilterById(filteredValues = { name: "", page: "" }, id) {
    const { name, page } = filteredValues;
    try {

        const res = await axios.get(
            `${domain}/api/v1/store/recipe/filter_by_category/${id}`, {
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

export async function deleteRecipe(id) {
    try {
        const res = await axios.delete(
            `${domain}/api/v1/store/recipe/delete/${id}`,
            {
                headers: {
                    'Accept': 'application/json',
                    Authorization: `Bearer ${Token}`
                }
            }

        );
        return res.data
    } catch (error) {
        console.log("Error fetching data:", error);
    }
}