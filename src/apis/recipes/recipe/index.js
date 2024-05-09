import axios from "axios";
import { API_ENDPOINT } from "../../../../config";
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
                    'Accept': 'application/json'
                }
            }
        );
        return res.data;
    } catch (error) {
        message.error(error.response.data.error.message)
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

const Token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDBlNDc0ODNiNTI2NDM5MGFiMzA5ZjAxNzRhMjI3NTM1ZmE2OTZlNjFiYWI5ZTZjYzQ0MzAyZDY0NDA1N2JkOGMyMWFlMmY4YmQwYzJjZTEiLCJpYXQiOjE3MTUwOTM0NTcuNzcyMDE0LCJuYmYiOjE3MTUwOTM0NTcuNzcyMDE2LCJleHAiOjE3NDY2Mjk0NTcuNDQ5NTUzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.E8jDDQX9xIofoAoyzkEUCvesgEu5mWtqbqDvpOTolnTrCIo8j5S7QHP8NWF352x9GneW9SGpRCe-ijH0bpTAOkZmW9sSCLjAszxtimZOXZpg8lwtiGVa_AXN1VG1KDyYZmhATNdNOiY2Fwo4KaT7VcVg3686tDQaJF-P5DY-kmInXbuD9vEoxTRVbE-HMwBVBC9S3v8H5om5O-huaJ49QbkGE_1DtCG9ZoYULXsHMEANV1vE1oS4yt7IhC2oHB3YOndOMC2gPKBDvxi6XfJlHESxqFGs2uEg-euLNFaRFYTbuddVXSgHh-edbvY0dSMsG0IoFLNSxLtcqNj_ejYRFMNcatiMQwgqqA44DcgxVHx__dDv1WK8dQerX0gX8BiKSJWcAH-xGp2UzOfenI0ESW37QmEyVq3GAYD6saRAmKcLIHvgqLuRh0hPemHfR-AsOTI2JvJLbK3dcb1P1yXOtcMe6ULQOf2A_PqhIo1nLRwvmHFkFM2QW3rlmp9kl1C47cELKGoY398KWdDCelNnHUJdWlyExGh9qk1jcNFkTIRVfZyYBSB6epnHlH91xXeHbF8ylLIo5ur6qwe12BbkJmjAN1FeAmB6HtRmCqKlxlMD_YE5Mxia8VK2G1LXxk5sV2AW0Ho76SQWWSZCTM6WxRN20rKDNxEK2bZZpnAfLOQ"

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
            `${domain}/api/v1/store/recipe/delete/${id}`

        );
        return res.data
    } catch (error) {
        console.log("Error fetching data:", error);
    }
}