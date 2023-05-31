import React from "react";
import { useTranslation } from "react-i18next";

function SuggestedTemplate({ imagesarray }) {
  const { t } = useTranslation();
  return (
    <div className="suggested-template">
      <div className="template-content">
        <div className="title-section">
          <h1>
           {t("Suggested Templates")}
          </h1>
          <p>
           {t("These templates have been handpicked by our experts to showcase the best and most popular designs across various categories. From eye-catching website templates to professionally designed presentations, we have you covered.")}
          </p>
        </div>
        <div className="suggest-imgs">
          {imagesarray?.map((index, key) => (
            <img key={key} src={index?.imageUrl} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SuggestedTemplate;
