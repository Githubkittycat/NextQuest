import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import GameCard from './GameCard';
import ListCard from './ListCard';
import { CogIcon, PencilIcon, StarIcon } from './Icons';
import type { Game, LoggedGame, User, Collection } from '../types';

interface ProfileContentProps {
    user: User;
    collection: Collection;
    onEditReview?: (loggedGame: LoggedGame) => void;
    isFriendProfile: boolean;
}

const StatItem: React.FC<{ value: number | string; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center justify-center bg-content-bg p-3 rounded-xl flex-1">
        <p className="text-xl font-bold">{value}</p>
        <p className="text-xs text-subtle-text uppercase tracking-wider mt-1">{label}</p>
    </div>
);

const ProfileContent: React.FC<ProfileContentProps> = ({ user, collection, onEditReview, isFriendProfile }) => {
    const [activeTab, setActiveTab] = useState('Reviews');
    const location = useLocation();
    
    const tabs = ['Reviews', 'Lists', 'Backlog', 'Wishlist', 'Dropped'];
    
    const totalHoursPlayed = collection.reviews.reduce((sum, item) => sum + item.playtimeHours, 0);

    const renderContent = () => {
        switch (activeTab) {
            case 'Reviews':
                return collection.reviews.length > 0
                    ? collection.reviews.map(item => <ReviewItem key={item.game.id} item={item} onEditReview={onEditReview} isFriendProfile={isFriendProfile} />)
                    : <p className="text-center text-subtle-text pt-8">No reviews yet.</p>;
            case 'Lists':
                return <ListsGrid lists={collection.lists} />;
            case 'Backlog':
                return <GameGrid games={collection.backlog} />;
            case 'Wishlist':
                return <GameGrid games={collection.wishlist} />;
            case 'Dropped':
                return <GameGrid games={collection.dropped} />;
            default:
                return null;
        }
    };
    
    return (
        <div>
            <div className="flex items-center space-x-4 mb-6">
                <img src={user.avatarUrl} alt={user.username} className="w-20 h-20 rounded-full border-2 border-brand-purple" />
                <div className="flex-grow">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">{user.username}</h1>
                        {!isFriendProfile && (
                            <Link to="/profile/settings" className="text-subtle-text hover:text-light-text p-1" aria-label="Profile settings">
                                <CogIcon className="w-6 h-6" />
                            </Link>
                        )}
                    </div>
                    <p className="text-subtle-text text-sm">{user.bio}</p>
                </div>
            </div>
            
            {collection.playing.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">Currently Playing</h2>
                    <div className="bg-content-bg p-4 rounded-xl">
                        <ul className="space-y-2">
                            {collection.playing.map(game => (
                                <li key={game.id} className="text-light-text font-semibold truncate">
                                    <Link to={`/game/${game.id}`} state={{ from: location.pathname }} className="hover:text-brand-light-purple hover:underline">{game.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            <div className="flex justify-around text-center my-6 gap-2">
                <StatItem value={collection.reviews.length + collection.playing.length + collection.backlog.length + collection.dropped.length} label="Played" />
                <StatItem value={collection.reviews.filter(r => r.review && r.review.trim()).length} label="Reviews" />
                <StatItem value={user.friends.length} label="Friends" />
                <StatItem value={totalHoursPlayed} label="Hours" />
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Top 4 Games</h2>
                <div className="grid grid-cols-4 gap-2">
                    {user.top4Games.map(game => <GameCard key={game.id} game={game} showTitle={false} />)}
                </div>
            </div>

            {user.friends.length > 0 && !isFriendProfile && (
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">Friends</h2>
                    <div className="flex space-x-4 overflow-x-auto pb-2 -mx-4 px-4">
                        {user.friends.map(friend => (
                            <Link key={friend.id} to={`/profile/${friend.username}`} state={{ from: location.pathname }} className="flex flex-col items-center space-y-1 group flex-shrink-0 w-16">
                                <img src={friend.avatarUrl} alt={friend.username} className="w-16 h-16 rounded-full border-2 border-transparent group-hover:border-brand-light-purple transition-colors" />
                                <span className="text-xs text-subtle-text group-hover:text-light-text truncate w-full text-center">{friend.username}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
            
            <div className="my-6">
                 <div className="border-b border-gray-700">
                    <nav className="-mb-px flex space-x-4 overflow-x-auto no-scrollbar" aria-label="Tabs">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`${
                                    activeTab === tab
                                        ? 'border-brand-light-purple text-brand-light-purple'
                                        : 'border-transparent text-subtle-text hover:text-light-text'
                                } whitespace-nowrap border-b-2 py-3 px-1 text-base font-semibold transition-colors`}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
            
            <div className="min-h-[200px] pt-6">{renderContent()}</div>
        </div>
    );
};

const GameGrid: React.FC<{ games: Game[] }> = ({ games }) => {
    if (games.length === 0) {
        return <p className="text-center text-subtle-text pt-8">This collection is empty.</p>;
    }
    return (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            {games.map(game => <GameCard key={game.id} game={game} showTitle={false} />)}
        </div>
    );
}

const ListsGrid: React.FC<{ lists: any[] }> = ({ lists }) => {
    if (lists.length === 0) {
        return <p className="text-center text-subtle-text pt-8">No lists yet. Create one!</p>;
    }
    return (
        <div className="grid grid-cols-2 gap-4">
            {lists.map(list => <ListCard key={list.id} list={list} />)}
        </div>
    );
}

interface ReviewItemProps {
    item: LoggedGame;
    onEditReview?: (loggedGame: LoggedGame) => void;
    isFriendProfile: boolean;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ item, onEditReview, isFriendProfile }) => (
    <div className="bg-content-bg p-4 rounded-xl mb-4 flex items-start space-x-4">
        <div className="w-20 flex-shrink-0">
             <GameCard game={item.game} showTitle={false} />
        </div>
        <div className="flex-grow">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-lg leading-tight">{item.game.title}</h3>
                    <p className="text-sm text-subtle-text">{item.game.releaseYear}</p>
                </div>
                {item.rating > 0 && (
                    <div className="flex items-center space-x-1 flex-shrink-0">
                        <span className="font-bold text-yellow-400">{item.rating.toFixed(1)}</span>
                        <StarIcon className="w-4 h-4 text-yellow-400" />
                    </div>
                )}
            </div>
            
            {item.review && <p className="text-base text-light-text/90 mt-3 relative pl-4 border-l-2 border-brand-purple/50 whitespace-pre-wrap">{item.review}</p>}
        </div>
        {!isFriendProfile && onEditReview && (
            <button 
              onClick={() => onEditReview(item)} 
              className="flex-shrink-0 text-subtle-text hover:text-brand-light-purple p-2 -mr-2 -mt-2"
              aria-label={`Edit review for ${item.game.title}`}
            >
                <PencilIcon className="w-5 h-5" />
            </button>
        )}
    </div>
);

export default ProfileContent;