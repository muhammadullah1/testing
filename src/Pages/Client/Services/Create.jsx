import React, { useEffect, useState } from 'react'
import Layout from '../../../Layout/Client/Layout';
import { Button, Form, message } from 'antd';
import FormTextAreaInput from '../../../Components/Common/FormTextAreaInput';
import FormUpload from "../../../Components/Common/FormUpload";
import FormTextInput from '../../../Components/Common/FormTextInput';
import booking from "../../../assets/images/booking.svg"
import { useNavigate, useParams } from 'react-router-dom';
import FormSelect from '../../../Components/Common/FormSelect';
import { apiClient } from '../../../utils/AxiosInstance';
import { useTranslation } from 'react-i18next';

const CreateBooking = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams();
    const [categories, setCategories] = useState([]);


    const handleFinish = (val) => {
        message.success(t("Proceed To Payment"));
        navigate(`/services/request/${id}/payment`, { state: val });
    };

    useEffect(() => {
        apiClient.get("CustomerRequest/GetCategoryDropdownList")
            .then(({ data }) => {
                const categories = data.map(item => ({
                    label: item.categoryName,
                    value: item.id
                }));
                setCategories(categories);
            })
            .catch(error => {
                console.log(error);
            });
        navigate(id === undefined ? `/admin/services` : "");
    }, []);

    return (
        <Layout activePage='Services'>
            <div className="container-fluid mt-2 p-0 m-0">
                <Form layout={"vertical"} onFinish={handleFinish} form={form}>
                    <div className="row p-0">
                        <div className='col-lg-8 col-md-12 p-5'>
                            <p className='mb-5 f-24'>
                                <span className='services-back-arrow' onClick={() => navigate('/services')} style={{ cursor: "pointer" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                                    </svg>
                                </span>
                                <span className='mx-3'>{t("Dashboard Development")}</span>
                            </p>
                            <div className='row'>
                                <div className="col-lg-6 col-md-12">
                                    <FormSelect
                                        name={"CategoryId"}
                                        label={t('Category')}
                                        options={categories}
                                    />
                                </div>
                                <div className="col-lg-6 col-md-12">
                                    <FormTextInput
                                        name={"Reference_template_link"}
                                        label={t('Reference template link')}
                                    />
                                </div>
                                <div className="row p-0 m-0">
                                    <div className="col-lg-6 col-md-12">
                                        <FormTextInput
                                            name={"Reference_Video"}
                                            label={t('Reference video link (Optional)')}
                                        />
                                    </div>
                                </div>

                                <div className="col-12">
                                    <FormTextAreaInput
                                        name={"Description"}
                                        label={t('Description')}
                                    />
                                </div>

                                <div className="row p-0 m-0">
                                <div className="col">
                                <div className="col">
                                    <FormTextInput
                                        name={"Unique_features"}
                                        label={t('Unique features')}
                                    />
                                </div>
                                <div className="col">
                                    <FormTextInput
                                        name={"Keyofcontents"}
                                        label={t('Key of contents')}
                                    />
                                </div>
                                </div>
                            <div className="col-lg-6 col-md-12">
                                <FormUpload
                                    name={"ServicesImages"}
                                    label={t('Reference Image (Optional)')}
                                />
                            </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12  d-flex justify-content-lg-start  justify-content-md-center justify-content-sm-center mt-5">
                                    <Button htmlType="submit" className='cart-navbar-button m-2'> {t('Submit')}</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-12 booking-img-sec d-lg-block'>
                        <img src={booking} alt="123" className='booking-img img-fluid' />
                    </div>


            </div>
        </Form>
            </div >
        </Layout >
    )
}

export default CreateBooking
