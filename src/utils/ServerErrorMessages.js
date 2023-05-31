import { message } from "antd";

/**
 * Returns error message to show on the page.
 * @param {data} is an object that contains array
 * @returns a Toast message
 */
export const ServerErrorMessage = (data) => {
  return Object.keys(data).map((el) => message.error(data[el][0]));
};
