import React, { useCallback, useEffect, useState } from "react";
import { apiClient } from "../../utils/AxiosInstance";
import chaticon from "../../assets/images/SVGS/chaticon.svg";
const ChatWithUsButton = () => {
  const [SocialMediaLinks, setSocialMediaLinks] = useState([]);
  const getSocialMediaLinks = useCallback(async () => {
    try {
      const { data } = await apiClient.get(
        `Configurations/GetSocialMediaLinks`
      );
      setSocialMediaLinks(data);
    } catch (error) {}
  }, []);
  useEffect(() => {
    getSocialMediaLinks();
  }, []);

  return (
    <a
      href={`https://wa.me/${SocialMediaLinks?.whatsapp}`}
      className="chat-withus position-fixed "
      target="_blank"
      rel="noreferrer"
    >
      <img className="chat" src={chaticon} alt="image3" />
    </a>
  );
};

export default ChatWithUsButton;
