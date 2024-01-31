import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { JwtPayload, jwtDecode } from 'jwt-decode'
import { useSnackbar } from 'notistack'
import React from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'

interface CustomJwtPayload extends JwtPayload {
  email: string;
  given_name: string;
  family_name: string;
  picture: string;
}

interface RegisterData {
  email: string
  userName: string
  profilePicture: string
}

export default function GoogleRegister(): React.JSX.Element {
  const { enqueueSnackbar } = useSnackbar()
  const redirect: NavigateFunction = useNavigate();

  return (
    <div className="socialsRegister">
      <GoogleLogin
        onSuccess={(credentialResponse: CredentialResponse) => {
          const decoded: CustomJwtPayload = jwtDecode(credentialResponse.credential!)
          const registerData: RegisterData = {
            email: decoded.email,
            userName: `${decoded.given_name}.${decoded.family_name}`,
            profilePicture: decoded.picture,
          }

          axios.post("/user/googleRegister", registerData)
            .then((res) => {
              enqueueSnackbar(res.data, {
                variant: "success"
              })
              redirect("/login")
            })
            .catch((err) => {
              console.log(err);
              if (err.response.status === 400) {
                redirect("/login");
              }
              enqueueSnackbar(err.response.data, { variant: "error" })
            })
        }}
        onError={() => {
          console.log("Register Failed");
        }}
      />
    </div>
  )
}
