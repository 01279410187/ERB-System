import { Outlet, Link, useLocation } from "react-router-dom";
import Sidebar from "../../components/shared/sidebar/Sidebar";
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useContext } from "react";
import { SidebarContext } from "../../context/SidebarContext";

const Warehouse = () => {
  const location = useLocation();
  const { wrapperMargin } = useContext(SidebarContext); // Access wrapperMargin from context


  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <>
      <Sidebar />
      <div className={`content-wrapper ${wrapperMargin}`}>
        <button className="back-arrow" onClick={handleGoBack}>
          <ArrowLeftOutlined />
        </button>
        <Outlet />
      </div>
    </>
  );
};

export default Warehouse;
