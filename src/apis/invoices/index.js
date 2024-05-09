import axios from "axios";
import { API_ENDPOINT, TOKEN } from "../../../config";
const domain = API_ENDPOINT;
const Token = TOKEN;
export async function getRecipes(filteredValues = { name: "", page: "" }) {
  try {
    const { name, page } = filteredValues;

    const res = await axios.get(`${domain}/api/v1/store/recipe_category`, {
      params: {
        name: name,
        page,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}

export async function getUnits() {
  try {
    const res = await axios.get(`${domain}/api/v1/store/unit`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}

export async function addRecipes(
  name,
  quantity,
  image,
  price,
  recipe_category_id,
  unit_id,
  minimum_limt,
  day_before_expire
) {
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("quantity", quantity);
    formData.append("image", image[0].originFileObj);
    formData.append("price", price);
    // Only send the first image
    formData.append("recipe_category_id", recipe_category_id);
    formData.append("unit_id", unit_id);
    formData.append("minimum_limt", minimum_limt);
    formData.append("days_before_expire", day_before_expire);

    const res = await axios.post(
      `${domain}/api/v1/store/recipe/create`,
      formData,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log("Error fetching data:", error);
    throw error; // Rethrow the error to handle it in the calling code if necessary
  }
}
export async function eidtRecipes(
  name,
  quantity,
  image,
  price,
  recipe_category_id,
  unit_id,
  minimum_limt,
  day_before_expire,
  id
) {
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("quantity", quantity);
    formData.append("image", image[0].originFileObj);
    formData.append("price", price);
    // Only send the first image
    formData.append("recipe_category_id", recipe_category_id);
    formData.append("unit_id", unit_id);
    formData.append("minimum_limt", minimum_limt);
    formData.append("day_before_expire", day_before_expire);
    formData.append("_method", "PUT"); // Only send the first image

    const res = await axios.post(
      `${domain}/api/v1/store/recipe/update/${id}`,
      formData,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log("Error fetching data:", error);
    throw error; // Rethrow the error to handle it in the calling code if necessary
  }
}
export async function getRecipesById(id) {
  try {
    const res = await axios.get(`${domain}/api/v1/store/recipe/${id}`);
    console.log(res.data);
    return res.data.data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}

export async function getIncomingInvoiceByType(
  filteredValues = { name: "", page: "" }
) {
  const { name, page } = filteredValues;
  try {
    const res = await axios.get(
      `${domain}/api/v1/store/invoice/get_invoices_based_on_type/in_coming`,
      {
        params: {
          name: name,
          page,
        },
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    console.log(res);
    return res.data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}

export async function getOutgoingInvoiceByType(
  filteredValues = { name: "", page: "" }
) {
  const { name, page } = filteredValues;
  try {
    const res = await axios.get(
      `${domain}/api/v1/store/invoice/get_invoices_based_on_type/out_going`,
      {
        params: {
          name: name,
          page,
        },
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    console.log(res);
    return res.data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}

export async function getReturndInvoiceByType(
  filteredValues = { name: "", page: "" }
) {
  const { name, page } = filteredValues;
  try {
    const res = await axios.get(
      `${domain}/api/v1/store/invoice/get_invoices_based_on_type/returnd`,
      {
        params: {
          name: name,
          page,
        },
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    console.log(res);
    return res.data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}

export async function deleteRecipe(id) {
  try {
    const res = await axios.delete(
      `${domain}/api/v1/store/recipe/delete/${id}`
    );
    return res.data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}
export async function getInvoiceById(id) {
  try {
    const res = await axios.get(`${domain}/api/v1/store/invoice/${id}`, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}
