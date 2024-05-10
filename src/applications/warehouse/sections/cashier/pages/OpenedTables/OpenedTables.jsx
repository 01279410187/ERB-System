import React, { useEffect, useState } from "react";
import { getAllTables } from "../../../../../../apis/cashier";
import TableCard from "../../../../../../components/ui/TableCard/TableCard";
import "./OpenedTables.scss";
const OpenedTables = () => {
  const [tables, setTables] = useState([]);
  const [order, setOrder] = useState({});
  useEffect(() => {
    const getTables = async () => {
      const res = await getAllTables();
      setTables(res.data);
      console.log(res.data);
    };
    getTables();
  }, []);
  return (
    <div>
      <h1 className="tables-title">الترابيزات المفتوحة</h1>

      <div className="table-cards">
        {tables.length > 0 &&
          tables.map((table) => {
            return (
              <TableCard
                key={table.id}
                id={table.id}
                number={table.table_number}
                setOrder={setOrder}
              />
            );
          })}
        {tables.length === 0 && <p>لا يوجد نتائج</p>}
      </div>
    </div>
  );
};

export default OpenedTables;
