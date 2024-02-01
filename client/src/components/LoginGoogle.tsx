import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { useSnackbar } from 'notistack';
import React from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

interface CustomJwtPayload extends JwtPayload {
  email: string;
  given_name: string;
  family_name: string;
  picture: string;
}

interface LoginData {
  email: string
  userName: string
}

export default function SocialRegister(): React.JSX.Element {
  const { enqueueSnackbar } = useSnackbar();
  const redirect: NavigateFunction = useNavigate()

  function onSuccess(credentialResponse: CredentialResponse): void {
    const decoded: CustomJwtPayload = jwtDecode(credentialResponse.credential!)
    const loginData: LoginData = {
      email: decoded.email,
      userName: `${decoded.given_name}.${decoded.family_name}`
    }

    axios.post("/user/googleLogin", loginData)
      .then((res) => {
        enqueueSnackbar(res.data, {
          variant: "success",
        });
        redirect("/");
      })
      .catch((err) => {
        enqueueSnackbar(err.response.data, {
          variant: "error",
        });
      })
  }

  function onError(): void {
    console.log("Login Failed");
  }

  return (
    <div className="socialsRegister">
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
      />
    </div>
  )
}
