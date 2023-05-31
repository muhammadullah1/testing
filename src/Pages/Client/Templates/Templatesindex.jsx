import React from "react";
import Layout from "../../../Layout/Client/Layout";
import TemplatesDetailsPage from "../../../Components/Templates/TemplatesDetailsPage";
import ClientBreadCrumb from "../../../Components/Common/ClientBreadCrumb";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
function Templatesindex() {
  const { t } = useTranslation();
  const allConfigData = useSelector((state) => state.configDataSlice.allConfigData);

  const breadcrumbItems = [
    { title: t('Home'), href: '/home' },
    { title: t('Templates'), href: '' },
  ];
  return (
    <Layout activePage='Templates' footer={true} chatWithUs={true} showLogin={true} templateDropdown={false} className={'box-shadow'}>
      <div className="templates-index">
        <div className="bread">
          <ClientBreadCrumb breadcrumbItems={breadcrumbItems} />
        </div>
        <div className="template-heading">
          <h1>
            {" "}
            {t("Excel")} <span style={{ color: allConfigData?.colors?.primary }}> {t("Dashboards")} </span>
          </h1>
          <p className="w-50">
            {t("Our Excel dashboard templates offer intuitive visualizations, customizable features, and powerful data manipulation tools, allowing you to present complex information in a clear and organized manner. Simplify your data-driven decision-making process with our comprehensive Excel dashboard templates")}
          </p>
        </div>
        <div className="">
          <TemplatesDetailsPage />
        </div>
      </div>
    </Layout>
  );
}

export default Templatesindex;
