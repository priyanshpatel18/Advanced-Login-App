import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { FormEvent, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import Button from './Button';
import Input from './Input';
import ProfileRegister from './RegisterProfile';
import { Form } from '../App';

type propsType = {
  setFormData: React.Dispatch<React.SetStateAction<Form | undefined>>;
};

export default function RegisterForm({ setFormData }: propsType): React.JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [profilePicture, setProfilePicture] = useState<string | File>();
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  const { enqueueSnackbar } = useSnackbar()
  const redirect: NavigateFunction = useNavigate()
  const [isRegistering, setIsRegistering] = useState<boolean>(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    setIsRegistering(true)

    const newFormData: Form = {
      userName,
      email,
      password,
      profilePicture: profilePicture,
      phoneNumber: ""
    };
    setFormData(newFormData);

    axios.post("/user/sendVerificationMail", { email })
      .then((res) => {
        redirect("/verifyEmail")
        enqueueSnackbar(res.data.message, {
          variant: "success"
        })
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar(err.response.data, {
          variant: "error"
        })
      })
  }

  function handleProfileChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const file: File | null = e.target.files && e.target.files[0]
    if (file) {
      setProfilePicture(file);
      setProfilePreview(URL.createObjectURL(file))
    }
  }

  return (
    <form className="formContainer" onSubmit={handleSubmit}>
      <ProfileRegister
        profilePreview={profilePreview}
        handleProfileChange={handleProfileChange}
      />
      <Input
        type='text'
        value={email}
        setFunction={setEmail}
        placeholder='Email'
        icon="fa-regular fa-envelope icon"
        required
      />
      <Input
        type='text'
        value={userName}
        setFunction={setUserName}
        placeholder='Username'
        icon="fa-regular fa-id-card"
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
      <Button
        buttonText='Register'
        disabled={isRegistering}
      />
    </form>
  )
}
