import React, { useRef } from 'react'

type propsType = {
  isUpdateMode: boolean
  profilePreview: string
  handleProfileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function UserProfilePicture({ isUpdateMode, profilePreview, handleProfileChange }: propsType): React.JSX.Element {
  const fileInputRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  function handleProfileClicked(): void {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  return (
    <div className="profileImage" onClick={handleProfileClicked}>
      <img src={profilePreview} alt="profilePicture" />
      {isUpdateMode ?
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleProfileChange}
        />
        :
        <></>
      }
    </div>
  )
}
