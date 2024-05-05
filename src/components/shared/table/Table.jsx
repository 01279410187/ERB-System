import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Pagination } from "antd";
import "./Table.scss";
import { API_ENDPOINT } from "../../../../config";
import DeleteModal from "../../ui/DeleteModal/DeleteModal";
import ShowDataModal from "../../ui/ShowDataModal/ShowDataModal";

const Table = ({
  headers,
  title,
  filters,
  fetchData,
  actions,
  id,
  deleteFn,
  info,
}) => {
  const [data, setData] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemId, setItemId] = useState(null);
  const [isDeleteModalVisible, setisDeleteModalVisible] = useState(false);
  const [isShowModalVisible, setisShowModalVisible] = useState(false);
  const [filterValues, setFilterValues] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { location } = useLocation();

  useEffect(() => {
    fetchData({ ...filterValues, page: currentPage }, id).then((result) => {
      setData(result);
    });
  }, [
    fetchData,
    filterValues,
    currentPage,
    location,
    isDeleteModalVisible,
    isShowModalVisible,
  ]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (key, value) => {
    setFilterValues((prevFilterValues) => ({
      ...prevFilterValues,
      [key]: value,
    }));
    setCurrentPage(1);
  };

  const handleItemClick = (itemId, route) => {
    if (route) {
      navigate(route.replace(":id", itemId));
    }
  };

  const handleAction = (actionType, itemId, itemName) => {
    switch (actionType) {
      case "delete":
        handleDelete(itemId, itemName);
        break;
      case "show":
        handleShowData(itemId);
        break;
      case "edit":
        handleEdit(itemId);
        break;
      default:
        break;
    }
  };

  const handleDelete = (itemId, itemName) => {
    setItemName(itemName);
    setItemId(itemId);
    setisDeleteModalVisible(true);
  };

  const handleShowData = (itemId) => {
    setItemId(itemId);
    actions.find((action) => action.route?.includes("show"))
      ? navigate(
          actions
            .find((action) => action.type === "show")
            .route.replace(":id", itemId)
        )
      : setisShowModalVisible(true);
  };

  const handleEdit = (itemId) => {
    setItemId(itemId);
    navigate(
      actions
        .find((action) => action.type === "edit")
        .route.replace(":id", itemId)
    );
  };
  const handleAdd = () => {
    const addAction = actions.find((action) => action.type === "add");
    if (addAction) {
      navigate(addAction.route);
    }
  };
  const renderFilterInput = (filter) => {
    const { key, type, placeholder, options, id } = filter;
    if (type === "number") {
      return (
        <input
          className="filter-input"
          type="number"
          placeholder={placeholder}
          value={filterValues[key] || ""}
          onChange={(e) => handleFilterChange(key, e.target.value)}
        />
      );
    } else if (type === "selection") {
      return (
        <select
          className="filter-input"
          value={filterValues[key] || ""}
          onChange={(e) => handleFilterChange(key, e.target.value)}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    } else {
      return (
        <input
          className="filter-input"
          type="text"
          placeholder={placeholder}
          value={filterValues[key] || ""}
          onChange={(e) => handleFilterChange(key, e.target.value)}
        />
      );
    }
  };

  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">{title}</h4>
        {filters && (
          <div className="data-table-filters">
            {filters?.map((filter) => (
              <span key={filter.id}>
                <label htmlFor="">{filter.id}</label>
                {renderFilterInput(filter)}
              </span>
            ))}
          </div>
        )}
        {actions && actions.some((action) => action.type === "add") && (
          <button className="add-btn" onClick={handleAdd}>
            {"+ "} {actions.find((action) => action.type === "add").label}
          </button>
        )}
      </div>
      <div className="data-table-diagram">
        <table className="data-table">
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header.key}>{header.value}</th>
              ))}
              {actions && <th>الإجراءات</th>}
            </tr>
          </thead>
          <tbody>
            {data?.data &&
              data?.data.map((item) => (
                <tr key={item.id}>
                  {headers.map((header) => (
                    <td
                      key={header.key}
                      onClick={() =>
                        header.clickable &&
                        handleItemClick(item.id, header.route)
                      }
                      className={header.clickable ? "clickable-cell" : ""}
                    >
                      {header.type === "image" ? (
                        <img
                          src={`${API_ENDPOINT}/${item.image}`}
                          alt={`alt-${item.name}`}
                          style={{ width: "50px", height: "50px" }}
                        />
                      ) : (
                        item[header.key]
                      )}
                    </td>
                  ))}
                  {actions && (
                    <td>
                      <div className="buttons">
                        {actions.map((action, index) => {
                          if (action.type === "add") return;
                          return (
                            <button
                              className={`button ${action.type}`}
                              key={index}
                              onClick={() => {
                                handleAction(
                                  action.type,
                                  item.id,
                                  item.name || ""
                                );
                              }}
                            >
                              {action.label}
                            </button>
                          );
                        })}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            {data && data.data && data.data.length ? null : (
              <tr>
                <td colSpan={headers.length + 1}>لا يوجد نتائج</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {data?.data?.length > 0 && (
        <Pagination
          className="pagination"
          current={currentPage}
          onChange={handlePageChange}
          total={data?.pagination?.total || 1}
          showSizeChanger={false}
        />
      )}
      {isDeleteModalVisible && (
        <DeleteModal
          name={itemName}
          id={itemId}
          onDelete={deleteFn}
          handleModalVisible={setisDeleteModalVisible}
        />
      )}
      {isShowModalVisible && (
        <ShowDataModal info={info} handleModalVisible={setisShowModalVisible} />
      )}
    </section>
  );
};

export default Table;
