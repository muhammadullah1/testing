import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { apiClient } from "../utils/AxiosInstance";
import { PageSize } from "../Constants/global";

function useAPIRequestHook(url = "", queryKey = "") {
  const [filter, setFilter] = useState({
    current: 1,
    pageSize: PageSize,
    search: "",
    order: "descend",
  });

  const [FilteredData, setFilteredData] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: [queryKey, filter],

    queryFn: async () => {
      const { data } = await apiClient.get(url, { params: filter });
      return data;
    },
  });

  const handleSearch = ({ target }) => {
    setFilter({ ...filter, current: 1, search: target.value });
  };

  const handlePageChange = (page) => {
    console.log(page, "is the api hook hello");
    setFilter({
      ...filter,
      current: page,
    });
  };
  // const handlePerRowsChange = async (newPerPage, page) => {
  //   console.log(page,'newPerPage is the api hook hello', newPerPage)
  //   setFilter({
  //     ...filter,
  //     current: page,
  //     pageSize: newPerPage,
  //   });
  // };

  //   useEffect(() => {
  //     if (data?.data?.length > 0) {
  //       const { current, pageSize } = filter;
  //       const getData = data.data;
  //       const finaldata = getData?.map((el, index) => {
  //         return { ...el, sno: (current - 1) * pageSize + index + 1 };
  //       });

  //       setFilteredData({ ...data, data: finaldata });
  //     }
  //   }, [data]);
  const handlePerRowsChange =  (newPerPage, page) => {
    console.log(newPerPage, page);
    setFilter({ ...filter, pageSize: newPerPage });
  };
  return {
    filter,
    setFilter,
    data,
    // data: FilteredData,
    isLoading,
    handleSearch,
    handlePageChange,
    handlePerRowsChange
  };
}

export default useAPIRequestHook;

// const CalculateSerialNo = (index) => {
//     const { current, pageSize } = filter;
//     return (current - 1) * 10 + index + 1;
//   };
