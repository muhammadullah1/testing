import { Spin } from "antd";
import React from "react";
import DataTable from "react-data-table-component";

function TableComponent({
  columns = [],
  data = [],
  isLoading = false,
  totalRecords = 0,
  handlePerRowsChange,
  handlePageChange,
  handleRowClick,
  paginationRowsPerPageOptions
}) {
  
  return (
    <DataTable
      columns={columns}
      data={data}
      progressPending={isLoading}
      progressComponent={
        <>
          <Spin />
        </>
      }
      pagination={true}
      paginationServer
      persistTableHead={true}
      paginationTotalRows={totalRecords}
      onChangeRowsPerPage={handlePerRowsChange}
      onChangePage={handlePageChange}
      onRowClicked={handleRowClick}
      paginationRowsPerPageOptions={paginationRowsPerPageOptions}
    />
  );
}

export default TableComponent;
