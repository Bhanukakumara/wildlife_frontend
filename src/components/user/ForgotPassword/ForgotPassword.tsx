import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../forms/Input/Input';
import Button from '../../common/Button/Button';

interface ForgotPasswordProps {
  onSendResetLink: (email: string) => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onSendResetLink }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendResetLink(email);
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-8">
        <h2 className="text-2xl font-bold text-center mb-8 text-green-800">Reset Your Password</h2>
        
        {isSubmitted ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-full"></div>
            </div>
            <h3 className="text-xl font-bold mb-4 text-green-800">Check Your Email</h3>
            <p className="text-gray-600 mb-6">
              We've sent a password reset link to {email}. Please check your inbox.
            </p>
            <Link to="/login" className="text-green-600 hover:text-green-800 font-medium">
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
              />
            </div>
            
            <Button type="submit" variant="primary" size="large" fullWidth={true}>
              Send Reset Link
            </Button>
            
            <div className="mt-6 text-center">
              <Link to="/login" className="text-green-600 hover:text-green-800 font-medium">
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;