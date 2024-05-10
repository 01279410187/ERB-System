import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTableOrderById } from "../../../../../../apis/cashier";
import "./OrderDetails.scss";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});

  useEffect(() => {
    const getOrderByID = async () => {
      try {
        const res = await getTableOrderById(id);
        setOrder(res.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };
    getOrderByID();
  }, [id]);

  return (
    <div>
      {order.code && (
        <div>
          <h1 className="order-title"> اوردر كود {order.code}</h1>
          <div className="order-header">
            {order.comment && <p>ملاحظة: {order.comment}</p>}
            {order.discount !== null && <p>قيمةالخصم: {order.discount}</p>}
            {order.discount_resones && <p>سبب الخصم: {order.discount_resones}</p>}
            {order.order_date && <p>تاريخ الأوردر: {order.order_date}</p>}
            {order.target_department_name && (
              <p>إسم القسم المراد: {order.target_department_name}</p>
            )}
          </div>
          <h2>المنتجات:</h2>
          <ul className="order-details-container">
            {order.products &&
              order.products.map((product, index) => (
                <li key={index}
                  className="order">
                  <div className="img-container">

                    <img
                      className="product-image"
                      src={product.image}
                      alt={product.name}
                    />
                  </div>
                  <div className="order-details-txt">
                    <p>إسم المنتج: {product.name}</p>
                    <p>السعر: {product.price} جم</p>
                    <p>الكمية: {product.quantity}</p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
