import React from 'react';
import back from '../../assets/images/Icons/back.svg'
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
// import { useLanguage } from '../../Constants/LanguageContext';


function BackButton({ backUrl = "" }) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Button onClick={() => navigate(-1)} className='p-0' type="link">
            <span href={backUrl} className={"d-flex align-items-center text-decoration-none mb-1"}>
                <img src={back} alt="back" className='back-btn-image' width={14} height={14} /> <span className={"mx-2 text-primary f-18 fw-500"}>
                    {t("Back")}</span>
            </span>
        </Button>
    );
}

export default BackButton;
