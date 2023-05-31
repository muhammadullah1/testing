import React from "react";
import ExploreBtn from "./ExploreBtn";
import { useTranslation } from "react-i18next";

function TemplatesCollections(props) {
  const { t } = useTranslation();

  return (
    <div className="templates" >
      <div className="content-dev" style={{
        backgroundColor: props?.bgPrimary
      }}>
        <div className="content">
          <span className="">{props.heading1}</span>
          <span className="">{props.heading2}</span>
          <p className="">{props.parag}</p>
          <ExploreBtn name={t("Explore")} link={props.link} />
        </div>
      </div>
      <div className="empty-dev border-" style={{
        backgroundColor: props?.bgSecondary
      }}>
      <div className="imgs">
        <img className="image1" src={props?.img} alt="" />
        <img className="image2" src={props?.img2} alt="" />
      </div>
      </div>
    </div>
  );
}

export default TemplatesCollections;
