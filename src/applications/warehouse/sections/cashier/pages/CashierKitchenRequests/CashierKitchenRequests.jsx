import React, { useState } from "react";
import CashierOrderDetailes from "../../../../../../components/shared/CashierOrderDetails/CashierOrderDetailes";
import CashierItemList from "../../../../../../components/shared/CashierItemList/CashierItemList";
import TotalAmount from "../../../../../../components/shared/totalAmount/TotalAmount";
import { message } from "antd";
import { API_ENDPOINT, Token } from "../../../../../../../config";
import axios from "axios";
const CashierKitchenRequests = () => {
  const [items, setItems] = useState([]);
  const [errors, setErrors] = useState({});
  const [title, setTitle] = useState(" ");

  const handleAddItem = (item) => {
    setItems([...items, item]);
  };
  const handleDeleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };
  const calculateTotalAmount = () => {
    return items.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    items.forEach((item, index) => {
      formData.append(`products[${index}][product_id]`, item.ProductId);

      formData.append(`products[${index}][quantity]`, item.quantity);
    });
    formData.append("title", title);
    formData.append("to_department_id", "1");

    try {
      const response = await axios.post(
        `${API_ENDPOINT}/api/v1/orders/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-cashier-data",
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      console.log(response.data);
      message.success("لقد تم اضافة الاوردر بنجاح");
    } catch (error) {
      console.error("Error creating invoice:", error);
      const errors = error.response.data.error.errors;
      Object.keys(errors).map((err) => {
        message.error(errors[err][0]);
      });
    }
  };
  return (
    <div>
      <div className="input-wrapper">
        <div>
          <label className="form-cashier-label">عنوان الطلب :</label>
          <input
            className="form-cashier-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.customerName && (
            <span className="error cashier-input-error">
              {errors.customerName}
            </span>
          )}
        </div>
        <div>
          <label className="form-cashier-label">ع:</label>
          <input
            className="form-cashier-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.customerName && (
            <span className="error cashier-input-error">
              {errors.customerName}
            </span>
          )}
        </div>
      </div>
      <CashierOrderDetailes onAddItem={handleAddItem} />
      <CashierItemList items={items} onDeleteItem={handleDeleteItem} />
      <TotalAmount total={calculateTotalAmount()} />
      <button className="form-cashier-btn" onClick={handleSubmit}>
        إرسال طلب
      </button>
    </div>
  );
};

export default CashierKitchenRequests;
