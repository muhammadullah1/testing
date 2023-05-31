import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../utils/AxiosInstance';
import { Skeleton } from 'antd';

const TotalCount = ({ icons }) => {
    const [totalCount, setTotalcount] = useState([]);

    const { isLoading, data, refetch } = useQuery({
        queryKey: ["GetAllCount"],
        queryFn: async () => {
            const { data } = await apiClient.get(`DashBoard/GetAllCount`);
            const totalCountArray = data && Object.entries(data).map(([key, value]) => ({ key, value }));
            setTotalcount(totalCountArray);
            return data;
        },
        cacheTime: 0,
    });

    return (
        isLoading ? (
            <>
                <div className="p-3">
                    <Skeleton active />
                </div>
                <div className="p-3">
                    <Skeleton active />
                </div>
            </>
        ) : (
            totalCount.map((el, index) => (
                <div className="card-wrapper p-19-17px d-flex justify-content-between align-items-center mt-30" key={el.key}>
                    <div className="d-flex align-items-center">
                        <div className="me-3 graph-icon">
                            <img src={icons && icons[index]} alt="icon" />
                        </div>
                        <div>
                            <h6 className="f-18 fw-400">
                                {el.value} {el.key === 'totalSales' ? 'SAR' : ''}
                            </h6>
                            <p className="f-12 text-secondary mt-5px">{el.key}</p>
                        </div>
                    </div>
                </div>
            ))
        )
    );
};

export default TotalCount;
