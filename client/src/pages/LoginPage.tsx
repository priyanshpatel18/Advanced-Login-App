import axios from 'axios';
import { useSnackbar } from "notistack";
import React, { FormEvent, useState } from 'react';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import SocialRegister from '../components/LoginGoogle';

interface LoginCredentials {
  userNameOrEmail: string
  password: string
}

export default function LoginPage(): React.JSX.Element {
  const [userNameOrEmail, setUserNameOrEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  const { enqueueSnackbar } = useSnackbar()
  const redirect: NavigateFunction = useNavigate()

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    setIsLoggingIn(true)

    const formData: LoginCredentials = {
      userNameOrEmail: userNameOrEmail.toLowerCase(),
      password: password
    }

    axios
      .post("/user/login", formData)
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
      .finally(() => {
        setIsLoggingIn(false)
      })
  }

  return (
    <div className="loginContainer">
      <div className="loginWrapper">
        <div className="welcomeText">
          <h1>welcome back</h1>
          <span>Sign In to Your Account</span>
        </div>
        <div className="loginOptions">
          <form className='formContainer' onSubmit={handleSubmit}>
            <Input
              type='text'
              value={userNameOrEmail}
              setFunction={setUserNameOrEmail}
              placeholder='Username or Email'
              icon="fa-solid fa-envelope icon"
              required
            />
            <Input
              type='password'
              value={password}
              setFunction={setPassword}
              placeholder='Password'
              icon="fa-solid fa-lock icon"
              required
            />
            <Link to="/password/forgot" className='link forgotLink'>
              Forgot your password?
            </Link>
            <Button buttonText="Sign In" disabled={isLoggingIn} />
          </form>
          <div className="separator"></div>
          <SocialRegister />
        </div>
        <p>
          Don't have an account? <Link to="/register" className='link'>Register Now</Link>
        </p>
      </div>
    </div >
  )
}
