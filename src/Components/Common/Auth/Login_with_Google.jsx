import {
  GoogleLogin,
  hasGrantedAllScopesGoogle,
  useGoogleLogin,
} from "@react-oauth/google";
import { message } from "antd";
import Google from "../../../assets/images/PNGS/google.png";
import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userLogin } from "../../../store/slicers/authSlice";
import { useNavigate } from "react-router-dom";

function Login_with_Google() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginviaGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then(({ data }) => {
          console.log(data);
          const info = { name: data.name, email: data.email };

          const saveUserInfo = axios.post(
            "http://api.prime-levels.com/api/Authentication/LoginWithGoogle",
            info
          ).then(({data}) => {
            dispatch(userLogin(data));
            message.success("login successfully");
            navigate('/');
            // window.location.href = '/'
          }).catch((err) => {
            
          });
        })
        .catch((err) => {});
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  return <img onClick={loginviaGoogle} src={Google} alt="" />;
}

export default Login_with_Google;
