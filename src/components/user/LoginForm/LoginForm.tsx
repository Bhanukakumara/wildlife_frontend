import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../forms/Input/Input';
import Checkbox from '../../forms/Checkbox/Checkbox';
import Button from '../../common/Button/Button';

interface LoginFormProps {
  onLogin: (email: string, password: string, rememberMe: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password, rememberMe);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />
      </div>
      
      <div className="mb-6">
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <Checkbox
          label="Remember me"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        
        <Link to="/forgot-password" className="text-sm text-green-600 hover:text-green-800">
          Forgot password?
        </Link>
      </div>
      
      <Button type="submit" variant="primary" size="large" fullWidth={true}>
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;