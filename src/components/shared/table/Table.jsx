import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Pagination, Select } from "antd";
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
  showFn,
  detailsHeaders,
  header,
  updateFn,
  changeStatusFn,
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
    console.log(filterValues);
    fetchData({ ...filterValues, page: currentPage }, id).then((result) => {
      setData(result);
    });
  }, [
    fetchData,
    filterValues,
    currentPage,
    isDeleteModalVisible,
    isShowModalVisible,
    location,
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
        handleShowData(itemId, itemName);
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

  const handleShowData = (itemId, itemName) => {
    setItemName(itemName);
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
  const renderStatus = (status) => {
    switch (status) {
      case "pending":
        return <p className="status pending">تحت المراجعة</p>;
      case "approved":
        return <p className="status approved">تم المراجعة</p>;
      case "rejected":
        return <p className="status rejected">مرفوض</p>;
      case "done":
        return <p className="status done">تم الصرف</p>;
      default:
        break;
    }
  };
  const renderFilterInput = (filter) => {
    const { key, type, placeholder, options } = filter;
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
    } else if (type === "date") {
      return (
        <input
          className="filter-input"
          type="date"
          value={filterValues[key] || ""}
          onChange={(e) => handleFilterChange(key, e.target.value)}
        />
      );
    } else if (type === "selection") {
      return (
        <Select
          className="selection-input"
          showSearch
          placeholder={placeholder}
          optionFilterProp="children"
          onChange={(value) => handleFilterChange(key, value)}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={options}
        />
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
              <th>الرقم</th>
              {headers.map((header) => (
                <th key={header.key}>{header.value}</th>
              ))}
              {actions && <th>الإجراءات</th>}
            </tr>
          </thead>
          <tbody>
            {data?.data &&
              data?.data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1 + (currentPage - 1) * 10}</td>

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
                      ) : header.nestedKey ? (
                        item[header.key][header.nestedKey]
                      ) : header.key === "status" ? (
                        renderStatus(item[header.key])
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
                                  item.name || item.title || ""
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
        <ShowDataModal
          id={itemId}
          name={itemName}
          showFn={showFn}
          header={header}
          handleModalVisible={setisShowModalVisible}
          detailsHeaders={detailsHeaders}
          updateFn={updateFn}
          changeStatusFn={changeStatusFn}
        />
      )}
    </section>
  );
};

export default Table;
