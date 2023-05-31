import React from "react";
import TemplatesCollections from "../Common/TemplateCollection";
import AboutPrime from "./AboutPrime";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../utils/AxiosInstance";
import { useTranslation } from "react-i18next";

function OurCollection() {
  const { t } = useTranslation();
  const allConfigData = useSelector(
    (state) => state.configDataSlice.allConfigData
  );

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `ClientSideTemplates/GetClientTemplates`
      );
      return data;
    },
    cacheTime: 0,
  });

  console.log(data,'is the data')

  return (
    <div className="collections">
      <div className="collection-heading">
        <h1 className="collection-h1">
          {t("OUR")} <span className="collection-span">{t("COLLECTION")}</span>{" "}

        </h1>
        <p className="w-50 my-3">
          {t("These templates have been handpicked by our experts to showcase the best and most popular designs across various categories. From eye-catching website templates to professionally designed presentations, we have you covered.")}

        </p>
      </div>
      <div className="">
        {data?.data?.length > 0 &&
          data?.data?.map((el) => {
            return (
              <TemplatesCollections
                heading1={el?.name}
                key={el.id}
                elkey={el?.id}
                // heading2=" Dashboards"
                img={el?.images && el?.images[0]?.imageUrl}
                img2={el?.images && el?.images[1]?.imageUrl}
                parag={el?.description}
                link={`templates/details/${el?.id}`}
                bgPrimary={
                  allConfigData?.colors?.primary
                    ? allConfigData?.colors?.primary
                    : "#F5CB5C"
                }
                bgSecondary={
                  allConfigData?.colors?.secondary
                    ? allConfigData?.colors?.secondary
                    : "#CFDBD5"
                }
              />
            );
          })}
      </div>
      <div className="about-prime">
        <AboutPrime bgPrimary={allConfigData?.colors?.primary} />
      </div>
    </div>
  );
}

export default OurCollection;
