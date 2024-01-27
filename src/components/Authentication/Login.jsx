import React, { useState } from 'react'
import AuthForm from './AuthForm/AuthForm'
import { Link } from 'react-router-dom';

export default function Login(
  // {handleLogin}
  ) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const handleLoginSubmit = () => {
  //   handleLogin(email, password);
  // };

  return (
    <AuthForm
      type="login"
      loginLink={<Link to='/signup'>Регистрация</Link>}
      // handleFormSubmit={handleLoginSubmit}
      setEmail={setEmail}
      setPassword={setPassword}
    />
  );
}