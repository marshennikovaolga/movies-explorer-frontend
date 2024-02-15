import AuthForm from './AuthForm/AuthForm'

export default function Login({ handleLogin }) {

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

  return (
    <AuthForm
      type="login"
      onSubmit={handleSubmit}
    />
  );
}