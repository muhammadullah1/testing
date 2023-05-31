import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckIsAuthenticate from "../../Constants/CheckIsAuthenticate";
import { setaddServiceRequest } from '../../store/slicers/serviceRequestSlice';
import { useTranslation } from 'react-i18next';


const ServiceComponent = ({ data, className, sno }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allConfigData = useSelector((state) => state.configDataSlice.allConfigData);
    const authState = useSelector((state) => state.auth);
    const rowClass = className === 'service-01' ? 'custom-flex-direction justify-content-between' : '';

    const bookMe = () => {
        if (CheckIsAuthenticate(authState)) {
            dispatch(setaddServiceRequest(data));
            navigate(`/services/request/${data.id}`);
        } else {
            navigate("/login");
        }
    };
    return (
        <div className={`container-fluid p-0 my-6 ${className}`}>

            <div className={`row ${rowClass} justify-content-between`}>

                <div className="col-lg-5 col-md-8 col-sm-10 m-0 p-0">

                    <div className={`${className}-dev`} style={{ background: `${allConfigData?.colors?.secondary} 0% 0% no-repeat padding-box` }}>
                        <img src={data.imageUrl} alt={data.name} className={`${className}-img`} />
                    </div>
                </div>

                <div className="col-lg-4 col-md-10 col-sm-10 mx-lg-5 px-5">
                    <h1 className='service-01-heading' style={{ color: allConfigData?.colors?.primary }}>{sno}</h1>
                    <p className='fw-light f-35 lh-sm text-wrap'>{data.name.split(' ')[0]}</p>
                    <p className='fw-bold f-35 lh-sm text-wrap'>{data.name.split(' ').slice(1).join(' ')}</p>
                    <p className='w-75 service-0-desc mt-3 h-auto'>{data.description}</p>
                    <button className="make-booking-btn my-4" onClick={bookMe} style={{ color: allConfigData?.colors?.primary, border: `1px solid ${allConfigData?.colors?.primary}` }}>
                        {t("Make Booking")}
                        <span className="make-booking-btn-arrow m-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill={`#fff`} className="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                            </svg>
                        </span>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ServiceComponent;
