import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { LIGHT_THEME } from "../../../constants/themeConstants";
import LogoBlue from "../../../../public/assets/images/logo_blue.svg";
import LogoBrown from "../../../../public/assets/images/logo_brown.svg";
import LogoDAR from "../../../../public/assets/images/Dar_logo.svg";
import LogoWhite from "../../../../public/assets/images/logo_white.svg";
import { useNavigate } from "react-router-dom";
import { FaCodePullRequest } from "react-icons/fa6";
import { GiTomato } from "react-icons/gi";

import { TbReport } from "react-icons/tb";
import {
  MdOutlineClose,
  MdOutlineLogout,
  MdPerson,
  MdProductionQuantityLimits,
} from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.scss";
import { SidebarContext } from "../../../context/SidebarContext";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [activeLink, setActiveLink] = useState(pathname); // State to track active link

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  // Handle clicking on menu links
  const handleMenuLinkClick = (link) => {
    setActiveLink(link);
  };

  // closing the navbar when clicked outside the sidebar area
  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className !== "sidebar-oepn-btn"
    ) {
      // closeSidebar();
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
      className={`sidebar `}
      ref={navbarRef}
    >
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <img src={LogoDAR} alt="" />
          <span className="sidebar-brand-text">دار المشاه</span>
        </div>
        <button className="sidebar-close-btn" >
          <MdOutlineClose size={24} />
        </button>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            <li className="menu-item">
              <Link
                to="/warehouse/suppliers/show-suppliers"
                // className={`menu-link ${active? active: ""}`} onClick={handleActiveClass}
                className={`menu-link ${activeLink === "/warehouse/suppliers/show-suppliers"
                  ? "active"
                  : ""
                  }`}
                onClick={() => {
                  console.log("show-suppliers");
                  handleMenuLinkClick("/warehouse/suppliers/show-suppliers");
                }}
              >
                <span className="menu-link-icon">
                  <MdPerson size={30} />
                </span>
                <span className="menu-link-text" style={{ fontSize: "30px" }}>
                  الموردين
                </span>
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/warehouse/recipes/show-departments"
                className={`menu-link ${activeLink === "/warehouse/recipes/show-departments"
                  ? "active"
                  : ""
                  }`}
                onClick={() => {
                  console.log("show-departments");
                  handleMenuLinkClick("/warehouse/recipes/show-departments");
                }}
              >
                <span className="menu-link-icon">
                  <GiTomato size={30} />
                </span>
                <span className="menu-link-text" style={{ fontSize: "30px" }}>
                  المكونات
                </span>
              </Link>
            </li>

            <li className="menu-item">
              <Link
                to="/warehouse/invoices/show"
                className={`menu-link ${activeLink === "/warehouse/invoices/show" ? "active" : ""
                  }`}
                onClick={() => handleMenuLinkClick("/warehouse/invoices/show")}
              >
                <span className="menu-link-icon">
                  <TbReport size={30} />
                </span>
                <span className="menu-link-text" style={{ fontSize: "30px" }}>
                  الفواتير
                </span>
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/warehouse/requests/show-requests"
                className={`menu-link ${activeLink === "/warehouse/requests/show-requests"
                  ? "active"
                  : ""
                  }`}
                onClick={() =>
                  handleMenuLinkClick("/warehouse/requests/show-requests")
                }
              >
                <span className="menu-link-icon">
                  <FaCodePullRequest size={30} />
                </span>
                <span className="menu-link-text" style={{ fontSize: "30px" }}>
                  الطلبات
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
