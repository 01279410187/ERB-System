import React from "react";
import { useNavigate } from "react-router-dom";
import "./TableCard.scss";
const TableCard = ({ id, number }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/warehouse/cashier/order/${id}`);
  };
  return (
    <div>
      <button onClick={handleCardClick} className="table-card">
        {number}
      </button>
    </div>
  );
};

export default TableCard;
