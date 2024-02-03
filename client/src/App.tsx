import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

// Pages Import
import EnterOtpPage from "./pages/EnterOtpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import LoginPage from "./pages/LoginPage";
import PageNotFound from "./pages/PageNotFound";
import RegisterPage from "./pages/RegisterPage";
import ResetPassword from "./pages/ResetPassword";
import UserProfile from "./pages/UserProfile";

export interface Form {
  userName: string;
  email: string;
  password: string;
  profilePicture: File | string | undefined;
  phoneNumber: string;
}

export default function App(): React.JSX.Element {
  const [formData, setFormData] = useState<Form>();

  return (
    <main>
      <Routes>
        <Route path="/" element={<UserProfile />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage setFormData={setFormData} />} />
        <Route path="/verifyEmail" element={<EnterOtpPage formData={formData} />} />
        <Route path="/password/forgot" element={<ForgotPasswordPage />} />
        <Route path="/password/verifyOtp" element={<EnterOtpPage />} />
        <Route path="/password/reset" element={<ResetPassword />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </main>
  )
}