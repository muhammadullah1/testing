import React from "react";
import BackButton from "../../../Components/Common/BackButton";
import BreadCrumbCommon from "../../../Components/Common/BreadCrumbCommon";
import Layout from "../../../Layout/Admin/Layout";
import DetailSection from "../../../Components/Common/DetailSection";
import DetailRow from "../../../Components/Common/DetailRow";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../utils/AxiosInstance";
import { useParams } from "react-router-dom";
import { Skeleton } from "antd";

function PurchaseDetail() {
  const { id } = useParams();
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["PurchaseById"],
    queryFn: async () => {
      const { data } = await apiClient.get(`Purchase/PurchaseOrderDetails/${id}`);
      return data;
    }
  });
  const CustomerInfo = () => {
    return (
      <DetailSection heading="Customer Information">
        <DetailRow label="Customer Name :" value={data && data?.customerName} />
        <DetailRow label="Email :" value={data && data?.email} />
        <DetailRow label="Template :" value={data && data?.templateName} />
      </DetailSection>
    )
  };
 console.log("purchaes by id", data)
  return (
    <Layout activePage={'Purchases'}>
      <BackButton />
      <BreadCrumbCommon crumbs={['Purchases', 'Purchases Detail']} />
      <div className={"card-wrapper"}>
        <div className="custom-card-header">
          <div>
            <p className={"text-secondary f-18 fw-500"}>
              {'Purchases Detail'}
            </p>
            <p className={"text-muted f-12"}>
              {'View and manage your requests directly'}
            </p>
          </div>
        </div>
        <div className={"custom-card-body p-3"}>
        {isLoading ? (
          <div className="p-4">
            <Skeleton active />
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12 p-2">
              <CustomerInfo />
            </div>
            <div className="col p-2">
              <div className="border-start p-5">
                <h3 className="text-muted text-start f-16 fw-500 my-1">Amount</h3>
                <p className="text-start f-18 fw-600">{data && data?.price} SAR</p>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </Layout>
  );
}
export default PurchaseDetail;
