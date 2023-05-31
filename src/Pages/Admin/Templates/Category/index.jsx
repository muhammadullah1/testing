import React from "react";
import TitleInput from "../../../../Components/Common/TitleInput";
import DeleteButton from "../../../../Components/Common/DeleteButton";
import TitleAction from "../../../../Components/Common/TitleAction";
import { Link, useNavigate } from "react-router-dom";
import { Button, Spin } from "antd";
import { ReactComponent as EditIcon } from "../../../../assets/images/Icons/edit-icon.svg";
import useAPIRequestHook from "../../../../CustomHook/ApiRequestHook";
import DataTable from "react-data-table-component";
import TableComponent from "../../../../Components/Common/Antd/TableComponent";

function CategoryTab() {
  const navigate = useNavigate();
  //====================
  //      Query
  //====================
  const {
    filter,
    isLoading,
    data: CategoryData,
    handlePageChange,
    handleSearch,
    handlePerRowsChange,
  } = useAPIRequestHook("Categories", "CategoryTable");

  const handleRowClick = (row) => {
    navigate(`/admin/category/detail/${row.id}`);
  };


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

      selector: (row) => "ST-" + row.id,
    },
    {
      name: <TitleInput onChange={handleSearch} name={"Name"} />,

      selector: (row) => row.name,
    },

    {
      name: "Description",
      width: "300px",
      selector: (row) => row.description,
    },
    {
      name: "No of Templates",

      selector: (row) => row.nooftemplates,
    },
    {
      name: <TitleAction />,
      selector: (row) => (
        <div className="mx-3 gap-3 d-flex align-items-center">
          <Link type="ghost" to="/admin/category/create" state={row}>
            <EditIcon />
          </Link>
          <DeleteButton
            apiEndpoint={"Categories/DeleteCategory/" + row.id}
            queryKey="CategoryTable"
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="custom-card-header ">
        <div>
          <h2 className="f-18 text-primary fw-500">
            List of all Categories ({CategoryData?.totalRecords})
          </h2>
          <p className="text-muted f-12 my-1">
            Update your Category detail and manage them directly
          </p>
        </div>
        <Button
          className="primary--btn"
          onClick={() => navigate(`/admin/category/create`)}
        >
          + Add New
        </Button>
      </div>

      {/* <DataTable
        columns={columns}
        data={CategoryData?.data}
        progressPending={isLoading}
        progressComponent={
          <>
            <Spin />
          </>
        }
        pagination={true}
        paginationServer
        persistTableHead={true}
        paginationTotalRows={CategoryData?.totalRecords}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        onRowClicked={handleRowClick}
      /> */}

      <TableComponent
        data={CategoryData?.data}
        columns={columns}
        totalRecords={CategoryData?.totalRecords}
        isLoading={isLoading}
        handlePerRowsChange={handlePerRowsChange}
        handlePageChange={handlePageChange}
        handleRowClick={handleRowClick}
        paginationRowsPerPageOptions={CategoryData?.totalRecords <= 30 ? [10, 15, 20, 25, 30] : [10, 15, 20, 25, 30, CategoryData?.totalRecords]}

      />
    </>
  );
}

export default CategoryTab;
