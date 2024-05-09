import axios from "axios";
import { API_ENDPOINT, Token } from "../../../config";

export async function getProductById(id) {

    try {
        const res = await axios.get(
            `${API_ENDPOINT}/api/v1/product/show/${id}`, {
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