import React from "react";
import { Button, Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import FormTextInput from "../../../Components/Common/FormTextInput";
import FormPassword from "../../../Components/Common/FormPassword";
import LoginBg from "../../../assets/images/auth/loginBg.png";
import Loginprime from "../../../assets/images/SVGS/loginprime.svg";
import Apple from "../../../assets/images/PNGS/apple.png";
import { apiClient } from "../../../utils/AxiosInstance";
import Login_with_Google from "./../../../Components/Common/Auth/Login_with_Google";
import { ServerErrorMessage } from "../../../utils/ServerErrorMessages";
import { useTranslation } from "react-i18next";
import LangSelectInput from "../../../Components/Common/LanguageSelectInput";

function Signup() {
  const { t, i18n } = useTranslation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = (values) => {
    apiClient
      .post("CustomerSignup/CreateCustomer", values)
      .then(({ data }) => {
        console.log("res", data);
        message.success(t("Signup Succesfull"));
        navigate("/login");
      })
      .catch(({ response }) => {
        const { data } = response;
        ServerErrorMessage(data);
      });
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className={"client-signup"} style={{
direction: "ltr"
}}>
      <div className="mx-5 py-3">
        <LangSelectInput />
      </div>
      <div className="clientsignup-body">
        <div className="signup-card">
          <p className={"text-center f-22 fw-600 text-primary mt-43"}>{t("Signup")}</p>
          <p className={"text-center f-14 text-secondary mt-2"}>
            {t("Enter credentials to get access")}
          </p>
          <Form
            layout="vertical"
            className={"mt-30"}
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={ {
              direction : i18n.language === "ar" ? 'rtl' : 'ltr'
            }}
          >
            <FormTextInput
              type="name"
              name="fullName"
              label={t("Full name")}
              placeholder="jhone Doe"
            />
            <FormTextInput
              type="email"
              name="email"
              label={t("Email")}
              isEmail={true}
              placeholder="johndoe@gmail.com"
            />
            <FormPassword
              name="password"
              label={t("Password")}
              placeHolder="*********"
            />
            <FormTextInput
              type="Number"
              name="phoneNumber"
              label={t("Mobile")}
              placeholder="132456489798"
              isPhoneNumber={true}
            />
            <Button
              type="primary"
              htmlType="submit"
              className="primary--btn mt-3"
              block
            >
              {t("Signup")}
            </Button>
            <p>{t("or With")}</p>
            <div className="signup-icons">
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
                {t("dont have an account")} <Link to="/login">{t("Login")}</Link>
              </p>
            </div>
          </Form>
        </div>
        <div className="bgContents-signup">
          <img className="signupprime" src={Loginprime} alt="" />
          <img className="bg-imag" src={LoginBg} />
        </div>
      </div>
    </div>
  );
}

export default Signup;
