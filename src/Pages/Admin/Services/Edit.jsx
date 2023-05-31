import React from "react";
import BackButton from "../../../Components/Common/BackButton";
import BreadCrumbCommon from "../../../Components/Common/BreadCrumbCommon";
import Layout from "../../../Layout/Admin/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { apiClient } from "../../../utils/AxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import { Button, Form, message } from "antd";
import FormTextInput from "../../../Components/Common/FormTextInput";
import FormTextAreaInput from "../../../Components/Common/FormTextAreaInput";
import FormUpload from "../../../Components/Common/FormUpload";
import HeaderOnly from "../../../Components/Common/HeaderOnly";
import { useMutation } from "@tanstack/react-query";
import FormUploadEdit from "../../../Components/Common/FormUploadEdit";

function EditService() {
    const [form] = Form.useForm();
    const { id } = useParams();
    const navigate = useNavigate();

    const { isLoading, data, refetch } = useQuery({
        queryKey: ["services", id],
        queryFn: async () => {
            const { data } = await apiClient.get(`Services/${id}`);
            form.setFieldsValue({
                ...data,
                price: data.price.toString()
            }); // populate the form fields with fetched data
            return data;
        },
        cacheTime: 0,
    });

    console.log('fetch data', data);

    const mutation = useMutation({
        mutationFn: (data) => {
            return apiClient.post(`Services/${id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        },
        onSuccess: () => {
            message.success("Service Updated Successfully");
            navigate("/admin/services");
        },
        onError: ({ response }) => {
            Object.keys(response.data).map((el) =>
                message.error(response.data[el][0])
            );
        },
    });
    const handleUpdate = (val) => {
        val = {
            ...val,
            id: id,
            UpdateImage: val?.UpdateImage?.fileList[0]?.originFileObj, 
        };
        mutation.mutate(val);
    };

    return (
        <Layout activePage="Services">
            <BackButton />
            <BreadCrumbCommon crumbs={["Services", "Edit Service"]} />
            <div className={"card-wrapper"}>
                <HeaderOnly
                    title={"Services"}
                    subTitle={"You can edit the Service from here"}
                />
                <div className={"custom-card-body"}>
                    {isLoading ? (
                        <Skeleton active />
                    ) : (
                        <Form layout={"vertical"} onFinish={handleUpdate} form={form}>
                            <div className="row justify-content-between">
                                <div className="col-12">
                                    <FormUploadEdit
                                        name={"UpdateImage"}
                                        required={false}
                                        defaultFileList={data?.imageUrl}
                                    />

                                </div>
                                <div className="row my-3">
                                    <div className="col-md-6">
                                        <FormTextInput name={"name"} label={"Title"} />
                                    </div>
                                    <div className="col-md-4">
                                        <FormTextInput
                                            type="Number"
                                            name={"price"}
                                            label={"Price"}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <FormTextAreaInput
                                        name={"description"}
                                        label={"Description (English)"}
                                    />
                                </div>
                                <div className="col-md-12 d-flex justify-content-end mt-4">
                                <Button className="transparent--btn m-2" onClick={() => navigate("/admin/services")}>{"Cancel"}</Button>
                                <Button htmlType="submit" className='primary--btn m-2'> {'Save'}</Button>
                                </div>
                            </div>
                        </Form>
                    )}
                </div>
            </div>
        </Layout>
    );
}
export default EditService;
