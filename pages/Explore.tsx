import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { GENRE_DETAILS, MOCK_GAMES } from '../data/mock';
import { SearchIcon, XIcon } from '../components/Icons';

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGames = useMemo(() => {
    if (!searchTerm.trim()) {
      return [];
    }
    return MOCK_GAMES.filter(game =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 10);
  }, [searchTerm]);

  return (
    <div>
      <Header title="Explore">
        Find your next favorite game.
      </Header>

      <div className="relative mb-6">
        <input 
          type="text" 
          placeholder="Search for games..." 
          className="w-full bg-content-bg border border-gray-600 rounded-full py-2 px-4 pl-10 focus:ring-brand-purple focus:border-brand-purple"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-subtle-text" />
        {searchTerm && (
            <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-subtle-text hover:text-light-text"
                aria-label="Clear search"
            >
                <XIcon className="w-5 h-5" />
            </button>
        )}
        
        {searchTerm && (
            <div className="absolute top-full mt-2 w-full bg-content-bg rounded-lg shadow-lg z-10 max-h-[60vh] overflow-y-auto border border-gray-700/50">
                {filteredGames.length > 0 ? (
                    <ul>
                        {filteredGames.map(game => (
                            <li key={game.id}>
                                <Link
                                    to={`/game/${game.id}`}
                                    onClick={() => setSearchTerm('')}
                                    className="flex items-center space-x-4 p-3 hover:bg-brand-purple/20 transition-colors"
                                >
                                    <img src={game.coverUrl} alt={game.title} className="w-10 h-14 object-cover rounded-md flex-shrink-0 bg-dark-bg" />
                                    <div>
                                        <p className="font-semibold text-light-text">{game.title}</p>
                                        <p className="text-sm text-subtle-text">{game.releaseYear}</p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-subtle-text p-4">No games found.</p>
                )}
            </div>
        )}
      </div>

      <div className={`mb-8 ${searchTerm ? 'opacity-50 blur-sm pointer-events-none' : 'opacity-100'}`}>
        <h2 className="text-xl font-bold mb-4">Genres</h2>
        <div className="grid grid-cols-2 gap-4">
          {GENRE_DETAILS.map(genre => {
            const Icon = genre.icon;
            return (
              <Link
                key={genre.name}
                to={`/genre/${genre.name}`}
                className="bg-content-bg p-4 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-brand-purple transition-colors duration-200 group"
              >
                <Icon className="w-8 h-8 text-brand-light-purple group-hover:text-white transition-colors" />
                <span className="font-semibold text-light-text group-hover:text-white transition-colors">{genre.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default Explore;