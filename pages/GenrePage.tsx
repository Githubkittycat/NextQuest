import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_GAMES } from '../data/mock';
import Header from '../components/Header';
import GameCard from '../components/GameCard';
import { ChevronLeftIcon } from '../components/Icons';
import type { Game } from '../types';

const GenrePage = () => {
  const { genreName } = useParams<{ genreName: string }>();
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');

  const gamesInGenre = useMemo(() => {
    return MOCK_GAMES.filter(game => game.genres.includes(genreName || ''));
  }, [genreName]);

  const availableYears = useMemo(() => {
    const years = new Set(gamesInGenre.map(game => game.releaseYear));
    // FIX: Explicitly type `a` and `b` as numbers. The TypeScript compiler was failing to
    // infer their types correctly, causing an error on the arithmetic operation `b - a`.
    return Array.from(years).sort((a: number, b: number) => b - a); // Sort descending
  }, [gamesInGenre]);

  const availablePlatforms = useMemo(() => {
    const platforms = new Set<string>();
    gamesInGenre.forEach(game => {
        game.platforms.forEach(platform => platforms.add(platform));
    });
    return Array.from(platforms).sort();
  }, [gamesInGenre]);

  const filteredAndSortedGames = useMemo(() => {
    let filtered = gamesInGenre;
    
    if (selectedYear !== 'all') {
        filtered = filtered.filter(game => game.releaseYear.toString() === selectedYear);
    }

    if (selectedPlatform !== 'all') {
        filtered = filtered.filter(game => game.platforms.includes(selectedPlatform));
    }

    // Default sort by rating
    return [...filtered].sort((a: Game, b: Game) => b.avgRating - a.avgRating);
  }, [gamesInGenre, selectedYear, selectedPlatform]);

  if (!genreName) {
    return <div>Genre not found.</div>;
  }

  return (
    <div>
      <div className="flex items-center mb-4">
        <Link to="/explore" className="p-2 -ml-2 text-subtle-text hover:text-light-text">
            <ChevronLeftIcon className="w-6 h-6" />
        </Link>
        <div className="flex-grow">
            <Header title={genreName} />
        </div>
      </div>
      
      <div className="flex justify-end items-center space-x-2 mb-4">
        <select
          value={selectedPlatform}
          onChange={(e) => setSelectedPlatform(e.target.value)}
          className="bg-content-bg border border-gray-600 rounded-md py-1 px-2 text-sm focus:ring-brand-purple focus:border-brand-purple"
        >
          <option value="all">All Platforms</option>
          {availablePlatforms.map(platform => (
            <option key={platform} value={platform}>{platform}</option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="bg-content-bg border border-gray-600 rounded-md py-1 px-2 text-sm focus:ring-brand-purple focus:border-brand-purple"
        >
          <option value="all">All Years</option>
          {availableYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {filteredAndSortedGames.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
            {filteredAndSortedGames.map(game => <GameCard key={game.id} game={game} />)}
        </div>
      ) : (
        <p className="text-center text-subtle-text mt-8">No games found for the selected filters.</p>
      )}
    </div>
  );
};

export default GenrePage;