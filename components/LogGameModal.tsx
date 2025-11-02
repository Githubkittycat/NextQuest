import React, { useState } from 'react';
import StarRating from './StarRating';
import { XIcon } from './Icons';
import type { Game, LoggedGame } from '../types';

interface LogGameModalProps {
  onClose: () => void;
  game: Game;
  loggedGame?: LoggedGame | null;
  onLogSubmit: (loggedGame: LoggedGame) => void;
  onDeleteReview: (gameId: string) => void;
}

const LogGameModal: React.FC<LogGameModalProps> = ({ onClose, game, loggedGame, onLogSubmit, onDeleteReview }) => {
  const isEditing = !!loggedGame;

  const [rating, setRating] = useState(loggedGame?.rating || 0);
  const [platform, setPlatform] = useState(loggedGame?.platformPlayed || game.platforms[0] || '');
  const [playtime, setPlaytime] = useState(loggedGame?.playtimeHours?.toString() || '');
  const [review, setReview] = useState(loggedGame?.review || '');
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLoggedGame: LoggedGame = {
      ...loggedGame,
      game,
      logDate: loggedGame?.logDate || new Date().toISOString(),
      platformPlayed: platform,
      playtimeHours: Number(playtime) || 0,
      rating,
      review,
    };
    onLogSubmit(newLoggedGame);
  };

  const handleConfirmDelete = () => {
    if (loggedGame) {
      onDeleteReview(loggedGame.game.id);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-content-bg rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-subtle-text hover:text-light-text">
            <XIcon className="w-6 h-6" />
          </button>
          
          {isConfirmingDelete ? (
            <div>
              <h2 className="text-2xl font-bold mb-2">Delete Review?</h2>
              <p className="text-subtle-text mb-6">
                Are you sure you want to permanently delete your review for <span className="font-bold text-brand-light-purple">{game.title}</span>? This action cannot be undone.
              </p>
              <div className="flex justify-end items-center pt-4 space-x-4">
                <button
                  type="button"
                  onClick={() => setIsConfirmingDelete(false)}
                  className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-2">{isEditing ? 'Edit Review' : 'Log Game'}</h2>
              <p className="text-subtle-text mb-6">You played <span className="font-bold text-brand-light-purple">{game.title}</span></p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-subtle-text mb-1">Your Rating</label>
                  <StarRating value={rating} onChange={setRating} />
                </div>

                <div>
                  <label htmlFor="platform" className="block text-sm font-medium text-subtle-text mb-1">Platform</label>
                  <select 
                    id="platform" 
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full bg-dark-bg border border-gray-600 rounded-md p-2 focus:ring-brand-purple focus:border-brand-purple"
                  >
                    {game.platforms.map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="playtime" className="block text-sm font-medium text-subtle-text mb-1">Playtime (hours)</label>
                  <input 
                    type="number" 
                    id="playtime" 
                    value={playtime}
                    onChange={(e) => setPlaytime(e.target.value)}
                    className="w-full bg-dark-bg border border-gray-600 rounded-md p-2 focus:ring-brand-purple focus:border-brand-purple" 
                    placeholder="e.g., 40" 
                  />
                </div>

                <div>
                  <label htmlFor="review" className="block text-sm font-medium text-subtle-text mb-1">Review (optional)</label>
                  <textarea 
                    id="review" 
                    rows={4} 
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="w-full bg-dark-bg border border-gray-600 rounded-md p-2 focus:ring-brand-purple focus:border-brand-purple" 
                    placeholder="What did you think?"
                  ></textarea>
                </div>

                <div className="flex justify-end items-center pt-4 space-x-4">
                    {isEditing && (
                        <button
                            type="button"
                            onClick={() => setIsConfirmingDelete(true)}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
                        >
                            Delete Review
                        </button>
                    )}
                    <button type="submit" className="bg-brand-purple hover:bg-brand-light-purple text-white font-bold py-2 px-6 rounded-lg transition-colors">
                        {isEditing ? 'Save Changes' : 'Log Game'}
                    </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogGameModal;