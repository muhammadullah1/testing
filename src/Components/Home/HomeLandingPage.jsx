import React, { useCallback, useEffect } from "react";
import { Button, Input } from "antd";
import BgC from "../../assets/images/SVGS/BgC";
import Homeimg1 from "../../assets/images/PNGS/homeimg1.png";
import Homeimg2 from "../../assets/images/PNGS/homeimg2.png";
import Elipse from "../../assets/images/SVGS/lighterEllipse.svg";
import Polygon from "../../assets/images/SVGS/Polygon.svg";
import "animate.css";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { apiClient } from "../../utils/AxiosInstance";
import { useState } from "react";

function HomeLandingPage() {
  const { t } = useTranslation();

  const allConfigData = useSelector(
    (state) => state.configDataSlice.allConfigData
  );
  const [SocialMediaLinks, setSocialMediaLinks] = useState([]);
  const getSocialMediaLinks = useCallback(async () => {
    try {
      const { data } = await apiClient.get(
        `Configurations/GetSocialMediaLinks`
      );
      setSocialMediaLinks(data);
    } catch (error) {}
  }, []);
  useEffect(() => {
    getSocialMediaLinks();
  }, []);

  return (
    <div className="home">
      <div className="home-content">
        <span className="animate__fadeInLeft">{t("Established in 2020")}</span>
        <div className="title d-flex flex-column">
          <h1 className="animate__animated animate__fadeInLeft animate__slow">
            {t("Welcome to")}
          </h1>
          <span style={{ color: allConfigData?.colors?.primary ? allConfigData?.colors?.primary : '#F5CB5C' }}>
            PRIME <span className="tracking-in-expand" style={{ color: allConfigData?.colors?.primary ? allConfigData?.colors?.primary : '#F5CB5C' }}> LEVELS </span>
          </span>
        </div>
        <p className="animate__animated animate__fadeInLeft animate__slow w-75 my-3">
{t("Welcome to NAMA, the ultimate destination for high-quality templates catering to a wide range of categories. Our mission is to provide you with exceptional templates that not only save you time and effort but also elevate the overall quality and impact of your projects.")}
        </p>
        <Input
          className="input animate__animated animate__fadeInLeft animate__slow"
          placeholder={t("Search your desired template")}
        />
        <Button className="search-button animate__animated animate__fadeInLeft animate__slow" style={{ color: allConfigData?.colors?.primary, border: `1px solid ${allConfigData?.colors?.primary}` }}>
          {t("Search")}
        </Button>
        <div className="polygon">
          <img className="img1" src={Polygon} alt="" />
          <img className="img2" src={Polygon} alt="" />
        </div>
      </div>
        <div className="bg-c">
          <div className="images">
            <div className="elipse">
              <img src={Elipse} alt="" />
            </div>
            <img
              className="image2 animate__animated animate__fadeInTopRight animate__slow"
              src={Homeimg2}
              alt="image2"
            />
            <img
              className="image1 animate__animated animate__fadeInRight animate__slow"
              src={Homeimg1}
              alt="image1"
            />
            <img
              className="image3 animate__animated animate__fadeInBottomLeft animate__slow"
              src={Homeimg2}
              alt="image3"
            />
          </div>
      </div>
      <div className="yellow-svg">
        <BgC
          fill={
            allConfigData?.colors?.primary
              ? allConfigData?.colors?.primary
              : "#F5CB5C"
          }
        />
      </div>
      </div>
  );
}

export default HomeLandingPage;
