import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { Game } from '../types';

interface GameCardProps {
  game: Game;
  showTitle?: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ game, showTitle = true }) => {
  const location = useLocation();
  return (
    <Link to={`/game/${game.id}`} state={{ from: location.pathname }} className="w-full group block">
      <div className="aspect-[2/3] bg-content-bg rounded-xl overflow-hidden shadow-lg transform group-hover:scale-105 transition-transform duration-300 group-hover:shadow-brand-purple/40 group-hover:shadow-2xl">
        <img src={game.coverUrl} alt={game.title} className="w-full h-full object-cover" />
      </div>
      {showTitle && (
        <h3 className="text-sm font-semibold text-light-text mt-2 truncate group-hover:text-brand-light-purple transition-colors">{game.title}</h3>
      )}
    </Link>
  );
};

export default GameCard;