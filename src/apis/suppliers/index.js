import axios from "axios";
import { API_ENDPOINT } from "../../../config";
const domain = API_ENDPOINT;
export async function getSuppliers(filteredValues = {name :"", phone:"", page:""}){
    try {
      const {name, phone,page}= filteredValues;
        const res = await axios.get(
          `${domain}/api/v1/store/supplier`,{
            params: {
              name,
              phone,
              page
            },
          }
        );
        return res.data
      } catch (error) {
        console.log("Error fetching data:", error);
      }
}
export async function getSupplierById(id){
    try {
        const res = await axios.get(
            `${domain}/api/v1/store/supplier/${id}`
        );
        return res.data
      } catch (error) {
        console.log("Error fetching data:", error);
      }
}
export async function editSupplier(name, phoneNumber, address, id){
    try {
        const res = await axios.post(
            `${domain}/api/v1/store/supplier/update/${id}`,{
              name: name,
              phone: phoneNumber,
              address: address,
              _method: "PUT"
          }
        );
        return res.data
      } catch (error) {
        console.log("Error fetching data:", error);
      }
}
export async function deleteSupplier(id){
    try {
        const res = await axios.delete(
            `${domain}/api/v1/store/supplier/delete/${id}`
          
        );
        return res.data
      } catch (error) {
        console.log("Error fetching data:", error);
      }
}
export async function addSupplier(name, phoneNumber, address){
  try {
      const res = await axios.post(
          `${domain}/api/v1/store/supplier/create`,{
            name: name,
            phone: phoneNumber,
            address: address,
        }
      );
      return res.data
    } catch (error) {
      console.log("Error fetching data:", error);
    }
}
export async function getSupplierInvoices(id){
  try {
      const res = await axios.get(
          `${domain}/api/v1/store/supplier/${id}/invoices`
      );
      return res.data
    } catch (error) {
      console.log("Error fetching data:", error);
    }
}