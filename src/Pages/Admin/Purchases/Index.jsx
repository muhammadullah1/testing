import React from "react";
import TitleInput from "../../../Components/Common/TitleInput";
import { useNavigate } from "react-router-dom";
import Layout from "../../../Layout/Admin/Layout";
import HeaderOnly from "../../../Components/Common/HeaderOnly";
import BackButton from "../../../Components/Common/BackButton";
import BreadCrumbCommon from "../../../Components/Common/BreadCrumbCommon";
import useAPIRequestHook from "../../../CustomHook/ApiRequestHook";
import TableComponent from "../../../Components/Common/Antd/TableComponent";

function PurchasesList() {
  const navigate = useNavigate();

  const {
    filter,
    isLoading,
    setFilter,
    data: PurchaseData,
    handlePageChange,
    handleSearch,
    handlePerRowsChange,
  } = useAPIRequestHook(`Purchase`, `Purchase`);

  const columns = [
    {
      name: "#",
      width: "5%",
      selector: (row) => row.s_no,
    },
    {
      name: <TitleInput onChange={handleSearch} name={"Purchase ID"} className="mb-15" />,
      width: "20%",
      selector: (row) => row.purchaseId,
    },
    {
      name: <TitleInput onChange={handleSearch} name={"Customer Name"} />,
      width: "20%",
      selector: (row) => row.customerName,
    },
    {
      name: "Customer Email",
      width: "25%",
      selector: (row) => row.email,
    },
    {
      name: <TitleInput onChange={handleSearch} name={"Template Name"} />,
      width: "20%",
      selector: (row) => row?.templateName,
    },
    {
      name: "Amount",
      width: "10%",
      selector: (row) => row.price,
    },
  ];
  const handleRowClick = (row) => {
    navigate(`/admin/purchases/${row.id}`);
  };

  return (
    <Layout activePage={"Purchases"}>
      <BackButton />
      <BreadCrumbCommon crumbs={["Purchases"]} />
      <div className={"card-wrapper"}>
        <HeaderOnly
          title={"List of all List of all Purchases"}
          subTitle={"View and manage your requests directly"}
        />

        <TableComponent
          data={PurchaseData?.data}
          columns={columns}
          totalRecords={PurchaseData?.totalRecords}
          isLoading={isLoading}
          handlePerRowsChange={handlePerRowsChange}
          handlePageChange={handlePageChange}
          handleRowClick={handleRowClick}
          paginationRowsPerPageOptions={PurchaseData?.totalRecords <= 30 ? [10, 15, 20, 25, 30] : [10, 15, 20, 25, 30, PurchaseData?.totalRecords]}

        />
      </div>
    </Layout>
  );
}
export default PurchasesList;
