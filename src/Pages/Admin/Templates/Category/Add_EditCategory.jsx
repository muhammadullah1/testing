import React from "react";
import { Button, Divider, Form, message } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "../../../../Layout/Admin/Layout";
import BackButton from "../../../../Components/Common/BackButton";
import BreadCrumbCommon from "../../../../Components/Common/BreadCrumbCommon";

import HeaderOnly from "../../../../Components/Common/HeaderOnly";
import FormTextInput from "../../../../Components/Common/FormTextInput";
import FormTextAreaInput from "../../../../Components/Common/FormTextAreaInput";
import { apiClient } from "../../../../utils/AxiosInstance";
import { ServerErrorMessage } from "../../../../utils/ServerErrorMessages";

// import { useLanguage } from "../../../../Constants/LanguageContext";

function Add_EditCategory(props) {
  const { state } = useLocation();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    let apiName = "";
    let successMessage = "";
    if (state) {
      apiName = "Categories/UpdateCategory/" + state.id;
      successMessage = "Category Updated Successfully";
      values = { ...values, id: state.id };
    } else {
      apiName = "Categories";
      successMessage = "Category Added Successfully";
    }

    apiClient
      .post(apiName, values)
      .then(() => {
        message.success(successMessage);
        navigate(-1);
      })
      .catch(({ response }) => {
        const { data } = response;
        ServerErrorMessage(data);
      });
  };
  return (
    <Layout activePage="Template">
      <BackButton></BackButton>
      <BreadCrumbCommon crumbs={["Articles", "Add Article"]} />
      <div className={"card-wrapper"}>
        <HeaderOnly
          title={"Add Category"}
          subTitle={"Enter the details below to add Category"}
        />
        <div className={"custom-card-body"}>
          <Form
            initialValues={state && state}
            layout={"vertical"}
            onFinish={onFinish}
            form={form}
          >
            <div className="row">
              <div className="col-md-6">
                <FormTextInput
                  name={"name"}
                  label={"Category Name"}
                  // isArabicRule={true}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <FormTextAreaInput
                  name={"description"}
                  label={"Description"}
                  // isArabicRule={true}
                />
              </div>
            </div>

            <div className="col-md-12  d-flex justify-content-end mt-4">
              <Button className="transparent--btn m-2">{"Cancel"}</Button>

              <Button htmlType="submit" className="primary--btn m-2">
                {"Save"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Layout>
  );
}

export default Add_EditCategory;
