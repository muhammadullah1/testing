import React from "react";
import { Button, Form, message } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { useDispatch } from "react-redux";
import Logo from "./../../../assets/images/SVGS/blacklogo.svg";
import homeimg1 from "./../../../assets/images/PNGS/homeimg1.png";
import { Select } from "antd";
import { apiClient } from "../../../utils/AxiosInstance";
import { ServerErrorMessage } from "../../../utils/ServerErrorMessages";
import prime from './../../../assets/images/SVGS/blacklogo.svg'

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

function LoginOtp() {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [otp, setOtp] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const { state } = useLocation();

  const onFinish = async (values) => {
    console.log(otp);
    values = { phoneNumber: state.phoneNumber, otpCode: otp };
    try {
      setIsLoading(true);
      const data = await apiClient.post("Authentication/LoginWithOtp", values);
      navigate('/')
    } catch ({ response }) {
      const { data } = response;
      setIsLoading(false);
      ServerErrorMessage(data);
    }
  };
  const resendOtpp = () => {
    // dispatch(resendOtp(state.state.username)).then((res) => {
    //     setIsLoading(true);
    //     if (res.payload.isValidate) {
    //         setIsLoading(false);
    //         message.success(res.payload.message);
    //     } else {
    //         setIsLoading(false);
    //         message.error(res.payload.errors);
    //     }
    // });
  };

  return (
    <div className="login-otp-wrapper">
      <div className="lng-btn">
        <img src={prime} alt="" />
        <Select
          onChange={handleChange}
          defaultValue={"EN"}
          options={[
            {
              label: "EN",
              value: "EN",
            },
            {
              label: "AR",
              value: "AR",
            },
          ]}
        />
      </div>
      <div className="login-body">
        <div className="login-heading">
          <img className="logo" src={Logo} alt="" />
          <img className="sm-pic" src={homeimg1} alt="" />
          <p className="">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the
          </p>
          <img src={homeimg1} alt="" />
        </div>

        <div className="login-card">
          <p className={"text-center f-22 fw-600 text-primary mt-43"}>
            ENTER OTP
          </p>
          <p className={"text-center f-14 text-secondary mt-2"}>
            sent to your phone number
          </p>
          <Form className={"mt-30"} form={form} onFinish={onFinish}>
            <div className="otp-input justify-content-center mx-auto">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span> </span>}
                renderInput={(props) => <input {...props} />}
                placeholder="XXXX"
                inputStyle={{
                  width: "39px",
                  height: "46px",
                }}
              />
            </div>
            <div className="text-center">
              <Button
                type="primary"
                htmlType="submit"
                className="otp-btn-submit mt-43"
                loading={isLoading}
                disabled={otp.length < 4}
              >
                Login
              </Button>
            </div>
          </Form>
          <p className="f-10 text-start text-danger">{error && errorMessage}</p>
          <div className="links d-flex justify-content-between">
            <Link
              type="link"
              className=""
              style={{ color: "#707070" }}
              onClick={resendOtpp}
            >
              Resend OTP
            </Link>
            <Link to="/login" className="" style={{ color: "#707070" }}>
              Go to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginOtp;
