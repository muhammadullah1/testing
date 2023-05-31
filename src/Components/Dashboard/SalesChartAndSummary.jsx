import React, { useEffect, useState } from "react";
import { Column } from "@ant-design/plots";
import { Button, Skeleton } from "antd";
import SalesIcon from "../../assets/images/Icons/coins.png";
import CategroiesIcon from "../../assets/images/Icons/categories.svg";
import TemplatesIcon from "../../assets/images/Icons/templates.svg";
import { apiClient } from "../../utils/AxiosInstance";
import { useQuery } from "@tanstack/react-query";
import TotalCount from "./TotalCount";

const SalesChartAndSummary = () => {
  const [activeBtn, setActiveBtn] = useState(0);
  const [totalCount, setTotalcount] = useState([]);
  const icons = [SalesIcon, TemplatesIcon, CategroiesIcon];

  const { isLoading, data, refetch } = useQuery(
    ["PurchasedTemplates", activeBtn],
    async () => {
      let timeRange;
      // set the timeRange and month parameters based on the active button
      if (activeBtn === 0) {
        timeRange = 2;
      } else {
        timeRange = 3;
      }
      // call the API with the appropriate parameters
      const { data } = await apiClient.get(
        `DashBoard/PurchasedTemplates?timeRange=${timeRange}`
      );
      // return the data from the API response
      return data;
    },
    { cacheTime: 0 }
  );

  const handleBtnClick = (btnIndex) => {
    // set the active button based on the button index
    setActiveBtn(btnIndex);
  };

  useEffect(() => {
    apiClient.get("DashBoard/GetAllCount").then(({ data }) => {
      const totalCountArray = Object.entries(data).map(([key, value]) => ({ key, value }));
      setTotalcount(totalCountArray);
    });
  }, []);

  // console.log("total count PurchasedTemplates?timeRange=3", data);
  console.log("total count PurchasedTemplates?timeRange=3", activeBtn);


  const SalesChart = () => {
const fetchData = activeBtn === 1 ? data && data.map((item) => {
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  return {
    action: monthNames[item.month - 1],
    pv: item.purchasedTemplates.length > 0 ? item.purchasedTemplates[0].totalPrice : 0
  };
}) : data && data.map((item) => {
  const dayNames = [
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
  ];

  return {
    action: dayNames[item.dayOfWeek],
    pv: item.purchasedTemplates.reduce((total, template) => total + template.totalPrice, 0)
  };
});

    const config = {
      data : fetchData,
      xField: "action",
      yField: "pv",
      height: 296,
      autoFit: true,
      color: "#8BEEE0",
      conversionTag: false,
      xAxis: {
        label: {
          autoHide: false,
          autoRotate: false,
        },
      },
    };
    return (
      <Column
  
        {...config}
      />
    );
  };


  return (
    <div className="row align-items-center ">
      <div className="col-8 card-wrapper " style={{ height: "428px" }}>
        <div className="header pt-3 px-3 pb-2  border-bottom-settings d-flex justify-content-between align-items-center">
          <h6 className="f-16 fw-500">Sales </h6>
          <div className="d-flex gap-2">
          <Button
              className={`chart-btns ${activeBtn === 0 && "c_b-active"}`}
              type="ghost"
              onClick={() => handleBtnClick(0, "week")}
            >
              Weekly
            </Button>
            <Button
              className={`chart-btns ${activeBtn === 1 && "c_b-active"}`}
              type="ghost"
              onClick={() => handleBtnClick(1)}
            >
              Monthly
            </Button>
          </div>
        </div>
        <div className="p-15-22px">
          { isLoading ? 
           <Skeleton active />
          :  
          <SalesChart />
        }
        </div>
      </div>
      <div className="col-4 summary-info_content">
      <TotalCount totalCount={totalCount} icons={icons}/>
      </div>
    </div>
  );
};

export default SalesChartAndSummary;