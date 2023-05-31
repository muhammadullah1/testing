import React from "react";
import { Button, Form, Input, Select } from "antd";
import resetlink from "../../../assets/images/Icons/resetlink.svg";
import { Link, useNavigate } from "react-router-dom";

// import { useLanguage } from '../../../Constants/LanguageContext';
function ResetLinkSent({email}) {
    // const changeLanguage = useLanguage();
	// const { language, updateLanguage, t } = changeLanguage;
    const navigate = useNavigate();

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
            <div className="login-body" style={{ width: 444, height: 300}}>
                <div className="flex justify-content-center">
                <div className="login-heading mt-5">
                     <h1 className={"text-center f-47 fw-700"}>Al Hayat Residencia</h1>
                </div>
                </div>

                <div className="login-card text-center" style={{ width: 430 }}>
                    <img
                        className="icon-13 mr-8"
                        src={resetlink}
                        alt="reselink"
                    />

                    <p className={"text-center f-16 fw-500 text-green mt-15"}>
                       Reset link sent
                    </p>
                    <p className={"text-center f-14 text-secondary mt-2"}>
                        A password recovery link has been sent to your email
                    </p>
                    <p className={"text-center f-14 text-secondary mt-2"}>
                        demo@gmail.com
                    </p>
                    <div className="text-center">
                        <Button
                            type="primary"
                            className=" btn-submit mt-4"
                            onClick={() => navigate('/admin/login')}
                        >
                           Go to login
                        </Button>
                    </div>
                </div>
            </div>
            <div className="login-footer">
                <p className={"text-center f-16 text-white"}>
                    All rights reserved by Al - Muswkaf
                </p>
            </div>
        </div>
    );
}

export default ResetLinkSent;
