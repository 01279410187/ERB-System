import { Outlet, Link, useLocation } from "react-router-dom";
import Sidebar from "../../components/shared/sidebar/Sidebar";
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useContext } from "react";
// import { SidebarContext } from "../../context/SidebarContext";

const Cashier = () => {



    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <>
            {/* <Sidebar /> */}
            <div>
                <Outlet />
            </div>
        </>
    );
};

export default Cashier;
