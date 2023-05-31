import React from "react";
import { Button, Form, Input, Select, message } from "antd";
// import ResponseComponent from "../../../Components/Common/ResponseComponent";
// import { formatErrors } from "../../../Constants/global";
import { confirmRule } from "../../../Constants/validationRules";
// import { useLanguage } from '../../../Constants/LanguageContext';

function PasswordReset({ token }) {
    // const changeLanguage = useLanguage();
	// const { language, updateLanguage, t } = changeLanguage;
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Success:', values);
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    return (
        <div className={"login-wrapper"}>
            <div className="login-header">
                <Select
                    defaultValue={"English"}
                    className="select-lang"
                    bordered={false}
                >
                    <Select.Option value="en">English</Select.Option>
                    <Select.Option value="ar">عربي</Select.Option>
                </Select>
            </div>
            <div className="login-body" style={{ height: "318px" , marginTop: "120px"}}>
                <div className="flex justify-content-center">
                <div className="login-heading">
                     <h1 className={"text-center f-47 fw-700"}>Al Hayat Residencia</h1>
                </div>
                </div>

                <div className="login-card">
                    <p className={"text-center f-16 fw-500 text-primary"}>
                        Update your password
                    </p>
                    <p className={"text-center f-14 text-secondary mt-2"}>
                        Information must be kept secret
                    </p>
                    {/* <ResponseComponent /> */}
                    <Form className={"mt-30"} form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                        <Form.Item
                            name="new_password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input New Password',
                                },
                            ]}
                        >
                            <Input.Password placeholder='New Password' className="border-radius-set"/>
                        </Form.Item>
                        <Form.Item
                            name="confirm_password"
                            rules={confirmRule(
                                'The two email that you entered do not match!',
                                'new_password'
                            )}
                        >
                            <Input.Password placeholder='Confirm Password' className="border-radius-set"/>
                        </Form.Item>

                        <Button
                            type="primary"
                            htmlType="submit"
                            className="btn-submit mt-3"
                            block
                        >
                            Save & Update
                        </Button>
                    </Form>
                </div>
            </div>
            <div className="login-footer sticky-bottom">
                    <p className="text-center f-16">
                        All rights reserved by Al - Hayat Residencia
                    </p>
                </div>
        </div>
    );
}

export default PasswordReset;
