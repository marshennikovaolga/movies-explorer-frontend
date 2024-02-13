import AuthForm from './AuthForm/AuthForm'

export default function Login({ handleLogin }) {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    handleLogin(email, password);
};

  return (
    <AuthForm
      type="login"
      onSubmit={handleSubmit}
    />
  );
}