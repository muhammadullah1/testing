import React from "react";
import Layout from "../../../Layout/Admin/Layout";
import BreadCrumbCommon from "../../../Components/Common/BreadCrumbCommon";
import { Tabs } from "antd";
import TemplateTab from "./Template/index";
import CategoryTab from "./Category/index";
function Template() {
  const tabsItem = [
    { label: "Templates", key: 1, children: <TemplateTab /> }, // remember to pass the key prop
    { label: "Category", key: 2, children: <CategoryTab /> },
  ];

  const tabBarStyle = {
    background: "#FBFBFB 0% 0% no-repeat padding-box",
    opacity: 1,
  };

  return (
    <Layout activePage={"Template"}>
      <p className={"f-18 fw-500"} style={{ color: "#161002" }}>
        {"Requests"}
      </p>
      <BreadCrumbCommon crumbs={["Template"]} />
      <div className={"container-fluid m-0 p-0 card-wrapper"}>
        <Tabs
          items={tabsItem}
          defaultActiveKey="1"
          type="card"
          tabBarStyle={tabBarStyle}
        />
      </div>
    </Layout>
  );
}

export default Template;
