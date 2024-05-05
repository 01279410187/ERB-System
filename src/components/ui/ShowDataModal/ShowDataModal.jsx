import React, { useEffect } from "react";
import "./ShowDataModal.scss";

const ShowDataModal = ({ info, handleModalVisible }) => {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".modal-content")) {
        handleModalVisible(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleModalVisible]);

  return (
    <div className="show-data-modal">
      <div className="modal-content">
        <h2>{info.title}</h2>
        <div className="info-container">
          {info.data.map((item, index) => (
            <div className="info-item" key={index}>
              {Object.entries(item).map(([key, value]) => (
                <div className="info-field" key={key}>
                  <span className="info-key">{key}: </span>
                  <span className="info-value">{value}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowDataModal;
