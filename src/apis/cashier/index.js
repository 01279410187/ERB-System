import { message } from "antd";
import axios from "axios";
import { API_ENDPOINT, Token } from "../../../config";

export async function getProductById(id) {
  try {
    const res = await axios.get(`${API_ENDPOINT}/api/v1/product/show/${id}`, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });
    return res.data;
  } catch (error) {
    message.error(error.response.data.error.message);

    console.log("Error fetching data:", error);
  }
}
export async function getAllTables() {
  try {
    const res = await axios.get(`${API_ENDPOINT}/api/v1/orders/show/tables`, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });
    return res.data;
  } catch (error) {
    message.error(error.response.data.error.message);

    console.log("Error fetching data:", error);
  }
}
export async function getTableOrderById(id) {
  try {
    const res = await axios.get(`${API_ENDPOINT}/api/v1/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });
    return res.data;
  } catch (error) {
    message.error(error.response.data.error.message);

    console.log("Error fetching data:", error);
  }
}
