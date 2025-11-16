import { useEffect, useState } from 'react';
import { Card, Title, Button, Input } from '@kiwi-ui';
import './Login.scss';
import { useAuthDetails } from '@redux/auth/auth.hook';
import { useNavigate } from 'react-router';
import Logger from '@services/logger.service';
import analytics from '@services/analytics.service';

const Login = () => {
  const [form, setForm] = useState({
    username: 'jamesd',
    password: 'jamesdpass',
  });
  const { isUserLoggedIn, postLoginUser } = useAuthDetails();
  const navigate = useNavigate();
  useEffect(() => {
    if (isUserLoggedIn) navigate('/home'); // Redirect to dashboard if user is logged in
  }, [isUserLoggedIn]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic here
    alert(`Username: ${form.username}\nPassword: ${form.password}`);
    Logger.info('User Login Initiated', { action: 'login' });
    analytics.track('User Login Initiated', { username: form.username });
    postLoginUser(form);
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <Title
          level={2}
          style={{ textAlign: 'center', marginBottom: '1.5rem' }}
        >
          Login
        </Title>
        <form className="login-form" onSubmit={handleSubmit}>
          <Input
            type="text"
            name="username"
            placeholder="username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <Button type="submit">Login</Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
