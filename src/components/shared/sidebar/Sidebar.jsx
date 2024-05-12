import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import LogoDAR from "../../../../public/assets/images/Dar_logo.svg";
import { MdAssignmentLate } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  FaCodePullRequest,
  FaKitchenSet,
  FaWarehouse,
  FaCashRegister,
  FaTruckArrowRight,
} from "react-icons/fa6";
import { FaUserCircle, FaUser } from "react-icons/fa";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { GiTomato } from "react-icons/gi";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { TbReport } from "react-icons/tb";
import {
  MdOutlineClose,
  MdOutlineLogout,
  MdPerson,
  MdProductionQuantityLimits,
  MdTableBar,
} from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.scss";
import { SidebarContext } from "../../../context/SidebarContext";
import { useTranslation } from "react-i18next";
import { RightOutlined } from "@ant-design/icons";
import { useAuth } from "../../../context/AuthContext";
const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const { closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [activeLink, setActiveLink] = useState(pathname); // State to track active link
  const { user } = useAuth();
  const [display, setDisplay] = useState("d-block");
  const [sidebarWidth, setSidebarWidth] = useState("w-defualt");
  const [arrowDirection, setArrowDirection] = useState("");
  const [justifyContent, setJustifyContent] = useState("d-flex-start");
  const { wrapperMargin, toggleWrapperMargin } = useContext(SidebarContext);
  const checkMenuItemPermission = (requiredPermission) => {
    return user
      ? user.permissions.some(
          (permission) => permission.id === requiredPermission.id
        )
      : false;
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
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
          <div>
            <FaUser size={30} />
            <span>{user?.username}</span>
          </div>
          <ul className="menu-list">
            <li
              className="menu-item"
              title="الموردين"
              style={{
                display: `${
                  checkMenuItemPermission({
                    id: 88,
                    name: "view suppliers",
                  })
                    ? ""
                    : "none"
                }`,
              }}
            >
              <Link
                to="/warehouse/suppliers/show-suppliers"
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
                  style={{ fontSize: "20px" }}
                >
                  الموردين
                </span>
              </Link>
            </li>
            <li
              className="menu-item"
              title="اقسام المخزن"
              style={{
                display: `${
                  checkMenuItemPermission({
                    id: 135,
                    name: "view departments",
                  })
                    ? ""
                    : "none"
                }`,
              }}
            >
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
                  style={{ fontSize: "20px" }}
                >
                  اقسام المخزن
                </span>
              </Link>
            </li>

            <li
              className="menu-item"
              title="الفواتير"
              style={{
                display: `${
                  checkMenuItemPermission({
                    id: 140,
                    name: "view invoices",
                  })
                    ? ""
                    : "none"
                }`,
              }}
            >
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
                  style={{ fontSize: "20px" }}
                >
                  الفواتير
                </span>
              </Link>
            </li>
            <li
              className="menu-item"
              title="الطلبات"
              style={{
                display: `${
                  checkMenuItemPermission({
                    id: 130,
                    name: "view requests",
                  })
                    ? ""
                    : "none"
                }`,
              }}
            >
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
                  style={{ fontSize: "20px" }}
                >
                  الطلبات
                </span>
              </Link>
            </li>
            <li
              className="menu-item"
              title="الكاشير"
              style={{
                display: `${
                  checkMenuItemPermission({
                    id: 124,
                    name: "add orders",
                  })
                    ? ""
                    : "none"
                }`,
              }}
            >
              <Link
                to="/warehouse/cashier/create-order"
                className={`menu-link ${
                  activeLink === "/warehouse/cashier/create-order"
                    ? "active"
                    : ""
                } ${justifyContent}`}
                onClick={() => {
                  console.log("show-departments");
                  handleMenuLinkClick("/warehouse/cashier/create-order");
                }}
              >
                <span className="menu-link-icon">
                  <FaCashRegister size={30} />
                </span>
                <span
                  className={`menu-link-text ${display}`}
                  style={{ fontSize: "20px" }}
                >
                  الكاشير
                </span>
              </Link>
            </li>
            <li
              className="menu-item"
              title="ترابيزات مفتوحة"
              style={{
                display: `${
                  checkMenuItemPermission({
                    id: 124,
                    name: "add orders",
                  })
                    ? ""
                    : "none"
                }`,
              }}
            >
              <Link
                to="/warehouse/cashier/opened-tables"
                className={`menu-link ${
                  activeLink === "/warehouse/cashier/opened-tables"
                    ? "active"
                    : ""
                } ${justifyContent}`}
                onClick={() =>
                  handleMenuLinkClick("/warehouse/cashier/opened-tables")
                }
              >
                <span className="menu-link-icon">
                  <MdTableBar size={30} />
                </span>
                <span
                  className={`menu-link-text ${display}`}
                  style={{ fontSize: "20px" }}
                >
                  ترابيزات مفتوحة
                </span>
              </Link>
            </li>
            <li
              className="menu-item"
              title=" طلبات المخزن"
              style={{
                display: `${
                  checkMenuItemPermission({
                    id: 124,
                    name: "add orders",
                  })
                    ? ""
                    : "none"
                }`,
              }}
            >
              <Link
                to="/warehouse/cashier/warehouse-requests"
                className={`menu-link ${
                  activeLink === "/warehouse/cashier/warehouse-requests"
                    ? "active"
                    : ""
                } ${justifyContent}`}
                onClick={() =>
                  handleMenuLinkClick("/warehouse/cashier/warehouse-requests")
                }
              >
                <span className="menu-link-icon">
                  <FaWarehouse size={30} />
                </span>
                <span
                  className={`menu-link-text special-txt ${display}`}
                  style={{ fontSize: "20px" }}
                >
                  طلبات المخزن
                </span>
              </Link>
            </li>
            <li
              className="menu-item"
              title="طلبات المطبخ"
              style={{
                display: `${
                  checkMenuItemPermission({
                    id: 124,
                    name: "add orders",
                  })
                    ? ""
                    : "none"
                }`,
              }}
            >
              <Link
                to="/warehouse/cashier/kitchen-requests"
                className={`menu-link ${
                  activeLink === "/warehouse/cashier/kitchen-requests"
                    ? "active"
                    : ""
                } ${justifyContent}`}
                onClick={() =>
                  handleMenuLinkClick("/warehouse/cashier/kitchen-requests")
                }
              >
                <span className="menu-link-icon">
                  <FaKitchenSet size={30} />
                </span>
                <span
                  className={`menu-link-text special-txt ${display}`}
                  style={{ fontSize: "20px" }}
                >
                  طلبات المطبخ
                </span>
              </Link>
            </li>
            <li
              className="menu-item"
              title=" حد الامان"
              style={{
                display: `${
                  checkMenuItemPermission({
                    id: 85,
                    name: "safe limit",
                  })
                    ? ""
                    : "none"
                }`,
              }}
            >
              <Link
                to="/warehouse/underLimit/show-under-limit"
                className={`menu-link ${
                  activeLink === "/warehouse/underLimit/show-under-limit"
                    ? "active"
                    : ""
                } ${justifyContent}`}
                onClick={() =>
                  handleMenuLinkClick("/warehouse/underLimit/show-under-limit")
                }
              >
                <span className="menu-link-icon">
                  <AiOutlineSafetyCertificate size={30} />
                </span>
                <span
                  className={`menu-link-text ${display}`}
                  style={{ fontSize: "20px" }}
                >
                  حد الامان
                </span>
              </Link>
            </li>
            <li
              className="menu-item"
              title="المنتجات"
              style={{
                display: `${
                  checkMenuItemPermission({
                    id: 93,
                    name: "view categories",
                  })
                    ? ""
                    : "none"
                }`,
              }}
            >
              <Link
                to="/warehouse/returants/show-resturants"
                className={`menu-link ${
                  activeLink === "/warehouse/returants/show-resturants"
                    ? "active"
                    : ""
                } ${justifyContent}`}
                onClick={() => {
                  console.log("show-departments");
                  handleMenuLinkClick("/warehouse/returants/show-resturants");
                }}
              >
                <span className="menu-link-icon">
                  <MdProductionQuantityLimits size={30} />
                </span>
                <span
                  className={`menu-link-text ${display}`}
                  style={{ fontSize: "20px" }}
                >
                  المنتجات
                </span>
              </Link>
            </li>
            <li
              className="menu-item"
              title="المستخدمين"
              style={{
                display: `${
                  checkMenuItemPermission({
                    id: 130,
                    name: "view requests",
                  })
                    ? ""
                    : "none"
                }`,
              }}
            >
              <Link
                to="/warehouse/users/show-users"
                className={`menu-link ${
                  activeLink === "/warehouse/users/show-users" ? "active" : ""
                } ${justifyContent}`}
                onClick={() => {
                  console.log("show-departments");
                  handleMenuLinkClick("/warehouse/users/show-users");
                }}
              >
                <span className="menu-link-icon">
                  <FaUserCircle size={30} />
                </span>
                <span
                  className={`menu-link-text ${display}`}
                  style={{ fontSize: "20px" }}
                >
                  المستخدمين
                </span>
              </Link>
            </li>
            <li
              className="menu-item"
              title="الأدوار"
              style={{
                display: `${
                  checkMenuItemPermission({
                    id: 123,
                    name: "view orders",
                  })
                    ? ""
                    : "none"
                }`,
              }}
            >
              <Link
                to="/warehouse/roles/show-roles"
                className={`menu-link ${
                  activeLink === "/warehouse/roles/show-roles" ? "active" : ""
                } ${justifyContent}`}
                onClick={() => {
                  console.log("show-departments");
                  handleMenuLinkClick("/warehouse/roles/show-roles");
                }}
              >
                <span className="menu-link-icon">
                  <MdAssignmentLate size={30} />
                </span>
                <span
                  className={`menu-link-text ${display}`}
                  style={{ fontSize: "20px" }}
                >
                  الأدوار
                </span>
              </Link>
            </li>
            {/* <li className="menu-item" title="المنافذ">
              <Link
                to="/warehouse/department/show-department"
                className={`menu-link ${activeLink === "/warehouse/department/show-department"
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
                  style={{ fontSize: "20px" }}
                >
                  المنافذ
                </span>
              </Link>
            </li> */}
            <li>
              <button onClick={handleLogout}>logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
