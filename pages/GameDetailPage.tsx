import React, { useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { MOCK_GAMES } from '../data/mock';
import { ChevronLeftIcon, StarIcon, CycleImageIcon } from '../components/Icons';
import GameStatusSelector from '../components/GameStatusSelector';
import type { Game, Collection, GameStatus } from '../types';

interface GameDetailPageProps {
    collection: Collection;
    onUpdateGameStatus: (game: Game, status: GameStatus) => void;
}

const GameDetailPage: React.FC<GameDetailPageProps> = ({ collection, onUpdateGameStatus }) => {
  const { gameId } = useParams<{ gameId: string }>();
  const game = MOCK_GAMES.find(g => g.id === gameId);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  
  if (!game) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold">Game Not Found</h2>
        <Link to="/explore" className="text-brand-light-purple hover:underline mt-4 inline-block">
          Back to Explore
        </Link>
      </div>
    );
  }
  
  const allBanners = [game.bannerUrl, ...game.screenshots].filter(Boolean);

  const handleBannerChange = () => {
    setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % allBanners.length);
  };

  const handleBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate(-1); // Fallback to browser history
    }
  };

  return (
    <div className="-mx-4 -mt-4">
        <div className="relative h-56 group">
            <img src={allBanners[currentBannerIndex]} alt={`${game.title} banner`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/70 to-transparent"></div>
             <button onClick={handleBack} className="absolute top-4 left-4 bg-black/50 rounded-full p-2 z-10 text-white hover:bg-black/75">
                <ChevronLeftIcon className="w-6 h-6" />
            </button>
            {allBanners.length > 1 && (
                <button 
                    onClick={handleBannerChange}
                    className="absolute bottom-4 right-4 bg-black/50 rounded-full p-2 z-10 text-white hover:bg-black/75 transition-opacity opacity-0 group-hover:opacity-100"
                    aria-label="Change banner image"
                >
                    <CycleImageIcon className="w-5 h-5" />
                </button>
            )}
        </div>

        <div className="p-4 -mt-24 relative z-10 flex items-end space-x-4">
            <img src={game.coverUrl} alt={game.title} className="w-28 h-40 object-cover rounded-xl shadow-2xl flex-shrink-0 border-4 border-content-bg" />
            <div className="pb-2">
                <h1 className="text-2xl font-bold text-light-text drop-shadow-md">{game.title}</h1>
                <p className="text-sm text-subtle-text font-medium">{game.publisher}, {game.releaseYear}</p>
            </div>
        </div>
        
        <div className="p-4 space-y-8">
            <div className="flex items-center space-x-2">
                <div className="flex items-center text-yellow-400">
                    <StarIcon className="w-5 h-5"/>
                    <span className="font-bold text-lg ml-1">{game.avgRating.toFixed(1)}</span>
                </div>
                <span className="text-subtle-text text-sm">/ 5.0 from the community</span>
            </div>

            <div className="flex space-x-2">
                <GameStatusSelector game={game} collection={collection} onStatusChange={onUpdateGameStatus} />
            </div>

            <div>
                <h2 className="text-lg font-bold mb-2">About</h2>
                <p className="text-subtle-text leading-relaxed">{game.description}</p>
            </div>

            <div>
                <div className="flex flex-wrap gap-2">
                    {game.genres.map(g => <span key={g} className="bg-content-bg text-xs font-semibold px-3 py-1 rounded-full">{g}</span>)}
                    {game.platforms.map(p => <span key={p} className="bg-gray-700/50 text-xs font-semibold px-3 py-1 rounded-full">{p}</span>)}
                </div>
            </div>

            <div>
                <h2 className="text-lg font-bold mb-3">Community Reviews</h2>
                <div className="space-y-4">
                    {game.reviews.map((review, index) => (
                        <div key={index} className="bg-content-bg p-3 rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                                <p className="font-semibold text-sm text-brand-light-purple">{review.username}</p>
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <StarIcon key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-600'}`} />
                                    ))}
                                </div>
                            </div>
                            <p className="text-sm text-light-text italic">"{review.text}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default GameDetailPage;