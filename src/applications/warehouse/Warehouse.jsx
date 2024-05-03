import { Outlet } from "react-router-dom";
import Sidebar from "../../components/shared/sidebar/Sidebar";
const Warehouse = () => {
  return (
    <>
      <Sidebar />
      <div className="content-wrapper">
        <Outlet />
      </div>
    </>
  );
};

export default Warehouse;
