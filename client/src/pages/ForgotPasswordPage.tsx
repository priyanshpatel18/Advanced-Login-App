import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { FormEvent, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';

export default function ForgotPasswordPage(): React.JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const redirect: NavigateFunction = useNavigate()

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true)

    axios.post("/user/sendMail", { email })
      .then((res) => {
        redirect("/password/verifyOtp")
        enqueueSnackbar(res.data, {
          variant: "success"
        })
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar(err.response.data, {
          variant: "error"
        })
        if (err.response.status === 402) {
          redirect("/login")
        }
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <div className="loginContainer">
      <div className="forgotWrapper">
        <div className="welcomeText">
          <span>Forgot Your Password?</span>
          <p className='forgotText'>That's no fun. Enter your email and we'll send you instructions to reset your password.</p>
        </div>
        <form className='formContainer' method='POST' onSubmit={handleSubmit}>
          <Input
            type='text'
            value={email}
            setFunction={setEmail}
            placeholder='Email'
            icon="fa-regular fa-envelope icon"
            disabled={isSubmitting}
            required
          />
          <Button
            buttonText="Email Some Help"
            disabled={isSubmitting}
          />
        </form>
        <p className='forgotText'>Remember to check your spam folder if you can't find the message.</p>
      </div>
    </div>
  )
}
