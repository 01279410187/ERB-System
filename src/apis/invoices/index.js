import axios from "axios";
import { API_ENDPOINT } from "../../../config";
const domain = API_ENDPOINT;
export async function getRecipes(filteredValues = { name: "", page: "" }) {
    try {
        const { name, page } = filteredValues;

        const res = await axios.get(
            `${domain}/api/v1/store/recipe_category`, {
            params: {
                name: name,
                page,
            },
        }
        );
        console.log(res.data);
        return res.data
    } catch (error) {
        console.log("Error fetching data:", error);
    }
}

export async function getUnits() {
    try {


        const res = await axios.get(
            `${domain}/api/v1/store/unit`

        );
        console.log(res.data);
        return res.data
    } catch (error) {
        console.log("Error fetching data:", error);
    }
}

export async function addRecipes(name, quantity, image, price, recipe_category_id, unit_id, minimum_limt, day_before_expire) {
    try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('quantity', quantity);
        formData.append('image', image[0].originFileObj
        );
        formData.append('price', price);
        // Only send the first image
        formData.append('recipe_category_id', recipe_category_id);
        formData.append('unit_id', unit_id);
        formData.append('minimum_limt', minimum_limt);
        formData.append('days_before_expire', day_before_expire);

        const res = await axios.post(
            `${domain}/api/v1/store/recipe/create`,
            formData,
            {
                headers: {
                    'Accept': 'application/json'
                }
            }
        );
        return res.data;
    } catch (error) {
        console.log("Error fetching data:", error);
        throw error; // Rethrow the error to handle it in the calling code if necessary
    }
}
export async function eidtRecipes(name, quantity, image, price, recipe_category_id, unit_id, minimum_limt, day_before_expire, id) {
    try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('quantity', quantity);
        formData.append('image', image[0].originFileObj
        );
        formData.append('price', price);
        // Only send the first image
        formData.append('recipe_category_id', recipe_category_id);
        formData.append('unit_id', unit_id);
        formData.append('minimum_limt', minimum_limt);
        formData.append('day_before_expire', day_before_expire);
        formData.append('_method', "PUT"); // Only send the first image

        const res = await axios.post(
            `${domain}/api/v1/store/recipe/update/${id}`,
            formData,
            {
                headers: {
                    'Accept': 'application/json'
                }
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
        const res = await axios.get(
            `${domain}/api/v1/store/recipe/${id}`
        );
        console.log(res.data)
        return res.data.data
    } catch (error) {
        console.log("Error fetching data:", error);
    }
}

const Token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiODg1ZmVjMzU5NjkxZGVkZWY5MGRkNDlkNzk2ZjhjNTM0MzQ2YWU3N2MzZWFhYTM2NWFjZTQ4OTEzM2Y3YTFkMGY0ODgwMjU4YmRhODA1MDciLCJpYXQiOjE3MTQ3ODU5NTQuODkxMDMxLCJuYmYiOjE3MTQ3ODU5NTQuODkxMDM4LCJleHAiOjE3NDYzMjE5NTQuODI4MjY5LCJzdWIiOiI0Iiwic2NvcGVzIjpbXX0.Q0jJ9k5mtkd6PRuCb2C0jTm37D7az5SK9_W8sgbmt9Kl2Xa3u0iUy4Pf1o5QYFkbLZ7ky21kzpMIO1APFF0zfvRzfFCUEObGIsetr12rpr-L-H0cUtuUu-p4NHcpSCj_VepurPUL9p7PHGwbUmMCeCrnR155Jjpzj_bDw_worTicLEFX8gpVua2UQRu4g5vDgH9730b80wsnobgHFOzt06Pag3SVZaDpDgCv4ACd7SMXGzRorDf4JcyE2dY1aHRpbSj8Qo4M0QOt0RlBGRcagosNx4sz-zI_GrN2a6R3xgsZY6IHZkRYPFgAAY80ptG34cBx0g37uHT6M8pQEtez_Of7zl409bVMNf6SfTmVPgxTPyx1jp5H-hw-YYSB9wjoWzPdstiiG72yrM0dAQff1FFucgiksYDmvHfZRs5-F8RMb2U46dZLVHx-tfVHJmCC8qomQrpf9x0teoUPHazQOCqK2SaaM84rq1WUNe_QTxQjfOz-PJ6px-GSOKIo7xZ3amf4EAtyJ157XdqvYs-YmCLm_ePngFqv4Sqb1iyGJuMXkMEBdD9qyQvagMbLTRRv87RWxtTixmDObF2ypJH_xGZWRgDkjQaDRn0Jt61OJHkZcMbN5yk001Mk9zDSyXSlNep6ZlTpg0d41b2LgB842vO20SIERhZuRGvbFUVck-A"
export async function getIncomingInvoiceByType(filteredValues = { name: "", page: "" }) {

    const { name, page } = filteredValues;
    try {

        const res = await axios.get(
            `${domain}/api/v1/store/invoice/get_invoices_based_on_type/in_coming`, {
            params: {
                name: name,
                page,
            },
            headers: {
                Authorization: `Bearer ${Token}`
            }


        },
        );
        console.log(res)
        return res.data
    } catch (error) {
        console.log("Error fetching data:", error);
    }
}

export async function getOutgoingInvoiceByType(filteredValues = { name: "", page: "" }) {

    const { name, page } = filteredValues;
    try {

        const res = await axios.get(
            `${domain}/api/v1/store/invoice/get_invoices_based_on_type/out_going`, {
            params: {
                name: name,
                page,
            },
            headers: {
                Authorization: `Bearer ${Token}`
            }


        },
        );
        console.log(res)
        return res.data
    } catch (error) {
        console.log("Error fetching data:", error);
    }
}

export async function getReturndInvoiceByType(filteredValues = { name: "", page: "" }) {

    const { name, page } = filteredValues;
    try {

        const res = await axios.get(
            `${domain}/api/v1/store/invoice/get_invoices_based_on_type/returnd`, {
            params: {
                name: name,
                page,
            },
            headers: {
                Authorization: `Bearer ${Token}`
            }


        },
        );
        console.log(res)
        return res.data
    } catch (error) {
        console.log("Error fetching data:", error);
    }
}

export async function deleteRecipe(id) {
    try {
        const res = await axios.delete(
            `${domain}/api/v1/store/recipe/delete/${id}`

        );
        return res.data
    } catch (error) {
        console.log("Error fetching data:", error);
    }
}