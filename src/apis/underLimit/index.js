import axios from "axios";
import { API_ENDPOINT, Token } from "../../../config";
const domain = API_ENDPOINT;
export async function getUderLimit(filteredValues = { name: "", page: "" }) {
    try {
        const { name, page } = filteredValues;
        const res = await axios.get(`${domain}/api/v1/store/recipe/get_repices/under_limt`, {
            params: {
                name,
                page
            },
            headers: {
                Authorization: `Bearer ${Token}`
            }
        });
        console.log(res.data)
        return res.data;

    } catch (error) {
        console.log("Error fetching data:", error);
    }
}
