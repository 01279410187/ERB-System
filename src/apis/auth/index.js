import axios from "axios";
import { API_ENDPOINT, Token } from "../../../config";

export async function getProfile() {
  try {
    const res = await axios.get(`${API_ENDPOINT}/api/v1/profile`, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}

export async function login(values) {
  const { username, password, remember } = values;
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  try {
    const res = await axios.post(
      `${API_ENDPOINT}/api/v1/auth/login`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    console.log(res);
    return res;
  } catch (error) {
    return error;
  }
}
