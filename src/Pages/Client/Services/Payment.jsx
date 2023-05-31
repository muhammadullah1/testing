import React, { useState } from 'react'
import {  Divider, message } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import logowhite from '../../../assets/images/SVGS/logowhite.svg';
import { ReactComponent as Tickicon } from '../../../assets/images/SVGS/tickicon.svg';
import Triangle from '../../../Components/Common/Triangle';
import { apiClient } from '../../../utils/AxiosInstance';
import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import ServiceRequestPayment from '../../../Components/Common/ServiceRequestPayment';
import { useTranslation } from 'react-i18next';
import LangSelectInput from '../../../Components/Common/LanguageSelectInput';

const Index = () => {
    const { t } = useTranslation();
    const allConfigData = useSelector((state) => state.configDataSlice.allConfigData);
    const serviceRequest = useSelector((state) => state.serviceRequest.serviceRequest);
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;
    const { id } = useParams();
    const [paymnetDone, setPaymnetDone] = useState(false);

    const mutation1 = useMutation({
        mutationFn: (data) => {
            return apiClient.post("CustomerRequest", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        },
        onSuccess: () => {
            console.log("service request successful")
        },
        onError: ({ response }) => {
            Object.keys(response.data).map((el) =>
                message.error(response.data[el][0])
            );
        },
    });

    const mutation2 = useMutation({
        mutationFn: (data) => {
            return apiClient.post("CustomerRequest/RequestPayment", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        },
        onSuccess: () => {
            message.success(t("Request Payment Successfully"));
            setPaymnetDone(true);
        },
        onError: ({ response }) => {
            Object.keys(response.data).map((el) =>
                message.error(response.data[el][0])
            );
        },
    });



    const onFinish = async (val) => {
        try {
            const firstApiResponse = await mutation1.mutateAsync({
                ...data,
                ServiceId: id,
                ReferenceImage: data?.ServicesImages?.fileList[0]?.originFileObj
            });

            // Extract the necessary data from the first API response
            const responseData = firstApiResponse.data;

            const expiryDate = new Date(val.CardExpiryDate);
            const cardExpiryDate = expiryDate.toISOString();
            val = {
                ...val,
                Id: responseData.id,
                Price: responseData.price,
                CVV: val.CVV,
                CardNumber: val.CardNumber,
                CardExpiryDate: cardExpiryDate,
            };

            await mutation2.mutateAsync(val);

        } catch (error) {
            // Handle errors
            console.error(error);
        }
    };

    console.log(serviceRequest,'are srv req')

    return (
        <div className="container-fluid m-0 p-0">
            <header className='navbar d-flex items-content-center justify-content-between' style={{ backgroundColor: allConfigData?.colors?.primary === undefined ? '#FFC641' : allConfigData?.colors?.primary }}>
                <div className="navbar-content  mb-3">
                    <div className="prime-logo">
                        {/* <img src={logowhite} alt="logo" /> */}
                        <a role="button" onClick={() => navigate('/')}>
                            <img
                                src={logowhite}
                                alt="logo"
                            />
                        </a>
                    </div>
                </div>
                <div className='mx-5 '>
                <LangSelectInput border={false} className={""} />
                </div>
            </header>
            <div className="container-fluid payment-screen">
                <p className='mx-5 mt-5 f-24'>
                    <span className='payment-back-arrow' onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                        </svg>
                    </span>
                    <span className='mx-3'>{t("Back")}</span>
                </p>

                <div className='row'>
                    <div className="col p-5">
                        <h1 className='service-heading fw-bold f-24'>{serviceRequest && serviceRequest.name}</h1>
                        <p className='my-2 fw-bolder'><span className='fw-light f-16'> {t("Price")}: </span> <span className='px-2'>{serviceRequest && serviceRequest.price}</span> {t("SAR")}</p>
                        <p className='fw-light my-3 w-75 payment-desc'>{serviceRequest && serviceRequest.description} </p>

                        <p className='mt-5 fw-semibold f-22'>{t("Required Information")}</p>
                        <p className='my-3 fw-semibold'>{t("Description")}</p>
                        <p className='payment-desc'>{data && data.Description}</p>

                        <div className='my-4 d-flex justify-content-between'>
                            <div>
                                <p className='fw-semibold f-16 my-2'>{t("Unique Features")}</p>
                                {data && data.Unique_features.split(' ').map((word, index) => (
                                    <p key={index} className='my-1'>{word}</p>
                                ))}
                            </div>


                            <div>
                                <p className='fw-semibold f-16 my-2'>{t("Key Features")}</p>
                                {data && data.Keyofcontents.split(' ').map((word, index) => (
                                    <p key={index} className='my-1'>{word}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        {
                            !paymnetDone ?
                                <ServiceRequestPayment title={t('Enter card information')} onFinish={onFinish} backgroundColor={allConfigData?.colors?.primary} />
                                :
                                <div className='col'>
                                    <p className='text-green text-center mb-4'>{t("Your booking has been Updated")}<span className='mx-3'><Tickicon /></span></p>
                                    <div className='payment-slip mx-auto p-4'>
                                        <p className='fw-bold f-18 mb-4'>{t("Payment Information")}</p>
                                        <div className='d-flex justify-content-between'>
                                            <p>{t("Paid by")}</p>
                                            <p className='ml-5'>{serviceRequest.name}</p>
                                        </div>
                                        <Divider />
                                        <div className='d-flex justify-content-between'>
                                            <p>{t("Date")}</p>
                                            <p className='ml-5'>{new Date().toLocaleDateString()}</p>
                                        </div>
                                        <Divider />
                                        <div className='d-flex justify-content-between'>
                                            <p>{t("Amount")}</p>
                                            <p className='ml-5'>{serviceRequest.price}  {t("SAR")}</p>
                                        </div>
                                        <Triangle />
                                    </div>
                                    {/* <div className='my-5 w-75 d-flex justify-content-center'>
                                        <span className='px-3'><Downloadicon /></span> <Button className='border-none'>Download</Button>
                                    </div> */}
                                </div>
                        }
                    </div >
                </div >
            </div>

        </div >
    )
}

export default Index
