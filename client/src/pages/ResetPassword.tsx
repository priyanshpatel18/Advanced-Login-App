import axios from 'axios'
import { useSnackbar } from 'notistack'
import React, { FormEvent, useState } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Input from '../components/Input'

export default function ResetPassword(): React.JSX.Element {
  const [newPassword, setNewPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const { enqueueSnackbar } = useSnackbar();
  const redirect: NavigateFunction = useNavigate();

  function handleResetPassword(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      enqueueSnackbar("Passwords don't match", { variant: "error" })
      return
    }

    axios.post("/user/resetPassword", { newPassword })
      .then((res) => {
        enqueueSnackbar(res.data, { variant: "success" })
        redirect("/login")
      })
      .catch((err) => {
        enqueueSnackbar(err.response.data, { variant: "error" })
      })
  }

  return (
    <div className="loginContainer">
      <div className="resetPassWrapper">
        <div className="welcomeText">
          <h1>Reset password</h1>
        </div>
        <form className="formContainer" onSubmit={handleResetPassword}>
          <Input
            type='password'
            icon='fa-solid fa-lock'
            value={newPassword}
            placeholder='New Password'
            setFunction={setNewPassword}
            required
          />
          <Input
            type='password'
            icon='fa-solid fa-lock'
            value={confirmPassword}
            placeholder='Confirm Password'
            setFunction={setConfirmPassword}
            required
          />
          <Button buttonText='reset password' />
        </form>
      </div>
    </div>
  )
}
