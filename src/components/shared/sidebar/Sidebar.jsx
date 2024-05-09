import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { LIGHT_THEME } from "../../../constants/themeConstants";
import LogoBlue from "../../../../public/assets/images/logo_blue.svg";
import LogoBrown from "../../../../public/assets/images/logo_brown.svg";
import LogoDAR from "../../../../public/assets/images/Dar_logo.svg";
import LogoWhite from "../../../../public/assets/images/logo_white.svg";
import { useNavigate } from "react-router-dom";
import { FaCodePullRequest, FaTruckArrowRight } from "react-icons/fa6";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
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
import { RightOutlined } from "@ant-design/icons";

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const { closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [activeLink, setActiveLink] = useState(pathname); // State to track active link

  const [display, setDisplay] = useState("d-block");
  const [sidebarWidth, setSidebarWidth] = useState("w-defualt");
  const [arrowDirection, setArrowDirection] = useState("");
  const [justifyContent, setJustifyContent] = useState("d-flex-start");
  const { wrapperMargin, toggleWrapperMargin } = useContext(SidebarContext);

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

  const handleCloseSidebar = () => {
    {
      display === "d-block" ? setDisplay("d-none") : setDisplay("d-block");
    }
    {
      sidebarWidth === "w-auto"
        ? setSidebarWidth("w-defualt")
        : setSidebarWidth("w-auto");
    }
    {
      arrowDirection === "rotate-y-180"
        ? setArrowDirection("")
        : setArrowDirection("rotate-y-180");
    }
    {
      justifyContent === "d-flex-start"
        ? setJustifyContent("d-justify-center")
        : setJustifyContent("d-flex-start");
    }
    toggleWrapperMargin(); // Call toggleWrapperMargin from context
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className={`sidebar ${sidebarWidth}`} ref={navbarRef}>
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <img src={LogoDAR} alt="" />
          <span className={`sidebar-brand-text ${display}`}>دار المشاه</span>
        </div>
        <div className={`arrows ${arrowDirection}`}>
          <RightOutlined
            className={`arrow-right `}
            onClick={() => {
              handleCloseSidebar();
            }}
          />
          {/* <i class="arrow right"></i> */}
          {/* <i class="arrow left"></i> */}
        </div>
        <button className="sidebar-close-btn">
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
                className={`menu-link ${
                  activeLink === "/warehouse/suppliers/show-suppliers"
                    ? "active"
                    : ""
                } ${justifyContent}`}
                onClick={() => {
                  console.log("show-suppliers");
                  handleMenuLinkClick("/warehouse/suppliers/show-suppliers");
                }}
              >
                <span className="menu-link-icon">
                  <FaTruckArrowRight size={30} />
                </span>
                <span
                  className={`menu-link-text ${display}`}
                  style={{ fontSize: "30px" }}
                >
                  الموردين
                </span>
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/warehouse/recipes/show-departments"
                className={`menu-link ${
                  activeLink === "/warehouse/recipes/show-departments"
                    ? "active"
                    : ""
                } ${justifyContent}`}
                onClick={() => {
                  console.log("show-departments");
                  handleMenuLinkClick("/warehouse/recipes/show-departments");
                }}
              >
                <span className="menu-link-icon">
                  <GiTomato size={30} />
                </span>
                <span
                  className={`menu-link-text ${display}`}
                  style={{ fontSize: "24px" }}
                >
                  اقسام المخزن
                </span>
              </Link>
            </li>

            <li className="menu-item">
              <Link
                to="/warehouse/invoices/show"
                className={`menu-link ${
                  activeLink === "/warehouse/invoices/show" ? "active" : ""
                } ${justifyContent}`}
                onClick={() => handleMenuLinkClick("/warehouse/invoices/show")}
              >
                <span className="menu-link-icon">
                  <TbReport size={30} />
                </span>
                <span
                  className={`menu-link-text ${display}`}
                  style={{ fontSize: "30px" }}
                >
                  الفواتير
                </span>
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/warehouse/requests/show-requests"
                className={`menu-link ${
                  activeLink === "/warehouse/requests/show-requests"
                    ? "active"
                    : ""
                } ${justifyContent}`}
                onClick={() =>
                  handleMenuLinkClick("/warehouse/requests/show-requests")
                }
              >
                <span className="menu-link-icon">
                  <FaCodePullRequest size={30} />
                </span>
                <span
                  className={`menu-link-text ${display}`}
                  style={{ fontSize: "30px" }}
                >
                  الطلبات
                </span>
              </Link>
            </li>

            <li className="menu-item">
              <Link
                to="/warehouse/department/show-department"
                className={`menu-link ${
                  activeLink === "/warehouse/department/show-department"
                    ? "active"
                    : ""
                } ${justifyContent}`}
                onClick={() =>
                  handleMenuLinkClick("/warehouse/department/show-department")
                }
              >
                <span className="menu-link-icon">
                  <HiOutlineOfficeBuilding size={30} />
                </span>
                <span
                  className={`menu-link-text ${display}`}
                  style={{ fontSize: "30px" }}
                >
                  المنافذ
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
