import React from "react";
import WhatsappIcon from "./../../assets/images/SVGS/Whatsapp";
import Facebookicon from "./../../assets/images/SVGS/Facebook";
import Instagram from "./../../assets/images/SVGS/Instagram";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function Footer({ logoImg, socialMediaLinks }) {
  const { t } = useTranslation();
  const allConfigData = useSelector((state) => state.configDataSlice.allConfigData);

  return (
    <div className="footer"
    style={{ borderBottom: `10px solid ${allConfigData?.colors?.primary}` }}
    >
      <div className="prime-img">
        <img src={logoImg} alt="logo" width={155} height={58} />
      </div>
      <div className="footer-content">
        <p className="">
         {t("Choose NAMA for all your template needs, and unlock your creativity with our high-quality designs. Browse our extensive collection today and experience the power of professional templates that elevate your projects to new heights.")}
        </p>
        <div className="footer-icons">
          <a href={`https://wa.me/${socialMediaLinks && socialMediaLinks?.whatsapp}`} target="_blank" rel="noreferrer"><WhatsappIcon fill={allConfigData?.colors?.primary} /></a>
          <a href={`${socialMediaLinks && socialMediaLinks?.facebook}`} target="_blank" rel="noreferrer"><Facebookicon fill={allConfigData?.colors?.primary} /></a>
          <a href={`${socialMediaLinks && socialMediaLinks?.instagram}`} target="_blank" rel="noreferrer"><Instagram fill={allConfigData?.colors?.primary} /></a>
        </div>
        <p className="">
          {t("All rights reserved by")} <span className="" style={{ color: allConfigData?.colors?.primary }}> NAMA </span>
        </p>
      </div>
    </div>
  );
}

export default Footer;
