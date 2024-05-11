import axios from "axios";
import { API_ENDPOINT, Token } from "../../../config";
import { message } from "antd";
const domain = API_ENDPOINT;
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
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log("Error fetching data:", error);
    throw error;
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
    const res = await axios.get(`${domain}/api/v1/store/recipe/${id}`, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });
    console.log(res.data);
    return res.data.data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}

export async function getIncomingInvoiceByType(
  filteredValues,
  id,
  setIsLoading
) {
  const { from_date, to_date, supplier_id, invoice_price, page, code, status } =
    filteredValues;
  const default_from = "1970-01-01";
  const default_to = new Date().toISOString().split("T")[0];
  try {
    setIsLoading(true);
    const res = await axios.get(
      `${domain}/api/v1/store/invoice/get_invoices_based_on_type/in_coming`,
      {
        params: {
          "date[from]": from_date || default_from,
          "date[to]": to_date || default_to,
          code,
          invoice_price,
          supplier_id,
          status,
          page,
        },
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    setIsLoading(false);
    console.log(res);
    return res.data;
  } catch (error) {
    setIsLoading(false);
    console.log("Error fetching data:", error);
    message.error("حدث خطأ الرجاء إعادة المحاولة");
  }
}

export async function getOutgoingInvoiceByType(
  filteredValues,
  id,
  setIsLoading
) {
  const { from_date, to_date, supplier_id, invoice_price, page, code, status } =
    filteredValues;
  const default_from = "1970-01-01";
  const default_to = new Date().toISOString().split("T")[0];
  try {
    setIsLoading(true);
    const res = await axios.get(
      `${domain}/api/v1/store/invoice/get_invoices_based_on_type/out_going`,
      {
        params: {
          "date[from]": from_date || default_from,
          "date[to]": to_date || default_to,
          code,
          invoice_price,
          supplier_id,
          status,
          page,
        },
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    setIsLoading(false);
    console.log(res);
    return res.data;
  } catch (error) {
    setIsLoading(false);
    console.log("Error fetching data:", error);
    message.error("حدث خطأ الرجاء إعادة المحاولة");
  }
}

export async function getReturndInvoiceByType(
  filteredValues,
  id,
  setIsLoading
) {
  const { from_date, to_date, supplier_id, invoice_price, page, code, status } =
    filteredValues;
  const default_from = "1970-01-01";
  const default_to = new Date().toISOString().split("T")[0];
  try {
    setIsLoading(true);
    const res = await axios.get(
      `${domain}/api/v1/store/invoice/get_invoices_based_on_type/returned`,
      {
        params: {
          "date[from]": from_date || default_from,
          "date[to]": to_date || default_to,
          code,
          invoice_price,
          supplier_id,
          status,
          page,
        },
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    setIsLoading(false);
    console.log(res);
    return res.data;
  } catch (error) {
    setIsLoading(false);
    console.log("Error fetching data:", error);
    message.error("حدث خطأ الرجاء إعادة المحاولة");
  }
}

// export async function deleteInvoice(id) {
//   try {
//     const res = await axios.delete(
//       `${domain}/api/v1/store/recipe/delete/${id}`
//     );
//     return res.data;
//   } catch (error) {
//     console.log("Error fetching data:", error);
//   }
// }
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
export async function updateInvoice(filteredValues, id) {
  const { inputValues } = filteredValues;
  const formData = new FormData();
  Object.keys(inputValues).forEach((inputValueID, index) => {
    formData.append(`recipes[${index}][recipe_id]`, inputValueID);
    formData.append(
      `recipes[${index}][price]`,
      inputValues[inputValueID].price
    );
    // Add other fields as needed, for example quantity, expire_date, etc.
    formData.append(
      `recipes[${index}][quantity]`,
      inputValues[inputValueID].quantity
    );
    formData.append(
      `recipes[${index}][expire_date]`,
      inputValues[inputValueID].expire_date
    );
  });
  formData.append("_method", "PUT");
  try {
    const res = await axios.post(
      `${domain}/api/v1/store/invoice/update/${id}`,
      formData,
      {
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
export async function changeInvoiceStatus(id, status) {
  try {
    const res = await axios.get(
      `${domain}/api/v1/store/invoice/chenge_status/${id}/${status}`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}
