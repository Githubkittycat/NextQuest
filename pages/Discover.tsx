import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { MOCK_GAMES, GENRES } from '../data/mock';
import type { Collection, Game, DiscoverPreferences } from '../types';
import { SparklesIcon } from '../components/Icons';

interface DiscoverProps {
  collection: Collection;
}

const Discover: React.FC<DiscoverProps> = ({ collection }) => {
  const [preferences, setPreferences] = useState<DiscoverPreferences>({
    mood: 'Any',
    genre: 'Any',
    playtime: 'Any',
    platform: 'Any',
  });
  const [recommendedGame, setRecommendedGame] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const platforms = ['PC', 'PS5', 'Xbox', 'Switch'];
  const moods = ['Any', 'Relaxing', 'Challenging', 'Story-driven', 'Fast-paced'];
  const playtimes = ['Any', 'Short (<10h)', 'Medium (10-40h)', 'Long (40h+)'];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPreferences(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setRecommendedGame(null);
    setError(null);

    // Simulate thinking time
    setTimeout(() => {
      const collectionGameIds = new Set([
        ...collection.reviews.map(r => r.game.id),
        ...collection.playing.map(g => g.id),
        ...collection.backlog.map(g => g.id),
        ...collection.wishlist.map(g => g.id),
        ...collection.dropped.map(g => g.id),
      ]);

      let availableGames = MOCK_GAMES.filter(game => !collectionGameIds.has(game.id));
      
      // Apply filters where data is available
      if (preferences.genre !== 'Any') {
        availableGames = availableGames.filter(game => game.genres.includes(preferences.genre));
      }
      if (preferences.platform !== 'Any') {
        availableGames = availableGames.filter(game => game.platforms.includes(preferences.platform));
      }
      // Note: Mood and Playtime filters are cosmetic as mock data doesn't support them.

      if (availableGames.length === 0) {
        setError("Couldn't find a matching game with those preferences. Try broadening your search!");
        setIsLoading(false);
        return;
      }
      
      const randomGame = availableGames[Math.floor(Math.random() * availableGames.length)];
      setRecommendedGame(randomGame);
      setIsLoading(false);
    }, 1000);
  };
  
  const generateReason = () => {
    const reasons = [];
    if (preferences.genre !== 'Any') reasons.push(`you're looking for a ${preferences.genre.toLowerCase()} game`);
    if (preferences.platform !== 'Any') reasons.push(`you want to play on ${preferences.platform}`);
    
    if (reasons.length > 0) {
        return `Because ${reasons.join(' and ')}.`;
    }
    return "Based on your preferences, this could be your next favorite game!";
  };

  return (
    <div>
      <Header title="Discover">
        Tell us what you're in the mood for.
      </Header>
      
      <form onSubmit={handleSubmit} className="bg-content-bg p-6 rounded-lg space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="mood" className="block text-sm font-medium text-subtle-text mb-1">Mood</label>
            <select id="mood" name="mood" value={preferences.mood} onChange={handleChange} className="w-full bg-dark-bg border border-gray-600 rounded-md p-2 focus:ring-brand-purple focus:border-brand-purple">
              {moods.map(mood => <option key={mood} value={mood}>{mood}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-subtle-text mb-1">Genre</label>
            <select id="genre" name="genre" value={preferences.genre} onChange={handleChange} className="w-full bg-dark-bg border border-gray-600 rounded-md p-2 focus:ring-brand-purple focus:border-brand-purple">
              <option value="Any">Any</option>
              {GENRES.map(genre => <option key={genre} value={genre}>{genre}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="playtime" className="block text-sm font-medium text-subtle-text mb-1">Playtime</label>
            <select id="playtime" name="playtime" value={preferences.playtime} onChange={handleChange} className="w-full bg-dark-bg border border-gray-600 rounded-md p-2 focus:ring-brand-purple focus:border-brand-purple">
              {playtimes.map(playtime => <option key={playtime} value={playtime}>{playtime}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="platform" className="block text-sm font-medium text-subtle-text mb-1">Platform</label>
            <select id="platform" name="platform" value={preferences.platform} onChange={handleChange} className="w-full bg-dark-bg border border-gray-600 rounded-md p-2 focus:ring-brand-purple focus:border-brand-purple">
              <option value="Any">Any</option>
              {platforms.map(platform => <option key={platform} value={platform}>{platform}</option>)}
            </select>
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-brand-purple hover:bg-brand-light-purple text-white font-bold py-3 px-8 rounded-lg transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <>
              <SparklesIcon className="w-5 h-5 mr-2" /> Find My NextQuest
            </>
          )}
        </button>
      </form>
      
      {isLoading && !recommendedGame && (
        <div className="text-center p-8">
            <p className="text-subtle-text">Searching the archives for your next adventure...</p>
        </div>
      )}
      
      {error && (
         <div className="text-center p-8 bg-content-bg mt-8 rounded-lg">
            <p className="text-red-400 font-semibold">{error}</p>
        </div>
      )}

      {recommendedGame && (
        <div className="mt-8">
          <h2 className="text-2xl font-extrabold mb-4 tracking-tight">Your NextQuest</h2>
          <div className="bg-gradient-to-br from-content-bg to-gray-800/50 p-4 rounded-2xl shadow-2xl shadow-brand-purple/20 border border-brand-purple/20">
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <Link to={`/game/${recommendedGame.id}`} className="w-full sm:w-32 h-44 object-cover rounded-xl flex-shrink-0 bg-dark-bg self-center transform hover:scale-105 transition-transform duration-300">
                <img src={recommendedGame.coverUrl} alt={recommendedGame.title} className="w-full h-full object-cover rounded-xl" />
              </Link>
              <div className="flex-grow mt-4 sm:mt-0">
                <Link to={`/game/${recommendedGame.id}`}>
                  <h3 className="text-xl font-bold text-light-text hover:text-brand-light-purple hover:underline">{recommendedGame.title}</h3>
                </Link>
                <div className="flex flex-wrap gap-2 my-2">
                  <span className="bg-brand-purple/50 text-brand-light-purple text-xs font-semibold px-3 py-1 rounded-full">{recommendedGame.genres[0]}</span>
                  <span className="bg-brand-purple/50 text-brand-light-purple text-xs font-semibold px-3 py-1 rounded-full">{recommendedGame.platforms[0]}</span>
                </div>
                <p className="text-subtle-text text-sm mt-2">{recommendedGame.description}</p>
                <div className="mt-4 p-3 rounded-lg bg-dark-bg/50">
                    <p className="text-xs font-bold uppercase text-brand-light-purple/80">Why you should play it</p>
                    <p className="text-sm text-light-text font-medium">{generateReason()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Discover;
