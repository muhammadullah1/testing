import React from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../../../Layout/Admin/Layout";
import BackButton from "../../../../Components/Common/BackButton";
import BreadCrumbCommon from "../../../../Components/Common/BreadCrumbCommon";
import HeaderOnly from "../../../../Components/Common/HeaderOnly";
import TemplateForm from './Add_EditTemplate/index'

function Add_EditTemplate() {
 
  const {state}  = useLocation()

  return (
    <Layout activePage="Template">
      <BackButton/>
      <BreadCrumbCommon crumbs={["Articles", state ? "Edit Template" : 'Add Template']} />
      <div className={"card-wrapper"}>
        <HeaderOnly
          title={state ? "Edit Template" : 'Add Template'}
          subTitle={"Enter the details below to add Template"}
        />
          <TemplateForm />
      </div>
    </Layout>
  );
}

export default Add_EditTemplate;
