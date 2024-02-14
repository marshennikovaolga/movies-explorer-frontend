import { useContext } from 'react'
import AuthForm from './AuthForm/AuthForm'
import ErrorContext from '../../contexts/ErrorContext'

export default function Register({ handleRegister }) {
  const { error: contextError } = useContext(ErrorContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    handleRegister(name, email, password);
  };

  const errorMessage = 'Произошла ошибка. Попробуйте еще раз.';

  return (
    <AuthForm
      type="register"
      onSubmit={handleSubmit}
      errorMessage={contextError || errorMessage}
    />
  );
}
