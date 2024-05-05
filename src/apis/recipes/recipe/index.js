import axios from "axios";
import { API_ENDPOINT } from "../../../../config";
const domain = API_ENDPOINT;
export async function getRecipes(filteredValues = { name: "", page: "" }) {
    try {
        const { name, page } = filteredValues;

        const res = await axios.get(
            `${domain}/api/v1/store/recipe_category`, {
            params: {
                name: name,
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

export async function addRecipes(name, quantity, image, price, recipe_category_id, unit_id, minimum_limt, day_before_expire) {
    try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('quantity', quantity);
        formData.append('image', image[0].originFileObj
        );
        formData.append('price', price);
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
export async function eidtRecipes(name, quantity, image, price, recipe_category_id, unit_id, minimum_limt, day_before_expire, id) {
    try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('quantity', quantity);
        formData.append('image', image[0].originFileObj
        );
        formData.append('price', price);
        // Only send the first image
        formData.append('recipe_category_id', recipe_category_id);
        formData.append('unit_id', unit_id);
        formData.append('minimum_limt', minimum_limt);
        formData.append('day_before_expire', day_before_expire);
        formData.append('_method', "PUT"); // Only send the first image

        const res = await axios.post(
            `${domain}/api/v1/store/recipe/update/${id}`,
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
export async function getRecipesById(id) {

    try {
        const res = await axios.get(
            `${domain}/api/v1/store/recipe/${id}`
        );
        console.log(res.data)
        return res.data.data
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
            `${domain}/api/v1/store/recipe/delete/${id}`

        );
        return res.data
    } catch (error) {
        console.log("Error fetching data:", error);
    }
}