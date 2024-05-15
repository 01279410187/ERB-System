import { message } from "antd";
import axios from "axios";
import { API_ENDPOINT } from "../../../config";
const domain = API_ENDPOINT;
export async function getOrders(filteredValues, id, setIsLoading) {
  try {
    const Token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    setIsLoading(true);
    const { from_date, to_date, department_id, user_id, page, status } =
      filteredValues;
    const default_from = "1970-01-01";
    const default_to = new Date().toISOString().split("T")[0];
    const res = await axios.get(`${domain}/api/v1/orders`, {
      params: {
        "date[from]": from_date || default_from,
        "date[to]": to_date || default_to,
        to_department_id: department_id,
        user_id,
        status,
        page,
      },
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });
    setIsLoading(false);
    return res.data;
  } catch (error) {
    console.log("Error fetching data:", error);
    setIsLoading(false);
    message.error("حدث خطأ الرجاء إعادة المحاولة ");
  }
}
export async function getOrderById(id) {
  const Token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
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
export async function deleteOrder(id) {
  try {
    const Token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const res = await axios.delete(
      `${API_ENDPOINT}/api/v1/orders/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    message.error(error.response.data.error.message);

    console.log("Error fetching data:", error);
  }
}
