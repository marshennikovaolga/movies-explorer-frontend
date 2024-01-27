import React, { useState } from 'react'
import AuthForm from './AuthForm/AuthForm'
import { Link } from 'react-router-dom';

export default function Register(
  // { handleRegister }
  ) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const handleRegisterSubmit = () => {
  //   handleRegister(email, password);
  // };

  return (
    <AuthForm
      type="register"
      loginLink={<Link to='/signin'>Войти</Link>}
      // handleFormSubmit={handleRegisterSubmit}
      setEmail={setEmail}
      setPassword={setPassword}
    />
  );
}