import { message } from "antd";
import React from "react";
import { useSelector } from "react-redux";

function CheckIsAuthenticate(authState) {
  if (authState.user) {
    if (authState.user.role === "customer") {
      return true;
    } else {
      message.error("You need to login First.");
      return false;
    }
  } else {
    return false;
  }
}

export default CheckIsAuthenticate;
