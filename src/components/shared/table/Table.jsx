import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Pagination } from "antd";
import "./Table.scss";
import { API_ENDPOINT } from "../../../../config";

const Table = ({ headers, title, filters, fetchData, children, id }) => {
  const [data, setData] = useState([]);
  const [filterValues, setFilterValues] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { location } = useLocation();

  useEffect(() => {
    fetchData({ ...filterValues, page: currentPage }, id).then((result) => {
      setData(result);
    });
  }, [location]);

  useEffect(() => {
    console.log(filterValues);
    fetchData({ ...filterValues, page: currentPage }, id).then((result) => {
      setData(result);
    });
  }, [fetchData, filterValues, currentPage]);

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
      </div>
      <div className="data-table-diagram">
        <table className="data-table">
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header.key}>{header.value}</th>
              ))}
              {children && <th>الإجراءات</th>}
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
                  {children && (
                    <td>
                      <div className="buttons">
                        {React.Children.map(children, (child) => {
                          return React.cloneElement(child, {
                            to: child.props.to.replace(":id", item.id),
                            key: item.id,
                          });
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
    </section>
  );
};

export default Table;
