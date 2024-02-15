import AuthForm from './AuthForm/AuthForm'

export default function Register({ handleRegister }) {
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    try {
      await handleRegister(name, email, password);
    } catch (error) {
      console.error('Ошибка регистрации', error);
    }
  };

  return (
    <AuthForm
      type="register"
      onSubmit={handleSubmit}
    />
  );
}