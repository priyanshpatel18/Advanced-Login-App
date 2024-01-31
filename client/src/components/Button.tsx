import React from 'react';

type propsType = {
  buttonText: string;
  image?: string;
  imageName?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Button({
  buttonText,
  image,
  imageName,
  disabled,
  onClick,
}: propsType): React.JSX.Element {
  return (
    <button type="submit" disabled={disabled} onClick={onClick}>
      {buttonText}
      {image && <img src={image} alt={imageName} />}
    </button>
  );
}
