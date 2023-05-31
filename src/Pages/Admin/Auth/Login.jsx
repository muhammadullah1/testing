import React, { useState } from "react";
import { Button, Form, message } from "antd";
import { useNavigate } from "react-router-dom";
import FormTextInput from "../../../Components/Common/FormTextInput";
import FormPassword from "../../../Components/Common/FormPassword";
import LoginBg from "../../../assets/images/auth/loginBg.png";
import { apiClient } from "../../../utils/AxiosInstance";
import { ServerErrorMessage } from "../../../utils/ServerErrorMessages";
import { useDispatch } from "react-redux";
import { userLogin } from "../../../store/slicers/authSlice";

function Login() {
  const [form] = Form.useForm();
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    // navigate("/admin/loginotp");
    setloading(true);
    apiClient
      .post("Authentication", values)
      .then(({ data }) => {
        console.log(data);
        if (data.role === "superadmin") {
          dispatch(userLogin(data));
          message.success("login successfully");
          // window.location.href = "/admin/dashboard";
          navigate("/admin/dashboard");
        } else {
          message.error("Invalid Credentails for Admin Login");
        }
      })
      .catch(({ response }) => {
        const { data } = response;
        ServerErrorMessage(data);
      })
      .finally(() => {
        setloading(false);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className={"login-wrapper"}>
      <div className="login-body">
        <div className="bgContent">
          <p className="text-youngNight f-16">
            Welcome to the NAMA Admin Portal. Please log in to access the
            administrative features and manage the platform.
          </p>
          <img src={LoginBg} />
        </div>
        <div className="login-card">
          <div className="text-center ">
            <h1 className="text-sunRays f-35 fw-600">PRIME</h1>
            <h1 className="f-22 text-youngNight spacedLetter">LEVEL'S</h1>
          </div>
          <p className={"text-center f-22 fw-600 text-primary mt-43"}>
            Admin Login
          </p>
          <p className={"text-center f-14 text-secondary mt-2"}>
            Enter credentials to get access
          </p>
          {/* <ResponseComponent/> */}
          <Form
            layout="vertical"
            className={"mt-30"}
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <FormTextInput
              type="text"
              name="userName"
              label="Email"
              // isEmail={true}
            />
            <FormPassword name="password" label="Password" />
            <Button
              type="primary"
              htmlType="submit"
              className="primary--btn mt-3"
              block
              loading={loading}
            >
              Login
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
