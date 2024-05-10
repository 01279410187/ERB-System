import axios from "axios";
import { API_ENDPOINT, Token } from "../../../config";
const domain = API_ENDPOINT;
export async function getRequests(filteredValues, id, setIsLoading) {
  try {
    setIsLoading(true);
    const { from_date, to_date, department_id, user_id, page, status } =
      filteredValues;
    const default_from = "1970-01-01";
    const default_to = new Date().toISOString().split("T")[0];
    const res = await axios.get(`${domain}/api/v1/store/request`, {
      params: {
        "date[from]": from_date || default_from,
        "date[to]": to_date || default_to,
        department_id,
        user_id,
        status,
        page,
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
export async function deleteRequest(id) {
  try {
    const res = await axios.delete(
      `${domain}/api/v1/store/request/delete/${id}`
    );
    return res.data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}
export async function editRequest(name, phoneNumber, address, id) {
  try {
    const res = await axios.post(
      `${domain}/api/v1/store/request/update/${id}`,
      {
        name: name,
        phone: phoneNumber,
        address: address,
        _method: "PUT",
      },
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log("Error fetching data:", error);
    const errors = error.response.data.error.errors;
    Object.keys(errors).map((err) => {
      message.error(errors[err][0] || "حدث خطأ الرجاء المحاولة مرة أخرى");
    });
  }
}
export async function getRequestById(id) {
  try {
    const res = await axios.get(`${domain}/api/v1/store/request/${id}`);
    return res.data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}
export async function updateRequests(filteredValues, id) {
  try {
    const { title, date, status, inputValues, page } = filteredValues;
    console.log(inputValues);
    const recipesParams = Object.keys(inputValues).map((recipe, index) => ({
      [`recipes[${index}][price]`]: inputValues[recipe].price,
    }));
    const flattenedParams = recipesParams.reduce(
      (acc, curr) => ({ ...acc, ...curr }),
      {}
    );
    console.log(flattenedParams);
    const res = await axios.get(`${domain}/api/v1/store/request`, {
      params: {
        title,
        date,
        ...flattenedParams,
        user_id: id,
        status,
        page,
        _method: "PUT",
      },
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}
