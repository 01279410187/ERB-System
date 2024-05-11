import axios from "axios";
import { API_ENDPOINT, Token } from "../../../config";
const domain = API_ENDPOINT;
export async function getOrders(filteredValues, id, setIsLoading) {
  try {
    setIsLoading(true);
    const { from_date, to_date, department_id, user_id, page, status } =
      filteredValues;
    const default_from = "1970-01-01";
    const default_to = new Date().toISOString().split("T")[0];
    const res = await axios.get(`${domain}/api/v1/orders`, {
      params: {
        "date[from]": from_date,
        "date[to]": to_date,
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
  try {
    const res = await axios.get(`${API_ENDPOINT}/api/v1/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}
