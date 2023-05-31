import React, { useEffect, useState } from "react";
import Layout from "../../../../Layout/Client/Layout";
import Stars from "../../../../assets/images/SVGS/stars.svg";
import Cartimg from "../../../../assets/images/SVGS/cartimg.svg";
import { Button, Select, message } from "antd";
import Description from "./Description";
import SuggestedTemplate from "./SuggestedTemplate";
import SimpleSlider from "./Slick";
import ClientBreadCrumb from "../../../../Components/Common/ClientBreadCrumb";
import { useNavigate, useParams } from "react-router-dom";
import { apiClient } from "../../../../utils/AxiosInstance";
import CheckIsAuthenticate from "../../../../Constants/CheckIsAuthenticate";
import { addToCart } from "../../../../store/slicers/templateCartSlice";
import { useDispatch, useSelector } from "react-redux";
import { ServerErrorMessage } from "../../../../utils/ServerErrorMessages";
import { useTranslation } from "react-i18next";

function DetailDashbaord() {
  const { t } = useTranslation();
  const [apiData, setApiData] = useState([]);
  const [CustomerReq, setCustomerReq] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    apiClient
      .get("ClientSideTemplates/GetClientTemplateById/" + id)
      .then(({ data }) => {
        setApiData(data);
        console.log("data.images: ", data.images);
      })
      .catch((err) => {});
  }, []);


  const breadcrumbItems = [
    { title: t('Home'), href: '/home' },
    { title: t('Excel Dashboards'), href: '' },
  ];
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const addOnCart = (templateRecord) => {
    if (CheckIsAuthenticate(authState)) {
      const { id, name, images, price } = templateRecord;
      dispatch(addToCart({ id, name, images, price }));
    } else {
      navigate("/login");    }
  };

  const buyNow = () => {
    if (CheckIsAuthenticate(authState)) {
      navigate("/templates/buynow", { state: { template: apiData } });
    } else {
      navigate("/login");

    }
  };
  const handleChange = (value) => {
    if (CheckIsAuthenticate(authState)) {
      setCustomerReq(true);
    } else {
      navigate("/login");

    }
  };
  const handleCustomerReq = () => {
    const {
      categoryId: CategoryId,
      uniqueFeatures: Unique_features,
      keyofcontents: Keyofcontents,
      description: Description,
    } = apiData;
    let formValues = {
      ServiceId: "4a21a291-7afb-42dc-8ade-4a107857a209",
      Description,
      Keyofcontents,
      Unique_features,
      CategoryId,
    };
    console.log(formValues, "are val");
    apiClient
      .post("CustomerRequest", formValues, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        message.success(t("Request Send Successfully"));
        navigate("/templates/buynow", { state: { template: apiData } });
      })
      .catch(({ response }) => {
        const { data } = response;
        ServerErrorMessage(data);
      });
  };

  return (
    <Layout
      activePage="Templates"
      footer={true}
      chatWithUs={true}
      showLogin={true}
      className={"box-shadow"}
    >
      <div className="dashbaord-page">
        <div className="first-page">
          <div className="carasoul">
              <div className="bread">
          <ClientBreadCrumb breadcrumbItems={breadcrumbItems} />
        </div>
            <SimpleSlider imagesData ={apiData?.images} />
          </div>
          <div className="side-content">
            <div className="contents">
              <div className="header-title">
                <h1>
                  {apiData?.name?.split(" ")[0]}
                  <span> {apiData?.name?.split(" ").map((el,i) => i!=0 && <span className="mx-1">{el}</span>)} </span>
                </h1>
                {/* <div className="share-btn" onMouseEnter={handleMouseEnter}>
                  <img src={Share} alt="" />
                  {isHovered && (
                    <div
                      onMouseLeave={handleMouseLeave}
                      className="hover-icons"
                    >
                      <img src={Wattsapp} alt="Icon 1" />
                      <img src={insta} alt="Icon 2" />
                      <img src={insta} alt="Icon 3" />
                    </div>
                  )}
                </div> */}
              </div>

              <div className="stars">
                <img src={Stars} alt="" />
                <span>80 {t("reviews")}</span>
              </div>
              <div className="parag-detail">
                <span>{apiData.price} {t("SAR")} </span>
                <p>{apiData?.description}</p>
              </div>
              <div className="catag">
                <p>{t("Category:")}</p>
                <span>{apiData?.category}</span>
              </div>
              <div className="select-options">
                <Select
                  className="select"
                  style={{
                    width: 200,
                    border: "none",
                    background: "#F5F8F6",
                  }}
                  onChange={handleChange}
                  placeholder={t("prefered languages")}
                  options={[
                    {
                      label: t("English"),
                      value: "english",
                    },
                    {
                      label: t("Arabic"),
                      value: "arabic",
                    },
                    {
                      label: t("French"),
                      value: "french",
                    },
                    {
                      label: t("Dutch"),
                      value: "dutch",
                    },
                    {
                      label: t("Turkish"),
                      value: "turkish",
                    },
                  ]}
                />
                <span>{t("100 SAR")}</span>
              </div>
              <div className="cart-btns">
                {CustomerReq ? (
                  <Button
                    className="buy-btn"
                    style={{ minWidth: "250px" }}
                    onClick={handleCustomerReq}
                  >
                    {" "}
                    {t("Request for Language Change")}
                  </Button>
                ) : (
                  <>
                    <Button className="buy-btn" onClick={buyNow}>
                      {" "}
                      {t("Buy Now")}
                    </Button>
                    <Button
                      className="cart-btn"
                      onClick={() => addOnCart(apiData)}
                    >
                      <img src={Cartimg} alt="" /> {t("Add To Cart")}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="">
          {/* <LiveDashboard /> */}
          <Description apiData={apiData} />
          <SuggestedTemplate imagesarray={apiData?.images} />
        </div>
      </div>
    </Layout>
  );
}

export default DetailDashbaord;
