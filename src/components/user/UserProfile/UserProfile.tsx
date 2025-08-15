import React, { useState } from 'react';
import Input from '../../forms/Input/Input';
import Button from '../../common/Button/Button';

interface UserProfileProps {
  user: {
    name: string;
    email: string;
    joinDate: string;
  };
  onUpdateProfile: (name: string, email: string) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onUpdateProfile }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(name, email);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-green-800">Profile Information</h2>
      
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
          <p className="text-gray-600">
            Member since: {user.joinDate}
          </p>
        </div>
        
        <Button type="submit" variant="primary" size="medium">
          Update Profile
        </Button>
      </form>
    </div>
  );
};

export default UserProfile;