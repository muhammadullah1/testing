import React, { useState } from "react";
import { Button, Form, Radio, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import FormTextInput from "../../../Components/Common/FormTextInput";
import FormPassword from "../../../Components/Common/FormPassword";
import LoginBg from "../../../assets/images/auth/loginBg.png";
import Loginprime from "../../../assets/images/SVGS/loginprime.svg";
import Apple from "../../../assets/images/PNGS/apple.png";
import Login_with_Google from "../../../Components/Common/Auth/Login_with_Google";
import { useDispatch } from "react-redux";
import { userLogin } from "../../../store/slicers/authSlice";
import { ServerErrorMessage } from "../../../utils/ServerErrorMessages";
import { CommonLoginAPI } from "./CommonLoginAPI";
import Prime from './../../../assets/images/SVGS/blacklogo.svg'
import LangSelectInput from "../../../Components/Common/LanguageSelectInput";
import { useTranslation } from "react-i18next";

function Login() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [loading, setloading] = useState(false);

  const dispatch = useDispatch();
  const onFinish = async (values) => {
    setloading(true);

    if (value == 0) {
      try {
        const { data } = await CommonLoginAPI("Authentication", values);
        setloading(false);
        dispatch(userLogin(data));
        message.success("login successfully");
        navigate("/");
        // window.location.href = '/'
      } catch ({ response }) {
        setloading(false);

        const { data } = response;
        ServerErrorMessage(data);
      }
    } else {
      try {
        const { data } = await CommonLoginAPI(
          "Authentication/LoginWithPhoneNumber",
          values
        );
        setloading(false);
        navigate("/login/loginbyphone", { state: values },);
      } catch ({ response }) {
        setloading(false);
        const { data } = response;
        ServerErrorMessage(data);
      }
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className={"client-login"}>
      <div className="login-lng-btn">
        <img src={Prime} alt="....." />
        <LangSelectInput/>
      </div>
      <div className="clientlogin-body">
        <div className="bgContents">
          <img className="loginprime" src={Loginprime} alt="" />
          <p className="text-youngNight f-16">
            <img className="sm-bg-imag" src={LoginBg} />
            {t("Welcome back to NAMA! Please log in to access your account and manage your templates with ease.")}
          </p>
          <img className="bg-imag" src={LoginBg} />
        </div>
        <div className="login-card">
          <p className={"text-center f-22 fw-600 text-primary mt-43"}>{t("Login")}</p>
          <p className={"text-center f-14 text-secondary mt-2"}>
          {t('Enter credentials to get access')}
          </p>
          <Form
            layout="vertical"
            className={"mt-30"}
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <div className="radio-buttons">
              <Radio.Group onChange={onChange} value={value}>
                <Radio value={0}>{t("Email")}</Radio>
                <Radio value={1}>{t("Phone Number")}</Radio>
              </Radio.Group>
            </div>

            {value === 0 ? (
              <>
                <FormTextInput
                  type="email"
                  name="username"
                  label={t("Email")}
                  isEmail={true}
                  placeholder="johndoe@gmail.com"
                />
                <FormPassword
                  name="password"
                  label={t("Password")}
                  placeHolder="*********"
                />
              </>
            ) : (
              <>
                <FormTextInput
                  type="Number"
                  name="phoneNumber"
                  label={t("Mobile Number")}
                  placeholder="132456489798"
                  isPhoneNumber={true}
                />
              </>
            )}
            <Button
              type="primary"
              htmlType="submit"
              className="primary--btn mt-3"
              block
              loading={loading}
            >
              {t("Login")}
            </Button>
          </Form>
          <p>{t("or With")}</p>
          <div className="login-icons">
            <Login_with_Google />
            <img src={Apple} alt="" />
          </div>
          <div className="separator">
            <div className="line"></div>
            <p>{t("OR")}</p>
            <div className="line"></div>
          </div>
          <div className="signup-link">
            <p>
            {t("dont have an account")} <Link to="/signup">{t("Signup")}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;