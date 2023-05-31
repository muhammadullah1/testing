import { Button, Form, Modal, message } from 'antd';
import FormTextInput from '../Common/FormTextInput';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient } from '../../utils/AxiosInstance';
import HeaderOnly from "../../Components/Common/HeaderOnly";
import ListWithDots from '../Common/ListWithDots';

const PagesNameModal = ({ logoText, icon, children }) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputHome, setInputHome] = useState('');
    const [inputTemplates, setInputTemplates] = useState('');
    const [inputCart, setInputCart] = useState('');
    const [inputServices, setInputServices] = useState('');

    const { isLoading, data, refetch } = useQuery({
        queryKey: ["PagesNames"],
        queryFn: async () => {
            const { data } = await apiClient.get(`Configurations/GetPagesDetails`);
            form.setFieldsValue({
                Home:  inputHome ? inputHome : data.home,
                Templates: inputTemplates ? inputTemplates : data.templates,
                Cart: inputCart ? inputCart : data.cart,
                Articales: inputServices ? inputServices : data.articales
            }); // populate the form fields with fetched data
            return data;
        },
        cacheTime: 0,
    });

    const mutation = useMutation({
        mutationFn: (data) => {
            return apiClient.post("Configurations/AddUpdatePagesDetails", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        },
        onSuccess: () => {
            message.success("Pages Names Updated Successfully");
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
        mutation.mutate(val);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const toggleModal = () => setIsModalOpen(!isModalOpen);

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
                            style={{ borderRadius: 15 }}
                            footer={[]}
                        > <div className='mb-4'>
                                <HeaderOnly
                                    title={'Social media links'}
                                    subTitle={'You can update your social media links from here'}
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
                                <FormTextInput
                                    name={"Home"}
                                    label={"Home"}
                                    onChange={(e) => setInputHome(e.target.value)}
                                />
                                <FormTextInput
                                    name={"Templates"}
                                    label={'Templates'}
                                    onChange={(e) => setInputTemplates(e.target.value)}
                                />
                                <FormTextInput
                                    name={"Cart"}
                                    label={'Cart'}
                                    onChange={(e) => setInputCart(e.target.value)}
                                />
                                <FormTextInput
                                    name={"Articales"}
                                    label={'Articales'}
                                    onChange={(e) => setInputServices(e.target.value)}
                                />
                                <div className='d-flex justify-content-end gx-5 mt-5'>
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
            <ListWithDots
                items={!isLoading && Object.entries(data).map(([key, value]) => ({
                    text: key.charAt(0).toUpperCase() + key.slice(1),
                    link: value,
                }))}
            />
        </div>
    );
};

export default PagesNameModal
