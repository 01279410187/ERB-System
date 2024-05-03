import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Pagination } from "antd";
import "./Table.scss";
const Table = ({ headers, routes, actions, title, filters, fetchData }) => {
  const [data, setData] = useState([]);
  const [filterValues, setFilterValues] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData({ ...filterValues, page: currentPage }).then((result) => {
      setData(result);
      console.log(result);
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
    console.log(filterValues);
    setCurrentPage(1);
  };

  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">{title}</h4>
        {filters && (
          <div className="data-table-filters">
            {Object.keys(filters).map((key) => (
              <span>
                <label htmlFor="">{key}</label>
                <input
                  key={key}
                  type="text"
                  placeholder={filters[key]}
                  value={filterValues[key] || ""}
                  onChange={(e) => handleFilterChange(key, e.target.value)}
                />
              </span>
            ))}
          </div>
        )}
        <button
          onClick={() => {
            navigate(routes.add);
          }}
        >
          +إضافة {"" + title}
        </button>
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
                    <td key={header.key}>{item[header.key]}</td>
                  ))}
                  {actions && (
                    <td>
                      <div className="buttons">
                        {actions.edit && routes.edit && (
                          <Link to={`${routes.edit}/${item.id}`}>
                            <button className="button edit">Edit</button>
                          </Link>
                        )}
                        {actions.delete && routes.delete && (
                          <Link to={`${routes.delete}/${item.id}`}>
                            <button className="button delete">Delete</button>
                          </Link>
                        )}
                        {actions.show && routes.show && (
                          <Link to={`${routes.show}/${item.id}`}>
                            <button className="button show">Show</button>
                          </Link>
                        )}
                        {actions.showInvoices && routes.showInvoices && (
                          <Link
                            to={`${routes.showInvoices}/${item.id}/invoices`}
                          >
                            <button className="button show">Invoices</button>
                          </Link>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Pagination
        current={currentPage}
        onChange={handlePageChange}
        total={data?.pagination?.total || 1}
        showSizeChanger={false}
      />
    </section>
  );
};

export default Table;
