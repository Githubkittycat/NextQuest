import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { SearchIcon } from '../components/Icons';
import { MOCK_GAMES } from '../data/mock';
import type { Game } from '../types';

interface LogGamePageProps {
    onLogGame: (game: Game) => void;
}

const LogGamePage: React.FC<LogGamePageProps> = ({ onLogGame }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    
    const filteredGames = useMemo(() => {
        if (!searchTerm.trim()) {
          return MOCK_GAMES.slice(0, 20); // Show some popular games initially
        }
        return MOCK_GAMES.filter(game =>
          game.title.toLowerCase().includes(searchTerm.toLowerCase())
        ).slice(0, 20);
      }, [searchTerm]);

    const handleSelectGame = (game: Game) => {
        onLogGame(game);
        const from = location.state?.from || '/'; // Get 'from' path or default to home
        navigate(from, { replace: true }); // Go back to previous page, where modal will be open
    };

    return (
        <div>
            <Header title="Log a Game">
                Search for a game you've played.
            </Header>

            <div className="relative mb-6">
                <input 
                  type="text" 
                  placeholder="Search for games..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full bg-content-bg border border-gray-600 rounded-full py-3 px-4 pl-12 text-lg focus:ring-brand-purple focus:border-brand-purple"
                  autoFocus
                />
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-subtle-text" />
            </div>

            <div>
                <ul className="space-y-3">
                  {filteredGames.map(game => (
                    <li key={game.id}>
                      <button 
                        onClick={() => handleSelectGame(game)}
                        className="w-full text-left flex items-center space-x-4 p-2 rounded-lg hover:bg-content-bg transition-colors"
                      >
                        <img src={game.coverUrl} alt={game.title} className="w-12 h-16 object-cover rounded-md flex-shrink-0 bg-dark-bg" />
                        <div>
                            <p className="font-bold text-light-text">{game.title}</p>
                            <p className="text-sm text-subtle-text">{game.releaseYear}</p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
            </div>
        </div>
    );
};

export default LogGamePage;