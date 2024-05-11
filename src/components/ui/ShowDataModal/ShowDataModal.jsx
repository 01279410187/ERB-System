import React, { useState, useEffect } from "react";
import "./ShowDataModal.scss";
import Input from "antd/es/input/Input";
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
        console.log(response.data[header]);
        setTitle(response.data.title || "التفاصيل");
        const initialInputValues = response.data[header].reduce(
          (acc, item, index) => {
            const inputValuesForItem = {};
            detailsHeaders.forEach((h) => {
              if (h.isInput) {
                inputValuesForItem[h.key] = item[h.key];
              }
            });
            acc[item.id] = inputValuesForItem;
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

  const handleInputChange = (e, itemId, key) => {
    const newValue = e.target.value;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [itemId]: {
        ...prevInputValues[itemId],
        [key]: newValue,
      },
    }));
  };

  return (
    <div className="show-data-modal">
      {data && (
        <div className="data-table-diagram">
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
                          <Input
                            className="form-input"
                            style={{ marginBottom: "0px" }}
                            type="number"
                            disabled={updateFn ? false : true}
                            value={inputValues[item.id][h.key] || ""}
                            onChange={(e) =>
                              handleInputChange(e, item.id, h.key)
                            }
                          />
                        ) : (
                          item[h.key]
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                {(!data || data?.length === 0) && (
                  <tr>
                    <td colSpan={detailsHeaders.length + 1}>'لا يوجد نتائج'</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="button-container">
              {changeStatusFn && (
                <button
                  className="data-modal-btn delete"
                  onClick={() => {
                    changeStatusFn(id, "rejected");
                    handleModalVisible(false);
                  }}
                >
                  رفض
                </button>
              )}
              {updateFn && changeStatusFn && (
                <button
                  className="data-modal-btn show"
                  onClick={() => {
                    console.log(inputValues);
                    updateFn({inputValues}, id);
                    changeStatusFn(id, "approved");
                    handleModalVisible(false);
                  }}
                >
                  قبول
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowDataModal;
