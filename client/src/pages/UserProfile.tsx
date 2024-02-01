import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { FormEvent, useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import defaultUser from "../assets/profile.png";
import UserProfileBtnContainer from '../components/UserProfileBtnContainer';
import UserProfilePicture from '../components/UserProfilePicture';
import UpdateUserDetails from '../components/UserUpdateDetails';

interface User {
  profilePicture: string;
  userName: string;
  email: string;
  phoneNumber: number;
}

export default function UserProfile(): React.JSX.Element {
  const [user, setUser] = useState<User>();

  const [email, setEmail] = useState<string>("");

  const [userName, setUserName] = useState<string>("");
  const [originalUserName, setOriginalUserName] = useState<string>("");

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [originalPhoneNumber, setOriginalPhoneNumber] = useState<string>("");

  const [profilePicture, setProfilePicture] = useState<string | File>();
  const [profilePreview, setProfilePreview] = useState<string>(defaultUser);

  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false)

  const { enqueueSnackbar } = useSnackbar();
  const redirect: NavigateFunction = useNavigate();

  useEffect(() => {
    axios.get("/user", { withCredentials: true })
      .then((res) => {
        setUser(res.data);
        setEmail(res.data.email);

        setUserName(res.data.userName);
        setOriginalUserName(res.data.userName);

        setPhoneNumber(res.data.phoneNumber);
        setOriginalPhoneNumber(res.data.phoneNumber);

        setProfilePicture(res.data.profilePicture);
        if ((res.data.profilePicture).includes("cloudinary")) {
          setProfilePreview(res.data.profilePicture);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 501 || err.response.status === 401) {
          redirect("/login");
          enqueueSnackbar(err.response.data, {
            variant: "error"
          });
        }
      });
  }, [enqueueSnackbar, redirect]);

  function handleSave(e: FormEvent): void {
    e.preventDefault();
    setIsUpdateMode(true);

    if (
      phoneNumber === originalPhoneNumber &&
      userName === originalUserName &&
      profilePicture === profilePreview
    ) {
      enqueueSnackbar("Change the Original values to Update", {
        variant: "warning"
      });
      return;
    }

    const formData: FormData = new FormData();
    formData.append("email", email);
    formData.append("userName", userName);
    formData.append("originalUserName", originalUserName);
    formData.append("phoneNumber", phoneNumber);
    formData.append("originalPhoneNumber", originalPhoneNumber);
    if (profilePicture instanceof File) {
      formData.append("profilePicture", profilePicture);
    }

    setIsSaving(true)
    axios.put("/user/update", formData)
      .then((res) => {
        enqueueSnackbar(res.data, {
          variant: "success"
        });
        setOriginalUserName(userName);
        setOriginalPhoneNumber(phoneNumber);
        setProfilePicture(profilePreview);
      })
      .catch((err) => {
        enqueueSnackbar(err.response.data, {
          variant: "error"
        });
        console.log(err);
        setUserName(originalUserName)
        setPhoneNumber(originalPhoneNumber)
        setProfilePicture(profilePicture)
      })
      .finally(() => {
        setIsUpdateMode(false)
        setIsSaving(false)
      })
  }

  function handleProfileChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const file: File | null = e.target.files && e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setProfilePreview(URL.createObjectURL(file));
    }
  }

  return (
    <div className='userProfileContainer'>
      <div className="welcomeText">
        <h1>Hello There!</h1>
        <span>Welcome to Our World</span>
      </div>
      <form
        method='PUT'
        className="formContainer"
        onSubmit={handleSave}
        id='profileForm'
      >
        <UserProfilePicture
          isUpdateMode={isUpdateMode}
          profilePreview={profilePreview}
          handleProfileChange={handleProfileChange}
        />
        <UpdateUserDetails
          userEmail={user?.email}
          isUpdateMode={isUpdateMode}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          userName={userName}
          setUserName={setUserName}
        />
        <UserProfileBtnContainer
          isUpdateMode={isUpdateMode}
          setIsUpdateMode={setIsUpdateMode}
          isSaving={isSaving}
        />
      </form >
    </div >
  );
}
