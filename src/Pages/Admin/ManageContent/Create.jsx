import React from "react";
import Layout from "../../../Layout/Admin/Layout";
import { Button, Divider, Form, message } from "antd";
import FormTextInput from "../../../Components/Common/FormTextInput";
import FormTextAreaInput from "../../../Components/Common/FormTextAreaInput";
import FormSelect from "../../../Components/Common/FormSelect";
import FormSwitch from "../../../Components/Common/FormSwitch";
import FormUpload from "../../../Components/Common/FormUpload";
import { formatErrors } from "../../../Constants/global";
import BreadCrumbCommon from "../../../Components/Common/BreadCrumbCommon";
import BackButton from "../../../Components/Common/BackButton";
import { Link, useNavigate } from "react-router-dom";
import HeaderOnly from "../../../Components/Common/HeaderOnly";
// import { useLanguage } from "../../../../Constants/LanguageContext";

function CreateArticle(props) {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  // const { t } = useLanguage();

  const onFinish = (values) => {
    values = { ...values, images: values.images.fileList.map(img => img.originFileObj) }

    if (values?.images?.length === 0) {
      form.setFields([
        {
          name: 'images',
          errors: "Image field is required"
        }
      ])
      return
    }


    // Inertia.post(route("admin.market-item.store"), values, {
    //     onSuccess: () => {
    //         message.success(t('Item Added Successfully'));
    //         form.resetFields();
    //     },
    //     onError: (errors) => {
    //         form.setFields(formatErrors(errors));
    //     },
    // });
  };
  return (
    <Layout activePage='Manage Content'>
      <BackButton></BackButton>
      <BreadCrumbCommon crumbs={['Articles', 'Add Article']} />
      <div className={"card-wrapper"}>
        <HeaderOnly
          title={'Add Articles'}
          subTitle={'Enter the details below to add Articles'}
        />
        <div className={"custom-card-body"}>
          <Form layout={"vertical"} onFinish={onFinish} form={form}>
            <div className="row mb-3">
              <div className="col-md-12">
                <FormUpload
                />
              </div>
              </div>
              <div className="row">
              <div className="col-md-6">
                <FormTextInput
                  name={"ar_name"}
                  label={'Title'}
                // isArabicRule={true}
                />
              </div>
              </div>
              <div className="row">
              <div className="col-md-12">
              <FormTextAreaInput
                  name={"ar_description"}
                  label={'Description'}
                // isArabicRule={true}
                />
              </div>
              </div>

              <div className="col-md-12  d-flex justify-content-end mt-4">
                <Button
                  className="transparent--btn m-2"
                >
                  {'Cancel'}
                </Button>

                <Button htmlType="submit" className='primary--btn m-2'> {'Save'}</Button>
              </div>
          </Form>
        </div>
      </div>
    </Layout>
  );
}

export default CreateArticle;
