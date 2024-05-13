import axios from "axios";
import { API_ENDPOINT, Token } from "../../../../config";
import { message } from "antd";
export async function getClients(filteredValues, id, setIsLoading) {
  const Token = localStorage.getItem("token");
  try {
    setIsLoading(true);
    const { page } = filteredValues;
    const res = await axios.get(`${API_ENDPOINT}/api/v1/store/client`, {
      params: {
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
export async function deleteClient(id) {
  const Token = localStorage.getItem("token");
  try {
    const res = await axios.delete(
      `${API_ENDPOINT}/api/v1/store/client/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    message.success("تم الحذف بنجاح");
    return res.data;
  } catch (error) {
    console.log("Error fetching data:", error);
    message.error("حدث خطأ الرجاء إعادة المحاولة ");
  }
}
export async function getClientById(id) {
  const Token = localStorage.getItem("token");
  try {
    const res = await axios.get(
      `${API_ENDPOINT}/api/v1/store/client_type/${id}`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log("Error fetching data:", error);
    message.error("حدث خطأ الرجاء إعادة المحاولة ");
  }
}
export async function updateClient(id, editValues) {
  const formData = new FormData();
  formData.append("discount_reason", editValues.discount_reason);
  formData.append("discount", editValues.discount);
  formData.append("_method", "PUT");
  const Token = localStorage.getItem("token");
  try {
    const res = await axios.post(
      `${API_ENDPOINT}/api/v1/store/discount_reason/update/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    message.success("تم التعديل بنجاح");
    return res.data;
  } catch (error) {
    console.log("Error fetching data:", error);
    message.error("حدث خطأ الرجاء إعادة المحاولة ");
  }
}
export async function addClient(values) {
  const formData = new FormData();
  formData.append("name", values.name);
  formData.append("phone", values.phone);
  formData.append("military_number", values.military_number);
  formData.append("is_worker", values.is_worker);
  formData.append("sallary", values.salary);
  formData.append("incentives", values.incentives);
  formData.append("client_type_id", values.client_type_id);
  console.log(formData);
  const Token = localStorage.getItem("token");
  try {
    const res = await axios.post(
      `${API_ENDPOINT}/api/v1/store/client/create`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    message.success("تم الإضافة بنجاح");
    return res.data;
  } catch (error) {
    console.log("Error fetching data:", error);
    message.error("حدث خطأ الرجاء إعادة المحاولة ");
  }
}
