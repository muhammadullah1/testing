import React from "react";
import { Button, Form, Input, Select, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
// import ResponseComponent from "../../../Components/Common/ResponseComponent";
// import { formatErrors } from "../../../Constants/global";
// import { useLanguage } from '../../../Constants/LanguageContext';

function ForgetPassword() {
    // const changeLanguage = useLanguage();
    // const { language, updateLanguage, t } = changeLanguage;
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const onFinish = (values) => {
        navigate('/admin/passwordresetLink')
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="login-wrapper">
            <div className="login-header">
                <Select
                    defaultValue="English"
                    className="select-lang"
                    bordered={false}
                >
                    <Select.Option value="en">English</Select.Option>
                    <Select.Option value="ar">عربي</Select.Option>
                </Select>
            </div>
            <div className="login-body">
                <div className="flex justify-content-center">
                    <div className="login-heading">
                        <h1 className={"text-center f-47 fw-700"}>Al Hayat Residencia</h1>
                    </div>
                </div>

                <div className="login-card" style={{ height: "310px" }}>
                    <p className={"text-center f-16 fw-500 text-primary"}>
                        Reset Password
                    </p>
                    <p className={"text-center f-14 text-secondary"}>
                        Enter credentials to get access
                    </p>
                    {/* <ResponseComponent /> */}
                    <Form className={"mt-30"} form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input email"
                                },
                            ]}
                        >
                            <Input placeholder="Email" className="border-radius-set"/>
                        </Form.Item>
                        <div className="text-center mx-auto">
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="password-reset-btn text-center"
                            >
                                Reset Password
                            </Button>
                        </div>
                    </Form>

                    <Link to="/admin/login"
                        href="/#"
                        className="f-12 forgot-password mt-4"
                    >
                        Go to login
                    </Link>
                </div>

                <div className="login-footer sticky-bottom">
                    <p className="text-center f-16">
                        All rights reserved by Al - Hayat Residencia
                    </p>
                </div>
            </div>
        </div>
    );
};
export default ForgetPassword;