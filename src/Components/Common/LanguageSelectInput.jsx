
import { Select } from "antd";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import{ globeicon} from "../../assets/images/SVGS/globeicon.svg";
import { DownOutlined } from "@ant-design/icons";

function LangSelectInput({ border = true, className }) {
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const storedLang = window.localStorage.getItem("lang");
    if (storedLang) {
      i18n.changeLanguage(storedLang);
      document.documentElement.setAttribute("lang", storedLang);
      document.body.dir = i18n.dir(storedLang);
    }
  }, [i18n]);

  const switchLang = (val) => {
    window.localStorage.setItem("lang", val);
    i18n.changeLanguage(val);
    document.documentElement.setAttribute("lang", val);
    document.body.dir = i18n.dir(val);
  };

  return (
    <Select
      defaultValue={window.localStorage.getItem("lang")}
      className={className}
      onChange={switchLang}
      style={{ width: 100 }} 
      suffixIcon={<DownOutlined />}
      bordered={border}
      options={[
        {
          value: "en",
          label: <span className="">{t("English")}</span>,
        },
        {
          value: "ar",
          label: <span className="">{t("Arabic")}</span>,
        },
      ]}
    />
  );
}

export default LangSelectInput;
