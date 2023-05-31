import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Select } from "antd";
import Layout from "../../../../Layout/Admin/Layout";
import BackButton from "../../../../Components/Common/BackButton";
import BreadCrumbCommon from "../../../../Components/Common/BreadCrumbCommon";
import { apiClient } from "../../../../utils/AxiosInstance";
import DeleteButton from "../../../../Components/Common/DeleteButton";
import { ReactComponent as EditIcon } from "../../../../assets/images/Icons/edit-icon.svg";

function TemplateDetail(props) {
  const navigate = useNavigate();

  const { id } = useParams();
  const [Template, setTemplate] = useState({});

  useEffect(() => {
    apiClient.get("Templates/" + id).then(({ data }) => {
      console.log(data);
      setTemplate(data);
    });
  }, []);

  return (
    <Layout activePage={"Template"}>
      <BackButton />
      <BreadCrumbCommon crumbs={["Templates", "Templates details"]} />
      <div className={"card-wrapper"}>
        <div className="custom-card-header">
          <div>
            <p className={"f-18 fw-500"}>Templates</p>
            <p className={"text-muted f-12"}>
              Update or change the Templates information
            </p>
          </div>
          <div className="d-flex gap-3">
            <Link type="ghost" to="/admin/template/create" state={Template}>
              <EditIcon />
            </Link>
            <DeleteButton
              apiEndpoint={"Templates/DeleteTemplates/" + Template?.id}
              queryKey="TemplatesTable"
              isNavigate={true}
              navigateTo="/admin/template"
            />
          </div>
        </div>
        <div className={"custom-card-body"}>
          <div className="row">
            <div className="col-4">
              <div
                className="py-3"
                style={{
                  border: "1px solid #ECECEC",
                  width: "244px",
                  overflow: "hidden",
                }}
              >
                <img
                  width="244px"
                  src={Template?.images && Template?.images[0]?.imageUrl}
                />
              </div>
            </div>
            <div className="col-8">
              <h2 className="f-18 text-chinzBlack fw-600">{Template?.name}</h2>
              <p className="f-16 mt-8">( {Template?.price} SAR )</p>
              <p className="mt-10 text-chinzBlack f-14">
                {Template?.category}
                <span className="ml-15">
                  {Template?.noOfPurchase} Purchases
                </span>
              </p>
              <p className="text-silver-mauve f-14 mt-10">
                {Template?.description}
              </p>
              <div className="d-flex gap-5 mt-20">
                <div>
                  <p className="text-silver-mauve f-14">File</p>
                  <p className="f-14">{Template?.zipFile}</p>
                </div>
                <div>
                  <p className="text-silver-mauve f-14">Color</p>
                  <p className="f-14 d-flex align-items-center">
                    {Template?.color}
                    <span
                      className="rect-pill"
                      style={{ backgroundColor: Template?.color }}
                    ></span>
                  </p>
                </div>
              </div>
              <div className="row mt-43">
                <div className="col-5">
                  <p className="text-silver-mauve f-14 fw-600 mb-2">
                    Unique Features
                  </p>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: Template?.uniqueFeatures,
                    }}
                    className="text-silver-mauve f-14 my-2"
                  ></p>
                </div>
                <div className="col-5">
                  <p className="text-silver-mauve f-14 fw-600 mb-2">
                    Key of contents
                  </p>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: Template?.keyofcontents,
                    }}
                    className="text-silver-mauve f-14 my-2"
                  ></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default TemplateDetail;
