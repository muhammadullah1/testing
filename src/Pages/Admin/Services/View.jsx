import React from "react";
import BackButton from "../../../Components/Common/BackButton";
import BreadCrumbCommon from "../../../Components/Common/BreadCrumbCommon";
import DeleteButton from "../../../Components/Common/DeleteButton";
import editicon from "../../../assets/images/Icons/edit-icon.svg";
import Layout from "../../../Layout/Admin/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiClient } from "../../../utils/AxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { Skeleton, message } from "antd";
import IndividualDeleteButton from "../../../Components/Common/IndividualDeleteButton";

function ViewService() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, data, error } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data } = await apiClient.get(`Services/${id}`);
      return data;
    },
    cacheTime: 0,
  });

  console.log(data);

  if (error) {
    navigate('/admin/services');
    message.error(error.response.data.title)
  };
  return (
    <Layout activePage={'Services'}>
      <BackButton />
      <BreadCrumbCommon crumbs={['Services', 'View Services']} />
      <div className={"card-wrapper"}>
        <div className="custom-card-header">
          <div>
            <p className={"text-secondary f-18 fw-500"}>
              {'Service Details'}
            </p>
            <p className={"text-muted f-12"}>
              {'Update or change the Service information'}
            </p>
          </div>
          <div className="d-flex justify-content-end gap-3 align-items-center ">
            <Link
              to={`/admin/services/${id}/edit`}
            >
              <img
                className="icon-13 mr-15 action-edit-icon"
                src={editicon}
                alt="Edit"
              />
            </Link>
            <IndividualDeleteButton
              name={`/Services/DeleteServices/${id}`}
              navigateTo={'/admin/services'}
            />
          </div>
        </div>
        {isLoading ? (
          <div className="p-4">
            <Skeleton active />
          </div>
        ) : (
          <div className="mb-3 p-4">
            <div className="row g-4">
              <div className="col-md-3">
                <img src={data && data?.imageUrl} className="img-fluid rounded" alt="imagenotfound" width={400} />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title ">{data && data.name}</h5>
                  <p className="card-text text-muted my-2">Price :<small className="text-muted f-14 px-2">{data && data.price}</small>SAR</p>
                  <p className="card-text mt-3">{data && data.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
export default ViewService;
