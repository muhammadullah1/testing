import React, { useEffect, useState } from "react";
import TitleInput from "../../../Components/Common/TitleInput";
import DeleteButton from "../../../Components/Common/DeleteButton";
import TitleAction from "../../../Components/Common/TitleAction";
import { useNavigate } from "react-router-dom";
import HeaderOnly from "../../../Components/Common/HeaderOnly";
import TitleDropdown from "../../../Components/Common/TitleDropdown";
import DataTable from "react-data-table-component";
import useAPIRequestHook from "../../../CustomHook/ApiRequestHook";
import { Spin } from "antd";
import { apiClient } from "../../../utils/AxiosInstance";
import TableComponent from "../../../Components/Common/Antd/TableComponent";

function IndividualRequest({ id, name }) {
  const navigate = useNavigate();
  const [CategoryList, setCategoryList] = useState([]);
  const options = ["All"];

  const {
    filter,
    isLoading,
    data: TabsTableData,
    handlePageChange,
    handleSearch,
    handlePerRowsChange,
  } = useAPIRequestHook(`Requests/Get/${id}`, `${id}`);

  const columns = [
    {
      name: "#",
      width: "5%",
      selector: (row) => "#",
    },
    {
      name: <TitleInput onChange={handleSearch} name={"ID"} />,
      width: "20%",
      selector: (row) => row.id,
    },
    {
      name: <TitleInput onChange={handleSearch} name={"Customer Name"} />,
      width: "15%",
      selector: (row) => row.customerName,
    },
    {
      name: (
        <TitleDropdown
          name={"Category"}
          initial_value={"All"}
          options={options}
        />
      ),
      width: "25%",
      selector: (row) => row.category,
    },
    {
      name: "Status",
      width: "20%",
      selector: (row) => row.requestStatus,
    },
    {
      name: <TitleAction />,
      selector: (row) => (
        <div className="my-2 d-flex align-items-center">
          <DeleteButton
            apiEndpoint={"Requests/DeleteRequest/" + row.id}
            queryKey={`${id}`}
          />
        </div>
      ),
    },
  ];

  const handleRowClick = (row) => {
    navigate(`/admin/requests/${row.id}`);
  };

  useEffect(() => {
    apiClient.get("Templates/GetCategoryDropdownList").then(({ data }) => {
      setCategoryList(data);
    });
  }, []);
  CategoryList.forEach((item) => options.push(item.categoryName));

  return (
    <>
      <HeaderOnly
        title={`List of all ${name} requests (${TabsTableData?.totalRecords})`}
        subTitle={"View and manage your requests directly"}
      />

      <TableComponent
        data={TabsTableData?.data}
        columns={columns}
        totalRecords={TabsTableData?.totalRecords}
        isLoading={isLoading}
        handlePerRowsChange={handlePerRowsChange}
        handlePageChange={handlePageChange}
        handleRowClick={handleRowClick}
        paginationRowsPerPageOptions={TabsTableData?.totalRecords <= 30 ? [10, 15, 20, 25, 30] : [10, 15, 20, 25, 30, TabsTableData?.totalRecords]}

      />
    </>
  );
}

export default IndividualRequest;
