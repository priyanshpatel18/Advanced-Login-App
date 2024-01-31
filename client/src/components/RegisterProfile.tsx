import React, { ChangeEvent, useRef } from 'react';
import profileImage from "../assets/profile.png";

type propsType = {
  profilePreview: string | null
  handleProfileChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function ProfileRegister({ profilePreview, handleProfileChange }: propsType): React.JSX.Element {
  const fileInputRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  function handleProfileClicked(): void {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  return (
    <div className="profileImage" onClick={handleProfileClicked}>
      {profilePreview ? (
        <img src={profilePreview} alt="profileImage" />
      ) : (
        <img src={profileImage} alt="profileImage" />
      )}
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleProfileChange}
      />
    </div>
  )
}
