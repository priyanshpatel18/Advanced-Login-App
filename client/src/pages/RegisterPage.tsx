import React from 'react';
import { Link } from 'react-router-dom';
import GoogleRegister from '../components/RegisterGoogle';
import RegisterForm from '../components/RegisterForm';

export default function RegisterPage(): React.JSX.Element {

  return (
    <div className="loginContainer">
      <div className="registerWrapper">
        <div className="welcomeText">
          <h1>register</h1>
          <span>Create Your Account</span>
        </div>

        <div className="registerContainer">
          <RegisterForm />
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
