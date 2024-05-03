import axios from "axios";
import { API_ENDPOINT } from "../../../config";
const domain = API_ENDPOINT;
export async function getCategories(){
    try {
        const res = await axios.get(
          `${domain}/api/v1/store/categories`
        );
        return res.data
      } catch (error) {
        console.log("Error fetching data:", error);
      }
}
export async function getSubCategories({id}){
  console.log(id)
  try {
      const res = await axios.get(
        `${domain}/api/v1/store/sub_categories/filter_by_category/${id}`
      );
      return res.data
    } catch (error) {
      console.log("Error fetching data:", error);
    }
}
export async function getCategoryById(id){
    try {
        const res = await axios.get(
            `${domain}/api/v1/store/categories/${id}`
        );
        return res.data
      } catch (error) {
        console.log("Error fetching data:", error);
      }
}
export async function editCategory(name, phoneNumber, address, id){
    try {
        const res = await axios.post(
            `${domain}/api/v1/store/categories/update/${id}`,{
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
export async function deleteCategory(id){
    try {
        const res = await axios.delete(
            `${domain}/api/v1/store/categories/delete/${id}`
          
        );
        return res.data
      } catch (error) {
        console.log("Error fetching data:", error);
      }
}
export async function addCategory(name, description, image){
  console.log(name, description, image)
  try {
      const res = await axios.post(
          `${domain}/api/v1/store/categories/create`,{
            name: name,
            description: description,
            image: image,
        }
      );
      return res.data
    } catch (error) {
      console.log("Error fetching data:", error);
    }
}