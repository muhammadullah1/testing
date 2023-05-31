import React, { useEffect, useState } from "react";
import prime from "../../assets/images/SVGS/blacklogo.svg";
import Cross from "../../assets/images/SVGS/cross.svg";
import TemplateArrow from "../../assets/images/SVGS/templatearrow.svg";
import { Button, Menu, Dropdown, Space, Drawer } from "antd";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Footer from "../../Components/Common/Footer";
import { apiClient } from "../../utils/AxiosInstance";
import ChatWithUsButton from "../../Components/Common/ChatWithUsButton";
import {
  setAllConfigData,
  setTemplateCategory,
} from "../../store/slicers/configDataSlice";
import { useDispatch, useSelector } from "react-redux";
import Hamberger from "../../assets/images/SVGS/hamberger.svg";
import { userLogout } from "../../store/slicers/authSlice";
import LangSelectInput from "../../Components/Common/LanguageSelectInput";
import { useTranslation } from "react-i18next";

const Layout = ({
  children,
  footer = false,
  chatWithUs = false,
  className,
  showLogin = false,
  templateDropdown = true,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allConfigData = useSelector(
    (state) => state.configDataSlice.allConfigData
  );
  const templateCategory = useSelector(
    (state) => state.configDataSlice.templateCategory
  );
  const authState = useSelector((state) => state.auth);


  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [placement, setPlacement] = useState("top");
  const showDrawer = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(
          "Configurations/GetAllConfigurationData"
        );
        const cachedConfigData = response.data;
        dispatch(setAllConfigData(cachedConfigData));

        const categoryResponse = await apiClient.get(
          "Templates/GetCategoryDropdownList"
        );
        const formattedData = categoryResponse.data.map((item, index) => ({
          label: item.categoryName,
          key: index.toString(),
          link: item.categoryName,
          categoryId: item.id,
        }));
        dispatch(setTemplateCategory(formattedData));
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, [dispatch]);
  console.log(
    pathname === "/templates" || pathname === "/templates/details"
      ? console.log("TRUEE")
      : console.log("false")
  );
  const menuItems = templateCategory.map((item) => (
    <Menu.Item key={item.key}>
      <a
        onClick={() =>
          navigate("/templates", { state: { categoryId: item?.categoryId } })
        }
      >
        {item.label}
      </a>
    </Menu.Item>
  ));


  // Inserting a divider at a specific index
  const insertDivider = (arr) => {
    let result = [];
    arr.forEach((item, index) => {
      result.push(item);
      if (index < arr.length - 1) {
        result.push(<Menu.Divider key={`divider-${index}`} />);
      }
    });
    return result;
  };

  // Usage example
  const menuItemsWithDivider = insertDivider(menuItems);

  const handleLogout = () => {
    dispatch(userLogout());
    navigate('/login');
  };


  console.log("isLoggedIn-------------", authState.isAuthenticate)

  return (
    <div className="custome-relative">
      <header
        className={`navbar  d-flex items-content-center justify-content-between ${className}`}
      >
        <div className="navbar-content">
          <div className="prime-logo">
            <a role="button" onClick={() => navigate("/")}>
              <img
                className="logo"
                src={allConfigData?.logo?.logoImage}
                alt="logo"
              />
            </a>
            <img
              onClick={showDrawer}
              className="hamberger"
              src={Hamberger}
              alt=""
            />
          </div>
          <Drawer
            placement={placement}
            closable={false}
            onClose={onClose}
            open={isOpen}
            key={placement}
          >
            <div className="mobile-nav">
              <img
                onClick={() => onClose()}
                className="cross-icon"
                src={Cross}
                alt=""
              />

              <div className="logo-lng">
                <img src={prime} alt="" />
                <LangSelectInput className={"change-languagebtn-inlayout"} />
              </div>

              <div className="sm-navepages">
                <Link
                  exact
                  to="/"
                  className={`${pathname === "/" && "active-tab"}`}
                >
                  {allConfigData?.pagesDetails?.home}
                </Link>
                <Link
                  className={`tmplt ${pathname === "/templates" && "active-tab"
                    }`}
                  to="/templates"
                >
                  {allConfigData?.pagesDetails?.templates}
                </Link>
                <div className="templates-child">
                  {templateCategory &&
                    templateCategory.map((item) => (
                      <a
                        onClick={() =>
                          navigate(`/templates`, {
                            state: { categoryId: item?.categoryId },
                          })
                        }
                      >
                        {item.label}
                      </a>
                    ))}
                </div>
                <Link
                  to="/templates/addtocart"
                  className={`${pathname === "/templates/addtocart" && "active-tab"
                    }`}
                >
                  {allConfigData?.pagesDetails?.cart}
                </Link>
                <Link
                  to="/services"
                  className={`${pathname === "/services" && "active-tab"}`}
                >
                  {allConfigData?.pagesDetails?.articales}
                </Link>
              </div>
            </div>
          </Drawer>
          <ul className="pages">
            <NavLink
              exact
              to="/"
              className={`${pathname === "/" && "active-tab"}`}
            >
              {allConfigData?.pagesDetails?.home}
            </NavLink>
            {templateDropdown ? (
              <Dropdown
                overlay={<Menu>{menuItemsWithDivider}</Menu>}
                trigger={["hover"]}
              >
                <Space align="start">
                  <Link
                    to="/templates"
                    className={`${pathname === "/templates" && "active-tab"}`}
                  >
                    {allConfigData?.pagesDetails?.templates}
                  </Link>
                  <img src={TemplateArrow} alt="" />
                </Space>
              </Dropdown>
            ) : (
              <Link
                to="/templates"
                className={`${pathname === "/templates" && "active-tab"}`}
              >
                {allConfigData?.pagesDetails?.templates}
              </Link>
            )}

            <Link
              to="/templates/addtocart"
              className={`${pathname === "/templates/addtocart" && "active-tab"
                }`}
            >
              {allConfigData?.pagesDetails?.cart}
            </Link>
            <Link
              to="/services"
              className={`${pathname === "/services" && "active-tab"}`}
            >
              {allConfigData?.pagesDetails?.articales}
            </Link>
          </ul>
        </div>
        <div className="nav-left-btns">
          {/* <Dropdown overlay={<Menu>{menuItems2}</Menu>} trigger={["click"]}>
            <span onClick={(e) => e.preventDefault()}>
              <Space>
                <img src={globeicon} alt="languageicon" />
                English
                <DownOutlined />
              </Space>
            </span>
          </Dropdown> */}
          <LangSelectInput border={false} className={"change-languagebtn-inlayout"} />


          {showLogin &&
            (authState?.isAuthenticate ?
            <Button
            className={`button ${(pathname === '/templates' || pathname.includes('/templates/details') || pathname.includes('/templates/addtocart') ? "border-white" : "")}`}
            // className={` ${
            //   pathname === "/templates/addtocart" ? "logout" : ""
            // }`}
            onClick={handleLogout}
            >
              {t("Logout")}
            </Button>
            :
            <Button
                className={`button ${(pathname === '/templates' || pathname.includes('/templates/details') ? "border-white" : "")}`}
              onClick={() => navigate("/login")}
            >
              {t("Login")}
            </Button>
            )
          }
        </div>
      </header>
      <main>{children}</main>
      {chatWithUs && <ChatWithUsButton />}
      <footer>
        {footer && (
          <Footer
            logoImg={allConfigData?.logo?.logoImage}
            socialMediaLinks={allConfigData?.socialMediaLinks}
          />
        )}
      </footer>
    </div>
  );
};

export default Layout;
