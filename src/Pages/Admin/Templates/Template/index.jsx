import React from "react";
import TitleInput from "../../../../Components/Common/TitleInput";
import DeleteButton from "../../../../Components/Common/DeleteButton";
import TitleAction from "../../../../Components/Common/TitleAction";
import { Link, useNavigate } from "react-router-dom";
import useAPIRequestHook from "../../../../CustomHook/ApiRequestHook";
import { ReactComponent as EditIcon } from "../../../../assets/images/Icons/edit-icon.svg";
import { Button, Spin } from "antd";
import TableComponent from "../../../../Components/Common/Antd/TableComponent";

function TemplateTab() {
  const navigate = useNavigate();

  //====================
  //      Query
  //====================
  const {
    filter,
    isLoading,
    setFilter,
    data: TemplateData,
    handlePageChange,
    handleSearch,
    handlePerRowsChange
  } = useAPIRequestHook("Templates", "TemplatesTable");

  const columns = [
    {
      name: "#",
      width: "50px",
      selector: (row) => "#",
    },
    {
      name: (
        <TitleInput onChange={handleSearch} name={"ID"} className="mb-15" />
      ),

      selector: (row) => "TID-" + row.id,
    },
    {
      name: <TitleInput onChange={handleSearch} name={"Name"} />,

      selector: (row) => row.name,
    },
    {
      name: <TitleInput onChange={handleSearch} name={"Category"} />,

      selector: (row) => row.category,
    },
    {
      name: "Price",

      selector: (row) => row.price,
    },
    {
      name: "No. of Purchases",

      selector: (row) => row.noOfPurchase,
    },
    {
      name: <TitleAction />,
      selector: (row) => (
        <div className="mx-3 gap-3 d-flex align-items-center">
          <Link type="ghost" to="/admin/template/create" state={row}>
            <EditIcon />
          </Link>
          <DeleteButton apiEndpoint={'Templates/DeleteTemplates/'+row.id} queryKey="TemplatesTable" />
        </div>
      ),
    },
  ];

  const handleRowClick = (row) => {
    navigate(`/admin/template/detail/${row.id}`);
  };

  
  return (
    <>
      <div className="custom-card-header ">
        <div>
          <h2 className="f-18 text-primary fw-500">
            List of all Templates ({TemplateData?.totalRecords})
          </h2>
          <p className="text-muted f-12 my-1">
            Update your Category detail and manage them directly
          </p>
        </div>
        <Button
          className="primary--btn"
          onClick={() => navigate(`/admin/template/create`)}
        >
          + Add New
        </Button>
      </div>
      <TableComponent
        data={TemplateData?.data}
        columns={columns}
        totalRecords={TemplateData?.totalRecords}
        isLoading={isLoading}
        handlePerRowsChange={handlePerRowsChange}
        handlePageChange={handlePageChange}
        handleRowClick={handleRowClick}
        paginationRowsPerPageOptions={TemplateData?.totalRecords <= 30 ? [10, 15, 20, 25, 30] : [10, 15, 20, 25, 30, TemplateData?.totalRecords]}

      />
    </>
  );
}

export default TemplateTab;
