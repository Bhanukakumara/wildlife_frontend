import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../forms/Input/Input';
import Button from '../../common/Button/Button';

interface RegisterFormProps {
  onRegister: (name: string, email: string, password: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    onRegister(name, email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <Input
          label="Full Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
        />
      </div>
      
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
      
      <div className="mb-6">
        <Input
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          fullWidth
        />
      </div>
      
      <Button type="submit" variant="primary" size="large" fullWidth={true}>
        Create Account
      </Button>
      
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-green-600 hover:text-green-800 font-medium">
            Sign in here
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;