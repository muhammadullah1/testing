import React from "react";
import BackButton from "../../../Components/Common/BackButton";
import BreadCrumbCommon from "../../../Components/Common/BreadCrumbCommon";
import Layout from "../../../Layout/Admin/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Select, message } from "antd";
import DetailRow from "../../../Components/Common/DetailRow";
import DetailSection from "../../../Components/Common/DetailSection";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../utils/AxiosInstance";
import IndividualDeleteButton from "../../../Components/Common/IndividualDeleteButton";

function RequestDetail(props) {
  const navigate = useNavigate();
  const { id } = useParams();


  const { isLoading, data, refetch } = useQuery({
    queryKey: ["allservices"],
    queryFn: async () => {
      const { data } = await apiClient.get(`Requests/${id}`);
      return data;
    }
  });

  console.log("rqeuat details: ", data)

  const CustomerInfo = () => {
    return (
      <DetailSection heading="Customer Information">
        <DetailRow label="Name :" value={data && data?.customerName} />
        <DetailRow label="Email :" value={data && data?.email} />
        <DetailRow label="Category :" value={data && data?.categoryName} />
        <DetailRow label="Reference link :" value={data && data?.reference_template_link} />
        <DetailRow label="Phone No :" value={data && data?.phoneNumber} />
      </DetailSection>
    )
  };

  const columnsData = [
    {
      title: 'Unique feature',
      text: data && data?.unique_features.split(' ').map((text) => text.trim()),
    },
    {
      title: 'Key of contents',
      text: data && data?.keyofcontents.split(' ').map((text) => text.trim()),
    },
  ];
  const deleteServiceMutation = useMutation(
    (requestData) =>
      apiClient.post(`Requests/ChangeRequestStatus/${requestData.id}?requestStatus=${requestData.status}`),
    {
      onSuccess: () => {
        message.success("Request Updated Successfully");
        refetch();
      },
    }
  );
  const handleStatusChange = (value) => {
    const requestData = { id: id, status: value };
    deleteServiceMutation.mutate(requestData);
  };
  

  return (
    <Layout activePage={'Requests'}>
      <BackButton />
      <BreadCrumbCommon crumbs={['Requestss', 'Requests details']} />
      <div className={"card-wrapper"}>
        <div className="custom-card-header">
          <div>
            <p className={"f-18 fw-500"}>
              {'Requests Details'}
            </p>
            <p className={"text-muted f-12"}>
              {'View and manage your requests directly'}
            </p>
          </div>
          <div className="d-flex justify-content-end gap-3 align-items-center">
            {data && data?.requestStatus !== 'Completed'
              ?
              <>
                <span className="text-text-muted f-14">Status:</span>
                <Select
                  defaultValue={data && data?.requestStatus}
                  style={{
                    width: 120,
                  }}
                  onChange={handleStatusChange}
                  options={[
                    {
                      value: 0,
                      label: 'Pending',
                    },
                    {
                      value: 1,
                      label: 'Inprogress',
                    },
                    {
                      value: 2,
                      label: 'Completed',
                    },
                  ]}
                />
                {data.requestStatus === 'Inprogress' ?
                  <Button className='warning--btn' onClick={() => navigate(`/admin/requests/${id}/deliver`)}>Deliver</Button>
                  : ' '}
              </>
              : ' '}

            <IndividualDeleteButton
              name={`Requests/DeleteRequest/${id}`}
              navigateTo={'/admin/requests'}
            />
          </div>
        </div>
        <div className={"custom-card-body"}>
          <div className="row justify-content-evenly">
            <div key={data && data.id} className="col my-2">
              <img src={data && data.referenceImage} alt="picshow" className="img-fluid rounded" width={400} />
            </div>
          </div>
        </div>
      </div>

      <div className={"card-wrapper mt-4"}>
        <div className={"custom-card-body"}>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <CustomerInfo />
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-lg-8 col-md-8 col-sm-12">
              <h3 className="f-18">Description</h3>
              <p className="f-14 mt-2 text-silver-mauve">{data && data?.description}</p>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="row">
                {data && columnsData.map((columnData, index) => (
                  <div className="col" key={index}>
                    <p className="f-18 text-primary">{columnData.title}</p>
                    {columnData.text.map((text, index) => (
                      <p className="f-14 mt-2 text-silver-mauve" key={index}>
                        {text}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default RequestDetail;
