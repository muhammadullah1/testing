import React from 'react';
import BreadCrumbCommon from '../../../Components/Common/BreadCrumbCommon';
import Layout from "../../../Layout/Admin/Layout";
import RecentOrders from '../../../Components/Dashboard/RecentOrders';
import SalesChartAndSummary from '../../../Components/Dashboard/SalesChartAndSummary';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../utils/AxiosInstance';
// import { useLanguage } from '../../../Constants/LanguageContext';

function Dashboard() {
    // const changeLanguage = useLanguage();
    // const { t } = changeLanguage;
const { isLoading, data, refetch } = useQuery({
  queryKey: ["colors"],
  queryFn: async () => {
      const { data } = await apiClient.get(`DashBoard/GetAllRecentPurchasedOrders`);
      return data;
  },
  cacheTime: 0,
});


    return (

        <Layout activePage={'Dashboard'}>
            <section className='container-fluid m-0 p-0 dashbaord-UI'>
                <BreadCrumbCommon crumbs={['Dashboard']} />
                <SalesChartAndSummary/>
                <RecentOrders recentOrder={data} isLoading={isLoading}/>
            </section>
        </Layout>
    );
}

export default Dashboard;
