import { Form, Button } from "antd";
import FormTextInput from "./FormTextInput";
import InputDatePicker from "./InputDatePicker";
import bank1 from "../../assets/images/PNGS/bank1.png";
import bank2 from "../../assets/images/PNGS/bank2.png";
import bank3 from "../../assets/images/PNGS/bank3.png";
import bank4 from "../../assets/images/PNGS/bank4.png";
import bank5 from "../../assets/images/PNGS/bank5.png";
import bank6 from "../../assets/images/PNGS/bank6.png";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";


function ServiceRequestPayment({ onFinish, title, classname }) {
  const { t } = useTranslation();
  const allConfigData = useSelector((state) => state.configDataSlice.allConfigData);

  const [form] = Form.useForm();

  return (
    <div
      className={`payment-card mx-auto p-4 ${(classname ="cart-payment-card")}`}>
      <p className={"text-center f-22 fw-600 text-primary my-4"}>{title}</p>
      <Form
        layout="vertical"
        className={"mt-30"}
        form={form}
        onFinish={onFinish}
      >
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
        />
        <div className="row">
          <div className="col">
            <InputDatePicker
              type="Number"
              name={"CardExpiryDate"}
              label={t("Expiry Date")}
              className={"primary-input w-100 input-field"}
              sheight={"40px"}
            />
          </div>
          <div className="col">
            <FormTextInput
              type="number"
              name={"cvv"}
              label={t("CVV")}
              placeholder="123"
            />
          </div>
        </div>

        <p className="my-3">{t("Cards Accepted:")}</p>
        <div className="d-flex justify-content-around">
          {[bank1, bank2, bank3, bank4, bank5, bank6].map((bank, index) => (
            <img key={index} src={bank} alt={`bank${index + 1}`} />
          ))}
        </div>

        <div className="my-3">
          <Button
            type="primary"
            htmlType="submit"
            className="primary--btn mt-3"
            block
            style={{ backgroundColor: allConfigData?.colors?.primary === undefined ? '#FFC641' : allConfigData?.colors?.primary }}
          >
            {t("Pay Now")}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default ServiceRequestPayment;

