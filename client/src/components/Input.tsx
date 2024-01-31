import React, { Dispatch, useRef } from 'react';

type propsType = {
  icon: string,
  type: string,
  value: string,
  placeholder: string,
  setFunction: Dispatch<React.SetStateAction<string>>,
  disabled?: boolean
  required?: boolean
}

export default function Input({ icon, type, value, placeholder, setFunction, disabled, required }: propsType): React.JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);

  function focusInput(): void {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  return (
    <>
      <div className="inputContainer" onClick={focusInput}>
        <i className={icon}></i>
        <input
          ref={inputRef}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => setFunction(e.target.value.trim())}
          required={required ?? false}
          disabled={disabled ?? false}
        />
      </div>
    </>
  )
}
