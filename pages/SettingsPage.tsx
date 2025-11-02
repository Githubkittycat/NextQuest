import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import type { User, Game } from '../types';
import Header from '../components/Header';
import GameSearchModal from '../components/GameSearchModal';
import { ChevronLeftIcon, PlusCircleIcon } from '../components/Icons';

interface SettingsPageProps {
  user: User;
  onUpdateUser: (user: User) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ user, onUpdateUser }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
  const [top4Games, setTop4Games] = useState<Game[]>(user.top4Games);
  const [editingGameIndex, setEditingGameIndex] = useState<number | null>(null);

  const handleGameSelected = (selectedGame: Game) => {
    if (editingGameIndex !== null) {
      const newTop4 = [...top4Games];
      newTop4[editingGameIndex] = selectedGame;
      setTop4Games(newTop4);
    }
  };

  const handleSaveChanges = () => {
    onUpdateUser({
      ...user,
      username,
      bio,
      avatarUrl,
      top4Games,
    });
    navigate('/profile');
  };
  
  const generateRandomAvatar = () => {
    const seed = Math.random().toString(36).substring(7);
    setAvatarUrl(`https://picsum.photos/seed/${seed}/200/200`);
  };

  return (
    <div>
       <GameSearchModal
        isOpen={editingGameIndex !== null}
        onClose={() => setEditingGameIndex(null)}
        onSelectGame={handleGameSelected}
      />
      <div className="flex items-center -ml-2">
        <Link to="/profile" className="p-2 text-subtle-text hover:text-light-text">
          <ChevronLeftIcon className="w-6 h-6" />
        </Link>
        <Header title="Settings" />
      </div>

      <div className="space-y-8">
        <div className="bg-content-bg p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Profile Information</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-subtle-text mb-1">Username</label>
              <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-dark-bg border border-gray-600 rounded-md p-2 focus:ring-brand-purple focus:border-brand-purple" />
            </div>
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-subtle-text mb-1">Bio / Tagline</label>
              <textarea id="bio" rows={3} value={bio} onChange={e => setBio(e.target.value)} className="w-full bg-dark-bg border border-gray-600 rounded-md p-2 focus:ring-brand-purple focus:border-brand-purple"></textarea>
            </div>
            <div>
                <label htmlFor="avatarUrl" className="block text-sm font-medium text-subtle-text mb-1">Avatar URL</label>
                <div className="flex items-center space-x-2">
                    <input type="text" id="avatarUrl" value={avatarUrl} onChange={e => setAvatarUrl(e.target.value)} className="flex-grow w-full bg-dark-bg border border-gray-600 rounded-md p-2 focus:ring-brand-purple focus:border-brand-purple" />
                    <button onClick={generateRandomAvatar} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm">
                        Random
                    </button>
                </div>
            </div>
          </div>
        </div>
        
        <div className="bg-content-bg p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Edit Top 4 Games</h2>
            <p className="text-subtle-text text-sm mb-4">Click a slot to change the featured game.</p>
            <div className="grid grid-cols-4 gap-4">
              {top4Games.map((game, index) => (
                <button 
                  key={`${game.id}-${index}`} 
                  onClick={() => setEditingGameIndex(index)} 
                  className="relative group aspect-[2/3] bg-dark-bg rounded-lg overflow-hidden ring-2 ring-transparent hover:ring-brand-purple transition-all duration-200 focus:outline-none focus:ring-brand-light-purple"
                  aria-label={`Change game for slot ${index + 1}`}
                >
                  <img src={game.coverUrl} alt={game.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <PlusCircleIcon className="w-8 h-8 text-white" />
                  </div>
                </button>
              ))}
            </div>
        </div>

        <div className="flex justify-end">
          <button onClick={handleSaveChanges} className="bg-brand-purple hover:bg-brand-light-purple text-white font-bold py-2 px-6 rounded-lg transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;