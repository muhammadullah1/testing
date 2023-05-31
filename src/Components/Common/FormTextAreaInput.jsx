import React from 'react';
import { Form, Input } from "antd";
import { ValidationRules } from '../../Constants/validationRules';

function FormTextAreaInput({ name = "", label = "", placeholder = "", rows = "",
    isArabicRule = false, maxLength = 1000
}) {
    return (
        <Form.Item
            label={label}
            name={name}
            rules={[
                ValidationRules(name).RequiredRule,
                isArabicRule && ValidationRules(name).ArabicRule,
                {
                    max: maxLength,
                    message: `Value should be less than ${maxLength} character`,
                },
            ]}
        >
            <Input.TextArea className={"primary-input w-100"} placeholder={placeholder} rows={rows.length > 0 ? rows : "5"} />
        </Form.Item>
    );
}

export default FormTextAreaInput;
