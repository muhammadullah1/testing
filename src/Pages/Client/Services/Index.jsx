import React from 'react'
import Layout from '../../../Layout/Client/Layout'
import homeimg1 from "../../../assets/images/PNGS/homeimg1.png"
import homeimg2 from "../../../assets/images/PNGS/homeimg2.png"
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../../../utils/AxiosInstance'
import ServiceComponent from '../../../Components/ClientServices/ServiceComponent'
import { useSelector } from 'react-redux'
import ClientBreadCrumb from '../../../Components/Common/ClientBreadCrumb'
import { useTranslation } from 'react-i18next'

const Index = () => {
    const { t } = useTranslation();
    const allConfigData = useSelector((state) => state.configDataSlice.allConfigData);

    const { isLoading, data, refetch } = useQuery({
        queryKey: ["services"],
        queryFn: async () => {
            const { data } = await apiClient.get(`Services`);
            const filterServices = data.data.filter(el => el.name !== 'Change Language Request')
            console.log(filterServices, 'is service data')
            const filterData = { ...data, data: filterServices }

            return filterData;
        },
        cacheTime: 0,
    });
    const breadcrumbItems = [
        { title: t("Home"), href: "/" },
        { title: t("Services"), href: "/services" },
    ];

    return (
        <Layout activePage='Services' footer={true} chatWithUs={true} className={'box-shadow'}>
            <div className="container-fluid mb-5 p-5 services-hero w-sm-100" style={{ backgroundColor: allConfigData?.colors?.secondary }}>
                <ClientBreadCrumb breadcrumbItems={breadcrumbItems} />
                <div className='row'>
                    <div className="col-lg-6 col-md-10 p-5 hero-content">
                        <h1 className='service-heading'>{t("Services")}</h1>
                        <p className='fw-light my-3 w-75 service-desc'>
                            {t(`Our Services include from template customization and branding services to template installation and technical support,                 we aim to make your experience with our templates as seamless as possible. Whether you're a beginner or an experienced user,  our services ensure that you can fully leverage the potential of our templates with ease.`)}
                        </p>
                    </div>
                    <div className="col-lg-6 col-md-10 flex-shrink-1">
                        <div className="img-dev">
                            <div className="behind-img-dev">
                                <img className="behind-img" src={homeimg2} alt="..." />
                            </div>
                            <div className="front-img-dev">
                                <img className="front-img" src={homeimg1} alt="....." />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <>
                {data && data.data.map((item, index) => (
                    <ServiceComponent
                        sno={String(index + 1).padStart(2, '0')}
                        key={item.id}
                        data={item}
                        className={`service-0${(index % 2) + 1}`}
                    />
                ))}
            </>
        </Layout>
    )
}

export default Index
