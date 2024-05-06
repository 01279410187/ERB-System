import axios from "axios";
import { API_ENDPOINT } from "../../../config";
const domain = API_ENDPOINT;
export async function getAllUsers(filteredValues = { name: "" }) {
  try {
    const { name } = filteredValues;
    const res = await axios.get(`${domain}/api/v1/store/user/all/users`, {
      params: {
        name,
      },
    });
    return res.data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}
