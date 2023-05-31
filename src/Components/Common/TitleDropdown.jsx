import React from 'react';
import { Select } from "antd";

function TitleDropdown({ name, initial_value, options = [], Options_Objects = false }) {

    return (
        <div className={"py-2"}>
            <p className={"f-14 fw-600  mb-15"}>
                {name}
            </p>
            <Select defaultValue={initial_value}
                style={{
                    minWidth: "150px",
                }} className="input-field">
                {options.map((option, index) => (
                    <Select.Option key={index} value={Options_Objects ? option?.value : option}>{Options_Objects ? (option?.label) : (option)}</Select.Option>
                ))}
            </Select>
        </div>
    );
}

export default TitleDropdown;
