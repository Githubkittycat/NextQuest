import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { GameList } from '../types';
import { UsersIcon } from './Icons';

interface ListCardProps {
  list: GameList;
}

const ListCard: React.FC<ListCardProps> = ({ list }) => {
  const location = useLocation();
  const gamesToShow = list.games.slice(0, 4);
  const placeholders = Array(4 - gamesToShow.length).fill(null);

  return (
    <Link to={`/list/${list.id}`} state={{ from: location.pathname }} className="w-full group block">
      <div className="aspect-square bg-content-bg rounded-xl overflow-hidden shadow-lg transform group-hover:scale-105 transition-transform duration-300 group-hover:shadow-brand-purple/40 group-hover:shadow-2xl">
        <div className="grid grid-cols-2 grid-rows-2 h-full">
          {gamesToShow.map(game => (
            <div key={game.id} className="bg-dark-bg">
              <img src={game.coverUrl} alt={game.title} className="w-full h-full object-cover" />
            </div>
          ))}
          {placeholders.map((_, index) => (
            <div key={`placeholder-${index}`} className="bg-dark-bg flex items-center justify-center">
                <UsersIcon className="w-8 h-8 text-subtle-text/50" />
            </div>
          ))}
        </div>
      </div>
      <h3 className="text-sm font-semibold text-light-text mt-2 truncate group-hover:text-brand-light-purple transition-colors">{list.title}</h3>
      <p className="text-xs text-subtle-text">{list.games.length} games</p>
    </Link>
  );
};

export default ListCard;