import React, {
    useState,
    createContext,
    useContext,
    useCallback,
} from "react";
import { useTranslation } from "react-i18next";
const languageContext = createContext();
export const useLanguage = () => useContext(languageContext);

export default function LanguageProvider(props) {
    const { i18n, t } = useTranslation();

    // -------------------------------
    // Set The Language State Variable
    // -------------------------------
    const [language, setLanguage] = useState(
        window.localStorage.getItem("lang")
            ? window.localStorage.getItem("lang")
            : "en"
    );
    // -------------------------------
    // Set The RTL State Variable
    // -------------------------------
    const [isRTL, setisRTL] = useState(
        window.localStorage.getItem("lang") === "ar" ? true : false
    );
    // -----------------------------------------------
    // Conditional Showing the Text in the App Function
    // ------------------------------------------------
    const getLangtext = (nameEnglish, nameArabic) => {
        return isRTL && nameArabic
            ? nameArabic
            : nameEnglish
                ? nameEnglish
                : nameArabic;
    };
    // -----------------------------------------------
    // Update the language of the App
    // ------------------------------------------------
    const updateLanguage = useCallback(
        (current) => {
            window.localStorage.setItem("lang", current);
            i18n.changeLanguage(current);
            setLanguage(current);
            setisRTL(current === "ar" ? true : false);
            window.location.reload();
        },
        [language]
    );
  

    return (
        <languageContext.Provider
            value={{ language, updateLanguage, getLangtext, t }}
        >
            {props?.children}
        </languageContext.Provider>
    );
}
