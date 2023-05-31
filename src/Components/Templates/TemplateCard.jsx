import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/slicers/templateCartSlice";
import CheckIsAuthenticate from "../../Constants/CheckIsAuthenticate";
import { useTranslation } from "react-i18next";
function Sales({ TemplateData }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const addOnCart = (templateRecord) => {
    if (CheckIsAuthenticate(authState)) {
      const { id, name, images, price } = templateRecord;
      dispatch(addToCart({ id, name, images, price }));
    } else {
      navigate("/login");
    }
  };
  const buyNow = (data) => {
    if (CheckIsAuthenticate(authState)) {
      navigate("/templates/buynow", { state: { template: data } });
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <div className="template-Grid">
        {TemplateData?.length > 0 &&
          TemplateData?.map((el) => (
            <span key={el?.id} className="templateCard">
              <Link to={"/templates/details/" + el?.id}>
                <img className="templateImg" src={el?.images[0]?.imageUrl} />
              </Link>
              <div className="cardActions">
                <div className="cardBtn">
                  <Button
                    className="btn-primary_"
                    onClick={() => buyNow(el)}
                  >
                    {t("Buy Now")}
                  </Button>
                  <Button
                    className="btn-primary_"
                    onClick={() => addOnCart(el)}
                  >
                    {t("Add To Cart")}
                  </Button>
                </div>
              </div>
            </span>
          ))}
      </div>
    </div>
  );
}

export default Sales;
