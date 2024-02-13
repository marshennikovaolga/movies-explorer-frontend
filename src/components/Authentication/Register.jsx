import React from 'react';
import AuthForm from './AuthForm/AuthForm';

export default function Register({ handleRegister }) {

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    handleRegister(name, email, password);
  };

  return (
    <AuthForm
      type="register"
      onSubmit={handleSubmit}
    />
  );
}