import React from "react";
import logo from "../../../assets/images/SVGS/logo.svg";
import BackButton from "../../../Components/Common/BackButton";
import Triangle from "../../../Components/Common/Triangle";
import PaymentForm from "../../../Components/Common/PaymentForm";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LangSelectInput from "../../../Components/Common/LanguageSelectInput";

function BuyNow() {
  const { t } = useTranslation();

  const { state } = useLocation()
  const navigate = useNavigate();

  return (
    <div className="buynow-parent">
      <header className="navbar d-flex items-content-center justify-content-between bg-warning">
        <div className="navbar-content mb-3">
          <div className="prime-logo">
            <a role="button" onClick={() => navigate('/')}>
              <img
                src={logo}
                alt="logo"
              />
            </a>
          </div>
        </div>
        <div className='mx-5 '>
          <LangSelectInput border={false} className={""} />
        </div>
      </header>
      <div className="back-btn">
        <BackButton />
      </div>
      <div className="buynow-content">
        <div className="instruction-content">
          <h1>{t("Instructions")}</h1>
          <p>
            {t(`To purchase a template, simply browse through our collection and select the one that suits your needs. Click on the template to view more details and click the 'Buy Now' or 'Add to Cart' button. Follow the checkout process, enter your payment information, and once the purchase is complete, youll receive a download link for your template.`)}
          </p>
          <p>
            {t("As digital products, our templates are non-refundable. However, if you encounter any technical issues or have concerns about your purchase, please contact our customer support team, and we'll be happy to assist you.")}
          </p>
        </div>
        <div className="payment">
          <PaymentForm title={t("Payment Details")} />
        </div>
        <div className="summary-content">
          <h1>{t("Summary")}</h1>
          <div className="summary-detail">
            <div className="row justify-content-between my-3">
              <span className="col w-50 ">{t("SubTotal")}</span>
              <span className="col w-50 ">{state?.template?.price} {t("SAR")}</span>
            </div>
            <div className="row justify-content-between my-3">
              <span className="col w-50 ">{t("Estimated tax")}</span>
              <span className="col w-50 ">0 {t("SAR")}</span>
            </div>
            <div className="row justify-content-between my-3">
              <span className="col w-50 ">{t("Estimated total")}</span>
              <span className="col w-50 ">0 {t("SAR")}</span>
            </div>
          </div>
          <Triangle />
        </div>
      </div>
    </div>
  );
}

export default BuyNow;