import React from 'react';
import Layout from '../../../Layout/Admin/Layout';
import BreadCrumbCommon from '../../../Components/Common/BreadCrumbCommon';
import { Skeleton, Tabs } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../utils/AxiosInstance';
import IndividualRequest from './IndividualRequest';

function ProjectList() {


    const { isLoading, data, refetch } = useQuery({
        queryKey: ["GetAllServices"],
        queryFn: async () => {
            const { data } = await apiClient.get(`Services`);
            return data;
        }
    });

    let tabsItem = null;
    if (data && data.data) {
        tabsItem = data.data.map((item) => ({
            label: item.name,
            key: item.id,
            children: <IndividualRequest id={item.id} name={item.name} />
        }));
    }




    const tabBarStyle = {
        background: '#FBFBFB 0% 0% no-repeat padding-box',
        opacity: 1,
    }

    return (
        <Layout activePage={'Requests'}>
            <p className={"f-18 fw-500"} style={{ color: '#161002' }}>{"Requests"}</p>
            <BreadCrumbCommon crumbs={["Requests"]} />
            <div className={"container-fluid m-0 p-0 card-wrapper"}>
                {isLoading ? (
                    <>
                        <div className="p-3">
                            <Skeleton active />
                        </div>
                    </>
                ) : (
                    <Tabs items={tabsItem} defaultActiveKey="1" type="card" tabBarStyle={tabBarStyle} />
                )}
            </div>
        </Layout>
    );
}

export default ProjectList;
