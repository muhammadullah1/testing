import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Modal, message } from 'antd';
import FormUpload from '../Common/FormUpload';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient } from '../../utils/AxiosInstance';
import HeaderOnly from "../../Components/Common/HeaderOnly";

const LogoModal = ({ logoText, icon, children }) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isLoading, data, refetch } = useQuery({
        queryKey: ["logoUpdate"],
        queryFn: async () => {
            const { data } = await apiClient.get(`Configurations/GetLogo`);
            return data;
        },
        cacheTime: 0,
    });

    const mutation = useMutation({
        mutationFn: (data) => {
            return apiClient.post("Configurations/AddUpdateLogo", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        },
        onSuccess: () => {
            message.success("Logo Updated Successfully");
            setIsModalOpen(false);
            refetch();
        },
        onError: ({ response }) => {
            Object.keys(response.data).map((el) =>
                message.error(response.data[el][0])
            );
        },
    });
    const handleFinish = (val) => {
        console.log("before finish", val)
        val = {
            LogoImage: val?.LogoImage?.fileList[0]?.originFileObj  //.map((files) => files.originFileObj)
        }
        console.log("after finish", val)
        mutation.mutate(val);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const toggleModal = () => setIsModalOpen(!isModalOpen);
    console.log(data)
    return (
        <div className="manage-content">
            <div className='d-flex justify-content-between p-2 m-2 border-bottom'>
                <p className='text-muted'>{logoText}</p>
                <div className="d-flex justify-content-end gap-3 align-items-center ">
                    {isModalOpen &&
                        <Modal
                            open={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            // title="Reason for rejection"
                            style={{ borderRadius: 15 }}
                            footer={[]}
                        >
                            <div className='mb-3'>
                                <HeaderOnly
                                    title={'Update Logo'}
                                    subTitle={'You can update your logo from here'}
                                />
                            </div>
                            <Form
                                form={form}
                                layout="vertical"
                                name="form_in_modal"
                                initialValues={{
                                    modifier: 'public',
                                }}
                                onFinish={handleFinish}
                            >
                                <FormUpload
                                    name={"LogoImage"}
                                    placeholder='Type here...'
                                    multiple={false}
                                />
                                <div className='d-flex justify-content-end gx-5'>
                                    <Button onClick={handleCancel} className='transparent--btn mx-2'>
                                        Cancel
                                    </Button>
                                    <Button htmlType="submit"
                                        className='primary--btn'>
                                        Save
                                    </Button>
                                </div>
                            </Form>
                        </Modal>
                    }
                </div>
                <Link
                    onClick={toggleModal}
                >
                    <img
                        className="icon-13 action-edit-icon"
                        src={icon}
                        alt="Edit"
                    />
                </Link>
            </div>
            <img src={data?.logoImage} alt="logo" className='img-fluid w-50 my-3 mx-auto d-block' />
            <p className='text-center text-muted f-14 fw-light mt-4'>Your current logo</p>
        </div>
    )
}

export default LogoModal