import React from "react";
import { Input } from "antd";

function TitleInput({ name, ...rest }) {
  return (
    <div className={"py-2"}>
      <p className={"f-14 fw-600 mb-15"}>{name}</p>
      <Input
        placeholder={"Search by " + name}
        className="input-field"
        {...rest}
      />
    </div>
  );
}

export default TitleInput;
