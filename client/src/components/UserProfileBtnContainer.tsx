import axios from 'axios';
import { useSnackbar } from 'notistack';
import React from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

type propsType = {
  isUpdateMode: boolean
  isSaving: boolean
  setIsUpdateMode: React.Dispatch<React.SetStateAction<boolean>>
}

export default function UserProfileBtnContainer({ isUpdateMode, setIsUpdateMode, isSaving }: propsType): React.JSX.Element {
  const redirect: NavigateFunction = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  function handleUpdate(): void {
    setIsUpdateMode(!isUpdateMode);
  }

  function handleLogOut(): void {
    axios.post("/user/logout")
      .then((res) => {
        redirect("/login");
        enqueueSnackbar(res.data, {
          variant: "success"
        });
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar(err.response.data, {
          variant: "error"
        })
      })
  }

  return (
    <div className="btnContainer">
      {isUpdateMode ?
        (
          <button
            className='btn saveBtn'
            type='submit'
            form='profileForm'
            disabled={isSaving}
          >
            Save
          </button>
        )
        :
        (
          <div className='btn updateBtn' onClick={handleUpdate}>
            Update
          </div>
        )
      }
      <div className='btn logoutBtn' onClick={handleLogOut}>
        Logout
      </div>
    </div>
  )
}
