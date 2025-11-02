import React, { useState, useMemo } from 'react';
import { MOCK_GAMES } from '../data/mock';
import type { Game } from '../types';
import { SearchIcon, XIcon } from './Icons';

interface GameSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectGame: (game: Game) => void;
}

const GameSearchModal: React.FC<GameSearchModalProps> = ({ isOpen, onClose, onSelectGame }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGames = useMemo(() => {
    if (!searchTerm.trim()) {
      return [];
    }
    return MOCK_GAMES.filter(game =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 10);
  }, [searchTerm]);

  if (!isOpen) {
    return null;
  }

  const handleSelect = (game: Game) => {
    onSelectGame(game);
    setSearchTerm('');
    onClose();
  };
  
  const handleClose = () => {
    setSearchTerm('');
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-content-bg rounded-lg shadow-xl w-full max-w-md max-h-[90vh] flex flex-col">
        <div className="p-4 border-b border-gray-700 flex-shrink-0">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Search for a Game</h2>
            <button onClick={handleClose} className="text-subtle-text hover:text-light-text">
              <XIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="relative mt-4">
            <input
              type="text"
              placeholder="e.g., Elden Ring"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-dark-bg border border-gray-600 rounded-full py-2 px-4 pl-10 focus:ring-brand-purple focus:border-brand-purple"
              autoFocus
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-subtle-text" />
          </div>
        </div>
        <div className="overflow-y-auto p-4">
          {searchTerm && filteredGames.length > 0 && (
            <ul className="space-y-2">
              {filteredGames.map(game => (
                <li key={game.id}>
                  <button
                    onClick={() => handleSelect(game)}
                    className="w-full text-left flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <img src={game.coverUrl} alt={game.title} className="w-10 h-14 object-cover rounded-md flex-shrink-0" />
                    <span className="font-semibold">{game.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
           {searchTerm && filteredGames.length === 0 && (
            <p className="text-center text-subtle-text py-8">No games found.</p>
           )}
           {!searchTerm && (
            <p className="text-center text-subtle-text py-8">Start typing to search for a game.</p>
           )}
        </div>
      </div>
    </div>
  );
};

export default GameSearchModal;