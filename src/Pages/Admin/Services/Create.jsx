import React from "react";
import Layout from "../../../Layout/Admin/Layout";
import { Button, Form, message } from "antd";
import FormTextInput from "../../../Components/Common/FormTextInput";
import FormTextAreaInput from "../../../Components/Common/FormTextAreaInput";
import FormUpload from "../../../Components/Common/FormUpload";
import BreadCrumbCommon from "../../../Components/Common/BreadCrumbCommon";
import BackButton from "../../../Components/Common/BackButton";
import HeaderOnly from "../../../Components/Common/HeaderOnly";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";

function CreateService(props) {
  const [form] = Form.useForm();
 const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data) => {
      return apiClient.post("Services", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      message.success("Service Added Successfully");
      navigate("/admin/services");
    },
    onError: ({ response }) => {
      Object.keys(response.data).map((el) =>
        message.error(response.data[el][0])
      );
    },
  });
  const handleFinish = (val) => {
    console.log(val)
    val = {
      ...val,
      ServicesImage: val?.ServicesImages?.fileList[0]?.originFileObj  //.map((files) => files.originFileObj)
    } 
    mutation.mutate(val);
  };

  return (
    <Layout activePage='Services'>
      <BackButton/>
      <BreadCrumbCommon crumbs={['Services', 'Add Services']} />
      <div className={"card-wrapper"}>
        <HeaderOnly
          title={'Services'}
          subTitle={'You can add new Service from here'}
        />
        <div className={"custom-card-body"}>
          <Form layout={"vertical"} onFinish={handleFinish} form={form}>
            <div className="row justify-content-between">
              <div className="col-12">
                <FormUpload name={"ServicesImages"} />
              </div>
             <div className="row my-3">
             <div className="col-md-6">
                <FormTextInput
                  name={"Name"}
                  label={'Title'}
                />
              </div>
              <div className="col-md-4">
                <FormTextInput
                type="Number"
                name={"Price"}
                label={'Price'}
                />
              </div>
             </div>
              <div className="col-md-6">
                <FormTextAreaInput
                  name={"Description"}
                  label={'Description (English)'}
                />
              </div>
              <div className="col-md-12  d-flex justify-content-end mt-4">
              <Button className="transparent--btn m-2" onClick={() => navigate("/admin/services")}>{"Cancel"}</Button>
                <Button htmlType="submit" className='primary--btn m-2'> {'Save'}</Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </Layout>
  );
}

export default CreateService;
