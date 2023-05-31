import { Button, Form, Modal, message } from 'antd';
import FormTextInput from '../Common/FormTextInput';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ColorBox from '../Common/ColorBox';
import { apiClient } from '../../utils/AxiosInstance';
import { useMutation, useQuery } from '@tanstack/react-query';
import HeaderOnly from "../../Components/Common/HeaderOnly";
// import { ChromePicker } from 'react-color';

const ColorModal = ({ logoText, icon, children }) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputPrimaryColor, setInputPrimaryColor] = useState('');
    const [inputSecondaryColor, setInputSecondaryColor] = useState('');

    const { isLoading, data, refetch } = useQuery({
        queryKey: ["colors"],
        queryFn: async () => {
            const { data } = await apiClient.get(`Configurations/GetColors`);
            form.setFieldsValue({
                Primary: inputPrimaryColor ? inputPrimaryColor : data.primary,
                Secondary: inputSecondaryColor ? inputSecondaryColor : data.secondary
            });
            return data;
        },
        cacheTime: 0, //red green yellow 
    });

    const mutation = useMutation({
        mutationFn: (data) => {
            return apiClient.post("Configurations/AddUpdateColors", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        },
        onSuccess: () => {
            message.success("Colors Updated Successfully");
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
                        >
                            <div className='mb-5'>
                                <HeaderOnly
                                    title={'Colors'}
                                    subTitle={'You can update your website colors from here'}
                                />
                            </div>
                            <Form
                                form={form}
                                layout="vertical"
                                name="form_in_modal"
                                // initialValues={{
                                //     modifier: 'public',
                                // }}
                                onFinish={handleFinish}
                            >
                                <div className='d-flex justify-content-evenly'>
                                    <FormTextInput
                                        name={"Primary"}
                                        label={'Primary'}
                                        onChange={(e) => setInputPrimaryColor(e.target.value)}
                                    />
                                    <ColorBox color={inputPrimaryColor ? inputPrimaryColor : data?.primary} paddingx={5} paddingy={3} />
                                </div>
                                <div className='d-flex justify-content-evenly'>
                                    <FormTextInput
                                        name={"Secondary"}
                                        label={'Secondary'}
                                        onChange={(e) => setInputSecondaryColor(e.target.value)}
                                    />
                                    <ColorBox color={inputSecondaryColor ? inputSecondaryColor : data?.secondary} paddingx={5} paddingy={3} />
                                </div>
                                <div className='d-flex justify-content-center gx-5 my-5'>
                                    <Button onClick={handleCancel} className='transparent--btn mx-3'>
                                        Cancel
                                    </Button>
                                    <Button htmlType="submit"
                                        className='primary--btn mx-3'>
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
            <div className="text-muted fw-lighter mt-3">
                <ColorBox name="Primary" color={data && data?.primary} paddingx={4} paddingy={2} />
                <ColorBox name="Secondary" color={data && data?.secondary} paddingx={4} paddingy={2} />
            </div>
        </div>
    );
};

export default ColorModal