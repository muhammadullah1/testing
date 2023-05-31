import React from "react";
import { Breadcrumb } from "antd";
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem";

function ClientBreadCrumb({ breadcrumbItems = [] }) {
  return (
    <div className="common-bread">
      <Breadcrumb separator=">">
        {breadcrumbItems.map((item, index) => (
          <BreadcrumbItem
            key={index}
            href={item.href}
            active={index === breadcrumbItems.length - 1}
          >
            {item.title}
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </div>
  );
}

export default ClientBreadCrumb;
