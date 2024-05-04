import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ShowDataModal.scss";

const ShowDataModal = ({ children, info }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".modal-content")) {
        navigate(-1);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [navigate]);

  if (children) {
    return (
      <div className="show-data-modal">
        <div className="modal-content">{children}</div>
      </div>
    );
  } else if (info) {
    return (
      <div className="show-data-modal">
        <div className="modal-content">
          <h2>{info.title}</h2>
          <div className="info-container">
            {Object.entries(info.data).map(([key, value]) => (
              <div className="info-item" key={key}>
                <span className="info-key">{key}: </span>
                <span className="info-value">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ShowDataModal;
