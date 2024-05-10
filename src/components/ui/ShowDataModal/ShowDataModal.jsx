import React, { useState, useEffect } from "react";
import "./ShowDataModal.scss";

const ShowDataModal = ({
  id,
  showFn,
  detailsHeaders,
  header,
  handleModalVisible,
  updateFn,
  changeStatusFn,
}) => {
  const [data, setData] = useState(null);
  const [title, setTitle] = useState(null);
  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await showFn(id);
        setData(response.data[header]);
        console.log(response);
        setTitle(response.data.title || "تفاصيل الفاتورة");
        const initialInputValues = response.data[header].reduce(
          (acc, item, index) => {
            const inputValuesForItem = {};
            detailsHeaders.forEach((h) => {
              if (h.isInput) {
                inputValuesForItem[h.key] = item[h.key];
              }
            });
            acc[index] = inputValuesForItem;
            return acc;
          },
          {}
        );
        setInputValues(initialInputValues);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, showFn, header, detailsHeaders]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".modal-content")) {
        handleModalVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleModalVisible]);

  const handleEditChange = () => {
    updateFn({ inputValues }, id);
    handleModalVisible(false);
  };
  const handleInputChange = (e, index, key) => {
    const newValue = e.target.value;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [index]: {
        ...prevInputValues[index],
        [key]: newValue,
      },
    }));
  };

  return (
    <div className="show-data-modal">
      {data && (
        <div className="modal-content">
          <h2>{title}</h2>
          <table className="data-table">
            <thead>
              <tr>
                {detailsHeaders.map((h) => (
                  <th key={h.key}>{h.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  {detailsHeaders.map((h) => (
                    <td key={h.key}>
                      {h.isInput ? (
                        <input
                          type="text"
                          disabled={updateFn ? false : true}
                          value={inputValues[index][h.key] || ""}
                          onChange={(e) => handleInputChange(e, index, h.key)}
                        />
                      ) : (
                        item[h.key]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {changeStatusFn && (
            <div className="button-container">
              <button onClick={() => changeStatusFn("accepted", id)}>
                مراجعة
              </button>
              <button onClick={() => changeStatusFn("rejected", id)}>
                رفض
              </button>
            </div>
          )}
          {updateFn && (
            <div className="button-container">
              <button onClick={handleEditChange}>تعديل</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShowDataModal;
