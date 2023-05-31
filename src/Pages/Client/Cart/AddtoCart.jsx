import { Button, Form, message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Collapse } from "antd";
import bank1 from "../../../assets/images/PNGS/bank1.png";
import bank2 from "../../../assets/images/PNGS/bank2.png";
import bank3 from "../../../assets/images/PNGS/bank3.png";
import bank4 from "../../../assets/images/PNGS/bank4.png";
import bank5 from "../../../assets/images/PNGS/bank5.png";
import bank6 from "../../../assets/images/PNGS/bank6.png";
import FormTextInput from "../../../Components/Common/FormTextInput";
import InputDatePicker from "../../../Components/Common/InputDatePicker";
import ClientBreadCrumb from "../../../Components/Common/ClientBreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../../store/slicers/templateCartSlice";
import { apiClient } from "../../../utils/AxiosInstance";
import Layout from "../../../Layout/Client/Layout";
import { useTranslation } from "react-i18next";

const { Panel } = Collapse;

function AddtoCart() {
  const { t } = useTranslation();
  const allConfigData = useSelector(
    (state) => state.configDataSlice.allConfigData
  );
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const breadcrumbItems = [
    { title: t("Home"), href: "/home" },
    { title: t("Sales Dashboards"), href: "/templates" },
    { title: t("Cart"), href: "" },
  ];

  const handleCheckoutClick = () => {
    setShowCheckoutForm(true);
  };

  const dispatch = useDispatch();
  const getCartTemplate = useSelector((state) => state.templatecart);

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleFinish = (values) => {
    values = {
      ...values,
      estimatedTax: 10,
      estimatedTotal: 10,
      subTotal: getCartTemplate?.itemList?.reduce((accumulator, el) => {
        return accumulator + el.price;
      }, 0),
      templatess: getCartTemplate?.itemList?.map((el) => {
        return { templateId: el.id };
      }),
    };

    apiClient
      .post("Carts/PaymentForCartTemplates", values)
      .then((result) => {
        message.success("Template Buy Successfull");
        navigate("/templates");
      })
      .catch((err) => {
        if (err.message) {
          message.error(err.message);
        }
      });
  };

  return (
    <Layout
      showFooter={false}
      chatWithUs={true}
      showLogout={true}
      showLogin={false}
      className={"box-shadow"}
    >

      <div className="Cart-page">
        <div className="your-cart">
          <div className="added-carts">
            <div className="cart-bread">
              <ClientBreadCrumb breadcrumbItems={breadcrumbItems} />
            </div>
            <div className="title">
              <h1 style={{ color: allConfigData?.colors?.primary }}>
                {t("Your Cart")}
              </h1>
            </div>
            {getCartTemplate?.itemList?.map((el) => {
              return (
                <div className="carts" key={el?.id}>
                  <div className="cart-img">
                    <img
                      src={el?.images[0]?.imageUrl}
                      width="154px"
                      className="p-2"
                      alt="empty-img.jpg"
                    />
                    <span className="lgs-name">{el?.name}</span>
                    <div className="sm-name-price">
                      <span>{el?.name}</span>
                      <span className="price">{el?.price}</span>
                    </div>
                  </div>
                  <span className="lgs-price">{el?.price}</span>

                  <Button
                    className="remove-btn"
                    onClick={() => removeItem(el.id)}
                  >
                    {t("Remove")}
                  </Button>
                </div>
              );
            })}
          </div>
          <div className="payment-section">
            <h1>{t("Instructions")}</h1>
            <div className="accordian">
              <Collapse ghost>
                <Panel header={t("How do I purchase a template from your website?")} key="1">
                  <p>{t("To purchase a template, simply browse through our collection and select the one that suits your needs. Click on the template to view more details and click the 'Buy Now' or 'Add to Cart' button. Follow the checkout process, enter your payment information, and once the purchase is complete, you'll receive a download link for your template.")}</p>
                </Panel>
                <Panel header={t("Do you offer refunds on template purchases?")} key="2">
                  <p>{t("As digital products, our templates are non-refundable. However, if you encounter any technical issues or have concerns about your purchase, please contact our customer support team, and we'll be happy to assist you.")}</p>
                </Panel>
              </Collapse>
            </div>

            {!showCheckoutForm && (
              <div className="">
                <h1 className="summary-title">{t("Summary")}</h1>
                <div className="summary-detail">
                  <div className="payment-details">
                    <span>{t("SubTotal")}</span>
                    <span className="SAR">
                      {getCartTemplate?.itemList?.reduce((accumulator, el) => {
                        return accumulator + el.price;
                      }, 0)}{" "}
                      {t("SAR")}
                    </span>
                  </div>
                  <div className="payment-details">
                    <span>{t("Estimated tax")}</span>
                    <span className="SAR">0 {t("SAR")}</span>
                  </div>
                  <div className="payment-details">
                    <span>{t("Estimated total")}</span>
                    <span className="SAR">
                      {getCartTemplate?.itemList?.reduce((accumulator, el) => {
                        return accumulator + el.price;
                      }, 0)}{" "}
                      {t("SAR")}
                    </span>
                  </div>
                </div>
                <Button
                  disabled={getCartTemplate?.itemList.length === 0}
                  onClick={handleCheckoutClick}
                  className="checkout-btn"
                >
                  {t("Checkout")}
                </Button>
              </div>
            )}

            {showCheckoutForm && (
              <div className="cart-checkout-form">
                <Form
                  layout="vertical"
                  className={"mt-30"}
                  form={form}
                  onFinish={handleFinish}
                //   onFinishFailed={handleFinishFailed}
                >
                  <div className="cart-payment-card ">
                    <FormTextInput
                      type="name"
                      name="cardHolderName"
                      label={t("Card holder name")}
                      placeholder="jhone Doe"
                      className="payment-input"
                    />
                    <FormTextInput
                      type="number"
                      name="cardNumber"
                      label={t("Card Number")}
                      placeholder="4485252245082162"
                      className="payment-input"
                    />
                    <div className="row">
                      <div className="col">
                        <InputDatePicker
                          type="Number"
                          name="cardExpiryDate"
                          label={t("Expiry Date")}
                          className={"primary-input w-100 input-field"}
                          sheight={"40px"}
                        // className="payment-input"
                        />
                      </div>
                      <div className="col">
                        <FormTextInput
                          type="number"
                          maxLength={3}
                          name="cvv"
                          label="CVV"
                          placeholder="123"
                          className="payment-input"
                        />
                      </div>
                    </div>

                    <p className="my-3">{t("Cards Accepted:")}</p>
                    <div className="d-flex justify-content-around">
                      {[bank1, bank2, bank3, bank4, bank5, bank6].map(
                        (src, index) => (
                          <img key={index} src={src} alt={`bank${index + 1}`} />
                        )
                      )}
                    </div>
                  </div>
                  <div className="">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="checkout-btn"
                      block
                    >
                      {t("Pay Now")}
                    </Button>
                  </div>
                </Form>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AddtoCart;
