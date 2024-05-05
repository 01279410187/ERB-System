import React, { useEffect, useState } from "react";
import "./ShowDataModal.scss";

const ShowDataModal = ({
  id,
  handleModalVisible,
  showFn,
  detailsHeaders,
  name,
}) => {
  const [data, setData] = useState({});

  useEffect(() => {
    showFn(id).then((result) => {
      setData(result);
      console.log(result);
    });
  }, [id, showFn]);

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

  const renderValue = (value) => {
    if (Array.isArray(value)) {
      return (
        <ul>
          {value.map((item, index) => (
            <li key={index}>{renderObject(item)}</li>
          ))}
        </ul>
      );
    } else if (typeof value === "object") {
      return renderObject(value);
    } else {
      return value;
    }
  };

  const renderObject = (obj) => {
    return (
      <div>
        {detailsHeaders?.map((header, index) => {
          if (header.isArray && Array.isArray(obj[header.key])) {
            return (
              <div key={index}>
                {obj[header.key].map((item, idx) => (
                  <div key={idx}>
                    {header.keys.map((key) => (
                      <div key={key}>
                        <span className="info-key">{header.label}: </span>
                        <span className="info-value">
                          {renderValue(item[key])}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            );
          } else if (obj.hasOwnProperty(header.key)) {
            if (header.key === "image") {
              return (
                <div key={index}>
                  <span className="info-key">{header.label}: </span>
                  <img src={obj[header.key]} alt="Product" />
                </div>
              );
            }
            return (
              <div key={index}>
                <span className="info-key">{header.label}: </span>
                <span className="info-value">
                  {renderValue(obj[header.key])}
                </span>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  };

  return (
    <div className="show-data-modal">
      <div className="modal-content">
        <h2>{name}</h2>
        <div className="info-container">
          {data && <div className="info-item">{renderObject(data)}</div>}
        </div>
      </div>
    </div>
  );
};

export default ShowDataModal;
