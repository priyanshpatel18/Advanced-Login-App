import React from 'react'
import Input from './Input';

type propsType = {
  userEmail: string | undefined
  isUpdateMode: boolean
  userName: string
  phoneNumber: string
  setUserName: React.Dispatch<React.SetStateAction<string>>
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>
}

export default function UpdateUserDetails({ userEmail, isUpdateMode, userName, phoneNumber, setUserName, setPhoneNumber }: propsType): React.JSX.Element {
  return (
    <div className="userInformation">
      <h1>{userEmail?.toLowerCase()}</h1>
      <div className="contactDetails">
        {isUpdateMode ?
          (
            <>
              <Input
                type='number'
                icon='fa-solid fa-phone'
                placeholder='Phone Number'
                value={phoneNumber}
                setFunction={setPhoneNumber}
                required={false}
              />
              <Input
                type='text'
                icon="fa-regular fa-id-card"
                placeholder='Email'
                value={userName}
                setFunction={setUserName}
              />
            </>
          )
          :
          (
            <>
              <div className='inputContainer'>
                <i className='fa-solid fa-phone'></i>
                {phoneNumber || "Phone Number"}
              </div>
              <div className='inputContainer' style={{ marginBottom: 0 }}>
                <i className='fa-regular fa-id-card'></i>
                {userName}
              </div>
            </>
          )
        }
      </div>
    </div>
  )
}
