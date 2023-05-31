import React from "react";
import { useTranslation } from "react-i18next";
import ReactPlayer from 'react-player';


function Description({ apiData }) {
  const { t } = useTranslation();
  return (
    <div className="description-page">
      <div className="description">
        <h1>{t("Description")}</h1>
      </div>
      <div className="para">
        <p>
         {apiData?.description}
        </p>
      </div>
      <div className="colored-dev">
        <div className="img-section">
          <ReactPlayer
            // url="https://dsqqu7oxq6o1v.cloudfront.net/preview-9650dW8x3YLoZ8.mp4"
            url={`${apiData?.video}`}
            controls
            width="100%"
            height="auto"
          />
        </div>
      </div>
      <div className="features-section">
        <div className="key-features">
          <div className="features-head">
            <h1>{t("Key Features")}</h1>
          </div>
          <div className="key-accordian">
            <div
              dangerouslySetInnerHTML={{ __html: apiData?.uniqueFeatures }}
            ></div>
          </div>
        </div>
        <div className="unique-features">
          <div className="features-head">
            <h1>{t("Unique Features")}</h1>
          </div>
          <div className="unique-accordian">
            <div
              dangerouslySetInnerHTML={{ __html: apiData?.keyofcontents }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Description;
