import React from 'react';
import { Input, Select, Slider } from "antd";
// import { useLanguage } from '../../Constants/LanguageContext';

function TitleAction(props) {
    // const changeLanguage = useLanguage();
    // const { t } = changeLanguage;
    return (
        <div className={"py-2 w-100"} style={{ marginTop: '-16px' }}>
            <p className={"f-14 fw-600 "}>
                Actions
            </p>
            <div style={{ height: 30, visibility: 'hidden' }}></div>
        </div>
    );
}

export default TitleAction;
