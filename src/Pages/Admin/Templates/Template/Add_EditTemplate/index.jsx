import { Button, Checkbox, Form, Input, Select, Upload, message } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { apiClient } from "../../../../../utils/AxiosInstance";
import FormUpload from "../../../../../Components/Common/FormUpload";
import FormTextInput from "../../../../../Components/Common/FormTextInput";
import FormTextAreaInput from "../../../../../Components/Common/FormTextAreaInput";
import Dragger from "antd/es/upload/Dragger";
import TextAreaCkEditor from "./TextAreaCkEditor";
import { ServerErrorMessage } from "./../../../../../utils/ServerErrorMessages";

function Index() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { state } = useLocation();

  console.log(state, "are state");

  const props = {
    beforeUpload: (file) => {
      const allowedExtensions = [".zip", ".rar"];
      const fileExtension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        const text = "Only zip and rar files are allowed";
        message.error(text);
        return Upload.LIST_IGNORE;
      }
    },

    showUploadList: { showPreviewIcon: false },
    action: false,

    defaultFileList: state && [
      {
        uid: 1,
        name: state.zipFile.split("/")[state.zipFile.split("/").length - 1],
        url: window.location.origin + "" + state.zipFile,
      },
    ],

    listType: "picture-card",
  };

  const [CategoryData, setCategoryData] = useState([]);
  const [ColorInputbg, setColorInputbg] = useState(state ? state.color : "");

  useEffect(() => {
    apiClient.get("Templates/GetCategoryDropdownList").then(({ data }) => {
      setCategoryData(data);
    });
  }, []);

  useEffect(() => {
    if (state) {
      form.setFields([
        {
          name: "Price",
          value: state.price.toString(),
        },
        {
          name: "Name",
          value: state.name,
        },
        {
          name: "CategoryId",
          value: state.categoryId,
        },
        {
          name: "Video",
          value: state.video,
        },

        {
          name: "Description",
          value: state.description,
        },

        {
          name: "UniqueFeatures",
          value: state.uniqueFeatures,
        },
        {
          name: "Keyofcontents",
          value: state.keyofcontents,
        },
        {
          name: "Keyofcontents",
          value: state.keyofcontents,
        },
        {
          name: "Color",
          value: state.color,
        },
      ]);
    }
  }, [state]);

  const onFinish = (values) => {
    // console.log(values,'are val')
    // return
    if (values.Images) {
      if (values?.Images?.length < 2 || values?.Images?.fileList?.length < 2) {
        form.setFields([
          {
            name: "Images",
            errors: ["Please Input more than 1 Image"],
          },
        ]);
        return;
      }
    }
    const formData = new FormData();
    let apiName = "";
    let arr = [];

    if (state) {
      const Oldimages = [];
      const newImages = [];
      apiName = "Templates/UpdateTemplate";
      formData.append("id", state.id);

      if (values.Images) {
        let Images = values.Images.fileList
          ? values.Images.fileList.map((el, index) => {
            if (el.originFileObj) {
              formData.append("NewImages", el.originFileObj);
            } else {
              formData.append("ExistingImages", el.id);
            }
          })
          : formData.append("images", JSON.stringify(values.Images));
        // : console.log(values.Images,'are the images');
      }

      if (values.ZipFile) {
        if (values.ZipFile.fileList) {
          values.ZipFile.fileList.map((el) =>
            formData.append("updatedZipFile", el.originFileObj)
          );
        } else {
          formData.append("ZipFile", values.ZipFile);
        }
      }
    } else {
      apiName = "Templates";
      let Images = values.Images.fileList.map((el) => {
        formData.append("Images", el.originFileObj);
      });
      let ZipFile = values.ZipFile.fileList.map((el) => el.originFileObj);
      formData.append("ZipFile", ZipFile[0]);
    }

    formData.append("Name", values.Name);
    formData.append("Price", values.Price);
    formData.append("CategoryId", values.CategoryId);
    formData.append("Description", values.Description);
    formData.append("UniqueFeatures", values.UniqueFeatures);
    formData.append("Keyofcontents", values.Keyofcontents);
    formData.append("Description", values.Description);
    formData.append("Color", values.Color);
    formData.append("IsFeatured", values.IsFeatured);

    formData.append("Video", values.Video);

    apiClient
      .post(apiName, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then(() => {
        message.success(
          state
            ? "Template Updated Successfully"
            : "Template Added Successfully"
        );
        navigate(-1);
      })
      .catch(({ response }) => {
        const { data } = response;
        ServerErrorMessage(data);
      });
  };

  const handleFinishFailed = () => {
    // form.setFields([
    //   {
    //     name: "UniqueFeatures",
    //     errors: ["Please Input the requried Field"],
    //   },
    // ]);
  };
  const handleColorChange = ({ target }) => {
    setColorInputbg(target.value);
  };
  return (
    <div className={"custom-card-body"}>
      <Form
        layout={"vertical"}
        onFinish={onFinish}
        onFinishFailed={handleFinishFailed}
        form={form}
        initialValues={
          state
            ? {
              Images: state.images,
              ZipFile: state.zipFile,
              IsFeatured: state.isFeatured,
            }
            : { IsFeatured: false }
        }
      >
        <div className="row mb-3">
          <div className="col-md-12">
            <FormUpload
              name="Images"
              multiple={true}
              defaultFileList={state?.images}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <FormTextInput name={"Video"} label={"Video Link"} />
            <FormTextInput name={"Name"} label={"Template Name"} />
          </div>
          <div className="col-6">
            <FormTextAreaInput name={"Description"} label={"Description"} />
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <Form.Item
              label="Category"
              name="CategoryId"
              rules={[
                {
                  required: true,
                  message: "Please input Category",
                },
              ]}
            >
              <Select className={"primary-input"}>
                {CategoryData.map((option, index) => {
                  return (
                    <Select.Option key={option.id} value={option.id}>
                      {option.categoryName}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </div>
          <div className="col-3">
            <FormTextInput name={"Price"} label={"Price "} />
          </div>
          <div className="col-3">
            <Form.Item
              name="Color"
              label="Color"
              rules={[
                {
                  required: true,

                  message: "Invalid Color Input",
                  pattern: /^#([0-9a-f]{3}|[0-9a-f]{6})$/i,
                },
                {
                  max: 7,
                  message: "cant be greater than 7",
                },
              ]}
              onChange={handleColorChange}
            >
              <Input className="primary-input w-100 input-field" />
            </Form.Item>
          </div>
          <div className="col-2 align-self-center">
            <div
              style={{
                background: ColorInputbg,
                width: "44px",
                height: "44px",
              }}
            ></div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <Form.Item
              name="UniqueFeatures"
              rules={[
                {
                  validator: async (_, names) => {
                    if (!names) {
                      return Promise.reject(new Error("Input Required"));
                    } else {
                      return Promise.resolve();
                    }
                  },
                },
              ]}
              label="Uniqure Features"
            >
              <TextAreaCkEditor
                name="UniqueFeatures"
                defaultData={state ? state?.uniqueFeatures : "<ul><li></li></ul>"}
                form={form}
              />
            </Form.Item>
            {/* <FormTextAreaInput
              name={"UniqueFeatures"}
              label={"Unique Features"}
            /> */}
          </div>
          <div className="col-6">
            <Form.Item
              name="Keyofcontents"
              rules={[
                {
                  validator: async (_, names) => {
                    if (!names) {
                      console.log(!names);
                      return Promise.reject(new Error("Input Req"));
                    } else {
                      return Promise.resolve();
                    }
                  },
                },
              ]}
              label="Key of contents"
            >
              <TextAreaCkEditor
                name="Keyofcontents"
                defaultData={state ? state.keyofcontents : "<ul><li></li></ul>"}
                form={form}
              />
            </Form.Item>
            {/* <FormTextAreaInput
              name={"Keyofcontents"}
              label={"Key of Contents"}
            /> */}
          </div>
        </div>

        <div className="col-6">
          <Form.Item
            label="Zip File"
            name="ZipFile"
            rules={[{ required: true, message: "Zip file is requied" }]}
          >
            <Dragger
              maxCount={1}
              className="zipUpload"
              accept=".zip, .rar"
              {...props}
            >
              <p className="text-zipUpload f-12">Upload Source Files here.</p>
            </Dragger>
          </Form.Item>
        </div>

        <div>
          <Form.Item name="IsFeatured" valuePropName="checked">
            <Checkbox defaultChecked={false}>
              <p className="f-16 fw-600">Is Featured</p>{" "}
            </Checkbox>
          </Form.Item>
        </div>

        <div className="col-md-12  d-flex justify-content-end mt-4">
          <Button className="transparent--btn m-2" onClick={() => navigate("/admin/template")}>{"Cancel"}</Button>
          <Button htmlType="submit" className="primary--btn m-2">
            {"Save"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Index;
