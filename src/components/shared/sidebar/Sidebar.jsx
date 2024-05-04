import { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { LIGHT_THEME } from "../../../constants/themeConstants";
import LogoBlue from "../../../../public/assets/images/logo_blue.svg";
import LogoBrown from "../../../../public/assets/images/logo_brown.svg";
import LogoWhite from "../../../../public/assets/images/logo_white.svg";
import { useNavigate } from "react-router-dom";
import { TbReport } from "react-icons/tb";
import {
  MdOutlineClose,
  MdOutlineLogout,
  MdPerson,
  MdProductionQuantityLimits,
} from "react-icons/md";
import { Link } from "react-router-dom";
import "./Sidebar.scss";
import { SidebarContext } from "../../../context/SidebarContext";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // closing the navbar when clicked outside the sidebar area
  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className !== "sidebar-oepn-btn"
    ) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`}
      ref={navbarRef}
    >
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <img src={LogoBrown} alt="" />
          <span className="sidebar-brand-text">دار المشاه</span>
        </div>
        <button className="sidebar-close-btn" onClick={closeSidebar}>
          <MdOutlineClose size={24} />
        </button>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/warehouse/suppliers/show-suppliers" className="menu-link">
                <span className="menu-link-icon">
                  <MdPerson size={30} />
                </span>
                <span className="menu-link-text" style={{ fontSize: "30px" }}>
                  الموردين
                </span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/warehouse/recipes/show-departments" className="menu-link">
                <span className="menu-link-icon">
                  <MdProductionQuantityLimits size={30} />
                </span>
                <span className="menu-link-text" style={{ fontSize: "30px" }}>
                  المنتجات
                </span>
              </Link>
            </li>

            <li className="menu-item">
              <Link to="/dashboard/feature" className="menu-link">
                <span className="menu-link-icon">
                  <TbReport size={30} />
                </span>
                <span className="menu-link-text" style={{ fontSize: "30px" }}>
                  الفواتير
                </span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="sidebar-menu sidebar-menu2">
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/" className="menu-link" onClick={handleLogout}>
                <span className="menu-link-icon">
                  <MdOutlineLogout size={20} />
                </span>
                <span className="menu-link-text">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
