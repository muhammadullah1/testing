import React from "react";
import { Button, Form, Input, Select, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

// import ResponseComponent from "../../../Components/Common/ResponseComponent";
// import { formatErrors } from "../../../Constants/global";
// import { useLanguage } from '../../../Constants/LanguageContext';
function LoginOtp() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleOtpLogin = () => {
        message.success("login successfully");
        navigate("/admin/dashboard");
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
            <div className="login-body">
                <div className="flex justify-content-center">
                    <div className="login-heading">
                        <h1 className={"text-center f-47 fw-700"}>Al Hayat Residencia</h1>
                    </div>
                </div>

                <div className="login-card" style={{ height: "310px" }}>
                    <p className={"text-center f-16 fw-500 text-primary"}>
                        ENTER OTP
                    </p>
                    <p className={"text-center f-14 text-secondary mt-2"}>
                        sent to your phone number
                    </p>
                    {/* <ResponseComponent /> */}
                    <Form className={"mt-30"} form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                        {/* <Form.Item
                            name="otp"
                            rules={[
                                {
                                    required: true,
                                    message: "Enter OTP"
                                },
                            ]}
                        >
                            <Input placeholder='X' className="border-radius-set" />
                        </Form.Item> */}
                        <div className="d-flex justify-content-between w-75 mx-auto">
                            <Form.Item
                                name="otp1"
                                rules={[{ required: true, message: 'required' }]}
                            >
                                <Input  placeholder="X" maxLength={1} className="otp-input"/>
                            </Form.Item>
                            <Form.Item
                                name="otp2"
                                rules={[{ required: true, message: 'required' }]}
                            >
                                <Input  placeholder="X" maxLength={1} className="otp-input"/>
                            </Form.Item>
                            <Form.Item
                                name="otp3"
                                rules={[{ required: true, message: 'required' }]}
                            >
                                <Input  placeholder="X" maxLength={1} className="otp-input"/>
                            </Form.Item>
                            <Form.Item
                                name="otp4"
                                rules={[{ required: true, message: 'required' }]}
                            >
                                <Input placeholder="X" maxLength={1} className="otp-input"/>
                            </Form.Item>
                        </div>
                        <div className="text-center">
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="otp-btn-submit mt-3"
                                onClick={handleOtpLogin}
                            >
                                Submit
                            </Button>
                        </div>
                    </Form>
                    <div className="d-flex justify-content-between">
                        <Button type="link"
                            className={"f-12 text-decoration-none forgot-password"}
                            style={{ color: "#8186CC" }}
                        >
                            Resend OTP
                        </Button>
                        <Link
                           to="/admin/login"
                            className={"f-12 text-decoration-none forgot-password pt-2 mx-3"}
                            style={{ color: "#8186CC" }}

                        >
                            Go to login
                        </Link>
                    </div>
                </div>
            </div>
            <div className="login-footer sticky-bottom">
                <p className={"text-center f-16"}>
                    All rights reserved by Al - Hayat Residencia
                </p>
            </div>
        </div>
    );
}

export default LoginOtp;
