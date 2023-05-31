import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../../../Layout/Admin/Layout";
import BackButton from "../../../../Components/Common/BackButton";
import BreadCrumbCommon from "../../../../Components/Common/BreadCrumbCommon";
import { apiClient } from "../../../../utils/AxiosInstance";
import { Skeleton } from "antd";

function CategoryDetail(props) {
  const { id } = useParams();
  console.log(id);
  const [categoryDetail, setCategoryDetail] = useState({});
  useEffect(() => {
    apiClient.get("Categories/" + id).then(({ data }) => {
      console.log(data);
      setCategoryDetail(data);
    });
  }, []);

  return (
    <Layout activePage={"Template"}>
      <BackButton />
      <BreadCrumbCommon crumbs={["Templates", "Templates details"]} />
      <div className={"card-wrapper"}>
        <div className="custom-card-header">
          <div>
            <p className={"f-18 fw-500"}>Category detail</p>
            <p className={"text-muted f-12"}>
              Update or change the category detail
            </p>
          </div>
        </div>

        <div className={"custom-card-body"}>
          <div className="row">
            <div className="col-8">
              <h2 className="f-18 text-chinzBlack fw-600">
                {categoryDetail?.name}
              </h2>
              <p className="text-silver-mauve f-14 mt-10">
                {categoryDetail?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default CategoryDetail;
