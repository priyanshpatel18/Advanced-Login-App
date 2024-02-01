import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { FormEvent, useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export default function EnterOtpPage(): React.JSX.Element {
  const [inputOtp, setInputOtp] = useState<string>('');
  const [timer, setTimer] = useState<number>(60);
  const refs: React.RefObject<HTMLInputElement>[] = Array.from({ length: 6 }).map(() => React.createRef());
  const { enqueueSnackbar } = useSnackbar();
  const redirect: NavigateFunction = useNavigate()
  const [email, setEmail] = useState<string>("");

  function handleResendOtp(): void {
    setTimer(60)

    axios.post("/user/sendMail", { email })
      .then((res) => {
        enqueueSnackbar(res.data, {
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

  function handleOtpInputChange(e: React.ChangeEvent<HTMLInputElement>, index: number): void {
    const newOtp: string[] = inputOtp.split('');
    newOtp[index] = e.target.value;
    setInputOtp(newOtp.join(''));

    if (e.target.value && index < 5) {
      refs[index + 1].current?.focus();
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>, index: number): void {
    if (event.key === 'Backspace' && !inputOtp[index] && index > 0) {
      refs[index - 1].current?.focus();
    }
  }

  useEffect(() => {
    const intervalId: NodeJS.Timeout = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer]);

  function handleVerify(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    axios.get("/user/getEmail")
      .then((res) => {
        setEmail(res.data.email)
      })
      .catch((err) => {
        console.log(err);
      })

    axios.post("/user/verifyOtp", { inputOtp: inputOtp })
      .then((res) => {
        setEmail(res.data.email);
        redirect("/password/reset");
        enqueueSnackbar(res.data.message, {
          variant: "info"
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
    <div className="loginContainer">
      <div className="otpInputWrapper">
        <div className="welcomeText">
          <h1>otp verification</h1>
          <span>One Time Password (OTP) has been sent via mail to you email</span>
          <p>Enter the OTP below to verify it.</p>
        </div>
        <form method='POST' className="formContainer" onSubmit={handleVerify}>
          <div className="otpInput">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                className="otpInputBox"
                type="text"
                maxLength={1}
                value={inputOtp[index] || ''}
                onChange={(e) => handleOtpInputChange(e, index)}
                ref={refs[index]}
                onKeyDown={(e) => handleKeyDown(e, index)}
                autoFocus={index === 0}
                required
              />
            ))}
          </div>
          <div className="resendSection">
            {timer > 0 ? (
              <span>Resend OTP in {timer} seconds</span>
            ) : (
              <span onClick={handleResendOtp} className='link'>Resend OTP</span>
            )}
          </div>
          <button className="verifyBtn" type='submit'>
            verify
          </button>
        </form>
      </div>
    </div>
  )
}
