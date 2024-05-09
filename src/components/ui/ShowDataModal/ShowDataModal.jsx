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
      setData(result.data);
      console.log(result.data);
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
      <table className="data-table">
        <tbody>
          {detailsHeaders?.map((header, index) => {
            if (header.isArray && Array.isArray(obj[header.key])) {
              return obj[header.key].map((item, idx) => (
                <tr key={idx}>
                  {header.keys.map((key, keyIndex) => (
                    <React.Fragment key={keyIndex}>
                      <td className="info-key">{key.label}: </td>
                      <td className="info-value">{item[key.key]}</td>
                    </React.Fragment>
                  ))}
                </tr>
              ));
            } else if (obj.hasOwnProperty(header.key)) {
              return (
                <React.Fragment key={index}>
                  <tr>
                    <td className="info-key">{header.label}: </td>
                    <td className="info-value">
                      {header.key === "image" ? (
                        <img src={obj[header.key]} alt="Product" />
                      ) : (
                        renderValue(obj[header.key])
                      )}
                    </td>
                  </tr>
                </React.Fragment>
              );
            }
            return null;
          })}
        </tbody>
      </table>
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
