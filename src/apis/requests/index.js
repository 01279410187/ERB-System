import axios from "axios";
import { API_ENDPOINT } from "../../../config";
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
// export async function editSupplier(name, phoneNumber, address, id){
//     try {
//         const res = await axios.post(
//             `${domain}/api/v1/store/supplier/update/${id}`,{
//               name: name,
//               phone: phoneNumber,
//               address: address,
//               _method: "PUT"
//           }
//         );
//         return res.data
//       } catch (error) {
//         console.log("Error fetching data:", error);
//       }
// }

// export async function addSupplier(name, phoneNumber, address){
//   try {
//       const res = await axios.post(
//           `${domain}/api/v1/store/supplier/create`,{
//             name: name,
//             phone: phoneNumber,
//             address: address,
//         }
//       );
//       return res.data
//     } catch (error) {
//       console.log("Error fetching data:", error);
//     }
// }
// export async function getSupplierInvoices(id){
//   try {
//       const res = await axios.get(
//           `${domain}/api/v1/store/supplier/${id}/invoices`
//       );
//       return res.data
//     } catch (error) {
//       console.log("Error fetching data:", error);
//     }
// }
