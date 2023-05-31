import React from "react";
import { Form, Input } from "antd";
import { ValidationRules } from "../../Constants/validationRules";

function FormTextInput({
    name = "",
    label = "",
    placeholder = "",
    isArabicRule = false,
    isEmail = false,
    rules,
    isPhoneNumber = false,
    ...rest
}
) {
    return (
        <Form.Item label={label} name={name}
            rules={[
                ValidationRules(name).RequiredRule,
                isArabicRule && ValidationRules(name).ArabicRule,
                isEmail && ValidationRules().isEmail,
                isPhoneNumber && ValidationRules().PhoneFormat
            ]}
        >
            <Input
                className={"primary-input w-100 input-field"}
                style={{height: "40px"}}
                placeholder={placeholder}
                {...rest}
            />
        </Form.Item>
    );
}

export default FormTextInput;
