import React from 'react';
import { Link } from 'react-router-dom';
import GoogleRegister from '../components/RegisterGoogle';
import RegisterForm from '../components/RegisterForm';
import { Form } from '../App';

type propsType = {
  setFormData: React.Dispatch<React.SetStateAction<Form | undefined>>
}

export default function RegisterPage({ setFormData }: propsType): React.JSX.Element {
  return (
    <div className="loginContainer">
      <div className="registerWrapper">
        <div className="welcomeText">
          <h1>register</h1>
          <span>Create Your Account</span>
        </div>

        <div className="registerContainer">
          <RegisterForm setFormData={setFormData} />
          <div className="separator"></div>
          <GoogleRegister />
        </div>
        <p>
          Already have an Account? <Link to="/login" className='link'>Login Now</Link>
        </p>
      </div>
    </div>
  )
}
