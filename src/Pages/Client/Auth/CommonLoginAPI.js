import { apiClient } from "../../../utils/AxiosInstance";

export const CommonLoginAPI = (api, values) => {
  const data = apiClient.post(api, values);
  return data;
};
