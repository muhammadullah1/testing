import { Skeleton } from "antd";
import DataTable from "react-data-table-component";

const customStyles = {
  rows: {
    style: {
      minHeight: "46px", // override the row height
      borderBottom: "1px solid #EEEEEE",
    },
  },
  headCells: {
    style: {
      paddingLeft: "18px", // override the cell padding for head cells
      paddingRight: "18px",
    },
  },
  cells: {
    style: {
      paddingLeft: "28px", // override the cell padding for data cells
      paddingTop: "18px", // override the cell padding for data cells
      paddingBottom: "17px", // override the cell padding for data cells
      paddingRight: "18px",
    },
  },
};

function RecentOrder({ recentOrder, isLoading }) {
  const columns = [
    {
      name: "Id",
      selector: (row) => row.templateName,
      width: "40%",

      style: {
        color: "#707070",
        fontSize: "14px",
      },
    },
    {
      name: "name",
      width: "30%",
      selector: (row) => (
        <div>
          <h5 className="f-14">{row?.customerName}</h5>
        </div>
      ),
      style: {
        color: "#707070",
        fontSize: "14px",
      },
    },

    {
      name: "email",
      selector: (row) => row.email,
      width: "30%",
      style: {
        color: "#707070",
        fontSize: "14px",
      },
    },
  ];
  return (
    <div className="card-wrapper  mt-20 ">
      <h6 className="f-16 text-primary border-bottom-settings p-19-17px mb-3">
        RecentOrder
      </h6>
      {isLoading ? (
        <>
          <div className="p-3">
            <Skeleton active />
          </div>
        </>
      ) : (
        <DataTable
          data={recentOrder && recentOrder}
          noTableHead={true}
          columns={columns}
          customStyles={customStyles}
          noDataComponent="There are no records to display"
        />
      )}
    </div>
  );
}

export default RecentOrder;
