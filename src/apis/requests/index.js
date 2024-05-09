import axios from "axios";
import { API_ENDPOINT, Token } from "../../../config";
const domain = API_ENDPOINT;
export async function getRequests(
  filteredValues = {
    from_date: "",
    to_date: "",
    department_id: "",
    user_id: "",
    status: "",
    page: "",
  }
) {
  try {
    const { from_date, to_date, department_id, user_id, page, status } =
      filteredValues;
    const res = await axios.get(`${domain}/api/v1/store/request`, {
      params: {
        "date[from]": from_date,
        "date[to]": to_date,
        department_id,
        user_id,
        status,
        page,
      },
    });
    return res.data;
  } catch (error) {
    console.log("Error fetching data:", error);
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
