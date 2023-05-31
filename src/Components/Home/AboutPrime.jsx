import React from "react";
import Ellipse from "../../assets/images/SVGS/Ellipse.svg";
import Homepageimg1 from "../../assets/images/PNGS/homeimg1.png";
import Homepageimg2 from "../../assets/images/PNGS/homeimg2.png";
import Ellipse2 from "../../assets/images/SVGS/Ellipse2.svg";
import { useTranslation } from "react-i18next";

function AboutPrime({ bgPrimary }) {
  const { t } = useTranslation();

  return (
    <div className="prime-content">
      <h1 className=''>{t("About")} <span className='' style={{ color: bgPrimary }}> Prime Level's </span></h1>

      <p className="">
{t("Choose NAMA for all your template needs, and unlock your creativity with our high-quality designs. Browse our extensive collection today and experience the power of professional templates that elevate your projects to new heights.")}</p>
      <div className="prime-pictures">
        <div className="relative">
          <img
            className="elipse-img1"
            src={Ellipse2}
            alt="ellipseimage"
          />
          <img
            className="elipse-img2"
            src={Ellipse}
            alt="ellipseimage"
          />
          <img
            className="bg-img1"
            src={Homepageimg1}
            alt=""
          />
        </div>
        <div className="side-pictures">
          <img
            className="side-img"
            src={Homepageimg2}
            alt=""
          />
          <img
            className="elipse-img3 "
            src={Ellipse}
            alt="ellipseimage"
          />
        </div>
      </div>
    </div>
  );
}

export default AboutPrime;
