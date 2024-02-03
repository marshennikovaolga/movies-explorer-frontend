import AuthForm from './AuthForm/AuthForm'
import { Link } from 'react-router-dom'

export default function Login({ handleLogin }) {
  return (
    <AuthForm
      type="login"
      loginLink={<Link to='/signup'>Регистрация</Link>}
      onSubmit={handleLogin}
    />
  );
}