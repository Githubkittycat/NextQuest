import React, { useState } from 'react';
import Header from '../components/Header';
import { SparklesIcon } from '../components/Icons';

interface OnboardingPageProps {
  onLogin: (username: string, bio: string) => void;
}

const OnboardingPage: React.FC<OnboardingPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && bio.trim()) {
      onLogin(username, bio);
    }
  };

  return (
    <div className="container mx-auto max-w-lg h-screen flex items-center justify-center p-4">
      <div className="w-full">
        <div className="text-center mb-8">
            <SparklesIcon className="w-12 h-12 text-brand-purple mx-auto mb-2" />
            <Header title="Welcome to NextQuest">
                Create your gamer profile to get started.
            </Header>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-content-bg p-8 rounded-lg shadow-lg space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-subtle-text mb-1">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              className="w-full bg-dark-bg border border-gray-600 rounded-md p-3 focus:ring-brand-purple focus:border-brand-purple" 
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password"className="block text-sm font-medium text-subtle-text mb-1">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="w-full bg-dark-bg border border-gray-600 rounded-md p-3 focus:ring-brand-purple focus:border-brand-purple" 
              placeholder="••••••••"
              required
            />
          </div>
           <div>
            <label htmlFor="username" className="block text-sm font-medium text-subtle-text mb-1">Username</label>
            <input 
              type="text" 
              id="username" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              className="w-full bg-dark-bg border border-gray-600 rounded-md p-3 focus:ring-brand-purple focus:border-brand-purple" 
              placeholder="Your Gamer Tag"
              required
            />
          </div>
           <div>
            <label htmlFor="bio" className="block text-sm font-medium text-subtle-text mb-1">Tagline</label>
            <input 
              type="text" 
              id="bio" 
              value={bio} 
              onChange={e => setBio(e.target.value)} 
              className="w-full bg-dark-bg border border-gray-600 rounded-md p-3 focus:ring-brand-purple focus:border-brand-purple" 
              placeholder="e.g., Lover of indie gems and RPGs"
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-brand-purple hover:bg-brand-light-purple text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
            disabled={!username.trim() || !bio.trim() || !email.trim() || !password.trim()}
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnboardingPage;