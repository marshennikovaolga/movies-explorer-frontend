import AuthForm from './AuthForm/AuthForm'
import React, { useContext } from 'react'
import ErrorContext from '../../contexts/ErrorContext'

export default function Login({ handleLogin }) {
  const { error: contextError } = useContext(ErrorContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    try {
      await handleLogin(email, password);
    } catch (error) {
      console.error('Ошибка авторизации:', error);
    }
  };

  const errorMessage = 'Произошла ошибка. Попробуйте еще раз.';

  return (
      <AuthForm
          type="login"
          onSubmit={handleSubmit}
          errorMessage={contextError || errorMessage} 
      />
  );
}