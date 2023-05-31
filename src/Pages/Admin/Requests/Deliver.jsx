import React from "react";
import Layout from "../../../Layout/Admin/Layout";
import { Button, Form, Upload, message } from "antd";
import BreadCrumbCommon from "../../../Components/Common/BreadCrumbCommon";
import BackButton from "../../../Components/Common/BackButton";
import FormTextAreaInput from "../../../Components/Common/FormTextAreaInput";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FormUpload from "../../../Components/Common/FormUpload";
import Dragger from "antd/es/upload/Dragger";
import { apiClient } from "../../../utils/AxiosInstance";

function RequestDeliver() {
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const { state } = useLocation();
  const { id } = useParams();

  const props = {
    beforeUpload: (file) => {
      let text = "";
      console.log(file);
      if (file.type !== "application/x-zip-compressed") {
        text = "Zip and rar file allowed";
        message.error(text);
        return Upload.LIST_IGNORE;
      }
    },

    defaultFileList: state && [
      {
        uid: 1,
        name: state.zipFile.split("/")[state.zipFile.split("/").length - 1],
        url: window.location.origin + "" + state.zipFile,
      },
    ],

    listType: "picture-card",
  };

  const onFinish = (values) => {
    let ZipFile = values.ZipFile.fileList.map((el) => el.originFileObj);
    values = { ...values, id: id, Description: values.Description, RequestStatus: 2,  ZipFile: ZipFile[0] };
    console.log(values);
    // return
    apiClient
      .post(`Requests/RequestDeliver/${id}`, values, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then(() => {
        message.success("Request Delivered Successfully");
        navigate(-1);
      });
  };
  return (
    <Layout activePage={'Requests'}>
      <BackButton />
      <BreadCrumbCommon crumbs={['Requests', 'Deliver']} />
      <div className={"card-wrapper"}>
        <div className="custom-card-header">
          <div>
            <p className={"f-18 fw-500"}>{'Deliver'}</p>
            <p className={"text-muted f-14"}>
              {'Enter the details below to send response'}

            </p>
          </div>
        </div>
        <div className={"custom-card-body"}>
          <Form layout={"vertical"} onFinish={onFinish} form={form}>

            <div className="row">
              <div className="col">
              <Form.Item
                label="Zip File"
                name="ZipFile"
                rules={[{ required: true, message: "Zip file is requied" }]}
              >
                <Dragger
                  maxCount={1}
                  className="zipUpload"
                  accept=".zip,.rar"
                  {...props}
                >
                  <p className="text-zipUpload f-12">
                    Upload Source Files here.
                  </p>
                  <p className="text-zipUpload f-12">
                   ZAP or RAR
                  </p>
                </Dragger>
              </Form.Item>
              </div>
              <div className="row">
                <div className="col">
                  <FormTextAreaInput
                    name={"Description"}
                    label={'Description (English)'}
                  />
                </div>
              </div>
              <div className="col-md-12  d-flex justify-content-end mt-4">
                <Button
                  className="transparent--btn m-2"
                  onClick={() => navigate(-1)}
                >
                  {'Cancel'}
                </Button>

                <Button htmlType="submit" className='primary--btn m-2'> {'Send'}</Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </Layout>
  );
}

export default RequestDeliver;
