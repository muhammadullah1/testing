import React, { useCallback, useEffect, useState } from "react";
import SearchInput from "../Common/SearchInput";
import { Tabs, Button, Select, Skeleton, Input } from "antd";
import TemplateCard from "./TemplateCard";
import Shareicon from "../../assets/images/PNGS/shareicon.png";
import { apiClient } from "../../utils/AxiosInstance";
import useTemplateFilterHook from "../../CustomHook/TemplateFilterHook";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

function TemplatesDetailsPage() {
  const { t } = useTranslation();
  const [hovered, setHovered] = useState(false);
  const [filterColors, setfilterColors] = useState([]);
  // const categoryId = location.state?.categoryId;
  const { state } = useLocation();
  // console.log("categoruyyyyy  Id", state?.categoryId);

  // -----------------------------
  // Custom Hook for Tempalte Page
  // -----------------------------

  const { filter, setFilter, data, isLoading, handleSearch } =
    useTemplateFilterHook(
      "ClientSideTemplates/TemplateByCategoryId",
      "templateFilterQuery"
    );

  // -----------------------------
  // Tempalte Page Category Data and Fetch Request
  // -----------------------------
  const [TemplateCategory, setTemplateCategory] = useState([]);
  const getCategories = useCallback(async () => {
    try {
      const { data } = await apiClient.get("Templates/GetCategoryDropdownList");
      setTemplateCategory(data);

      setFilter({
        ...filter,
        categoryId: state?.categoryId ? state.categoryId : data[0]?.id,
      });
    } catch (error) { }
  }, []);
  useEffect(() => {
    getCategories();
    apiClient
      .get("ClientSideTemplates/GetAllColorsForTemplates")
      .then(({ data }) => {

        setfilterColors(data);
      })
      .catch((err) => { });
  }, []);

  // useEffect(() => {
  //   if (state?.categoryId) {
  //     console.log(state,'state location cid');
  //     setFilter({ ...filter, categoryId: state?.categoryId });
  //   }
  // }, [state]);

  const getTemplatesbyCategories = (id) => {
    setFilter({ ...filter, categoryId: id });
  };

  const handleTemplateSearch = ({ target }) => {
    setFilter({ ...filter, TemplateName: target.value });
  };
  const handleTemplateStatus = (target) => {
    // console.log(target)
    setFilter({ ...filter, filter: target });
  };
  const handlePriceChange = ({ target }) => {
    console.log(target.value);
    setFilter({ ...filter, fromPrice: 0, toPrice: target.value });
  };
  const handleColorFilter = (target) => {
    console.log(target.value);
    setFilter({ ...filter, color: target });
  };
  return (
    <div className="templates-details">
      <div className="page-data">
        <div className="search-bar">
          <SearchInput
            placeholder={t("Search template")}
            onChange={handleTemplateSearch}
          />
        </div>
        <div className="">
          <Button
            className="sm-share-btn"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <img className="share-img" src={Shareicon} alt="" />
            <span className="share-text">Share</span>
          </Button>
        </div>
        <div className="select-inputs">
          <div className="select-custome-input1">
            <Select
              className={`primary-input w-100`}
              defaultValue="2"
              onSelect={handleTemplateStatus}
              options={[
                { label: t('All'), value: "1" },
                { label: t('Most recent'), value: "2" },
                { label: t('Most selling'), value: "3" },
              ]}
            />
          </div>
          <div className="select-custome-input2">
            <Input
              type="number"
              className="primary-input w-100 input-field"
              placeholder={t("Price")}
              onChange={handlePriceChange}
            />
          </div>
          <div className="select-custome-input3">
            <Select
              onChange={handleColorFilter}
              className="primary-input w-100"
              placeholder={t("Color")}
              popupClassName="colorSelectFilter"
            >
              {filterColors?.map((el) => {
                return (
                  <Select.Option key={el}>
                    <span
                      style={{
                        width: "39px",
                        borderRadius: "50%",
                        height: "39px",
                        backgroundColor: el,
                        display: "inline-block",
                      }}
                    ></span>
                  </Select.Option>
                );
              })}
            </Select>
          </div>
          <div className="">
            <Button
              className="share-btn"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <img className="share-img" src={Shareicon} alt="" />
              {hovered && <span className="share-text">{t("Share")}</span>}
            </Button>
          </div>
        </div>
      </div>
      <div className="usermanagments-tab px-5 mx-auto">
        <Tabs
          activeKey={state?.categoryId}
          className="template-Tabs"
          onChange={getTemplatesbyCategories}
        >
          {TemplateCategory?.map((el, i) => {
            return (
              <Tabs.TabPane key={el?.id} tab={el?.categoryName}>
                <Skeleton loading={isLoading}>
                  <TemplateCard TemplateData={data} />
                </Skeleton>
              </Tabs.TabPane>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
}

export default TemplatesDetailsPage;
