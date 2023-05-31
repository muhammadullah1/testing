import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { apiClient } from "../utils/AxiosInstance";
import { PageSize } from "../Constants/global";

function useTemplateFilterHook(url = "", queryKey = "") {
  const [filter, setFilter] = useState({
    categoryId: "",
    TemplateName: "",
    filter: 1,
    toPrice: "",
    fromPrice: "",
    color: "",
  });


  const { data, isLoading } = useQuery({
    queryKey: [queryKey, filter],

    queryFn: async () => {
      const { data } = await apiClient.get(url, { params: filter });
      return data;
    },
    onError: (err)=>{
        console.log(err,'are query error')
    }
  });

  const handleSearch = ({ target }) => {
    setFilter({ ...filter, search: target.value });
  };

  

  return {
    filter,
    setFilter,
    data,
    isLoading,
    handleSearch,
    
  };
}

export default useTemplateFilterHook;
