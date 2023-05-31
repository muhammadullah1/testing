import React from "react";
import { Button, Skeleton } from "antd";
import Layout from "../../../Layout/Admin/Layout";
import BreadCrumbCommon from "../../../Components/Common/BreadCrumbCommon";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../../utils/AxiosInstance";
import { useQuery } from "@tanstack/react-query";
import ServiceCard from "../../../Components/Services/ServiceCard";

function Services() {
  const navigate = useNavigate();

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data } = await apiClient.get(`Services`);
      return data;
    },
    cacheTime: 0,
  });

  return (
    <Layout activePage={"Services"}>
      <p className={"f-18 fw-500"} style={{ color: "#161002" }}>
        {"Services"}
      </p>
      <BreadCrumbCommon crumbs={["Services"]} />
      <div className={"card-wrapper"}>
        <div className="custom-card-header ">
          <div>
            <h2 className="f-18 text-primary fw-500">{"Services"}</h2>
            <p className="text-muted f-14">
              {"View and manage your articles directly from here"}
            </p>
          </div>
          <Button className="primary--btn " onClick={() => navigate(`create`)}>
            + Add New
          </Button>
        </div>
        {isLoading ? (
          <div className="p-4">
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </div>
        ) : (
          data &&
          data?.data?.map((service) => (
            <ServiceCard
              key={service.id}
              name={service.name}
              description={service.description}
              price={service.price}
              editLink={`/admin/services/${service.id}/edit`}
              viewLink={`/admin/services/${service.id}/view`}
              img={service?.imageUrl}
              apiEndpoint={`Services/DeleteServices/${service.id}`}
              refetch={refetch}
            />
          ))
        )}
      </div>
    </Layout>
  );
}

export default Services;
