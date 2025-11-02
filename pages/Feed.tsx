import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import GameCard from '../components/GameCard';
import { MOCK_GAMES, MOCK_NEWS, MOCK_ACTIVITY } from '../data/mock';
import type { User, Game, NewsArticle, Activity } from '../types';
import NewsModal from '../components/NewsModal';

interface FeedProps {
  user: User;
}

const GameSection: React.FC<{ title: string, games: Game[] }> = ({ title, games }) => {
  const [visibleCount, setVisibleCount] = useState(4);
  const gamesToShow = games.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount(prev => Math.min(prev + 6, games.length));
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 gap-4">
        {gamesToShow.map(game => (
          <div key={game.id}>
              <GameCard game={game} />
          </div>
        ))}
      </div>
      {visibleCount < games.length && (
        <div className="mt-4 text-center">
          <button
            onClick={handleShowMore}
            className="text-brand-light-purple font-semibold text-sm hover:underline"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

const ActivityItem: React.FC<{ activity: Activity }> = ({ activity }) => {
    const location = useLocation();
    const activityTextMap = {
        review: 'reviewed',
        backlog: 'added to their backlog',
        playing: 'started playing',
        wishlist: 'wishlisted',
        dropped: 'dropped'
    };
    const activityText = activityTextMap[activity.type] || `updated status for`;

    return (
        <div className="bg-content-bg p-3 rounded-xl flex items-start space-x-4">
            <Link to={`/game/${activity.game.id}`} state={{ from: location.pathname }} className="flex-shrink-0">
                <img src={activity.game.coverUrl} alt={activity.game.title} className="w-16 h-20 object-cover rounded-md bg-dark-bg" />
            </Link>
            <div className="flex-grow">
                <p className="text-sm text-light-text leading-snug">
                    <Link to={`/profile/${activity.user.username}`} state={{ from: location.pathname }} className="font-bold text-brand-light-purple hover:underline">{activity.user.username}</Link>
                    {' '}
                    {activityText}
                    {' '}
                    <Link to={`/game/${activity.game.id}`} state={{ from: location.pathname }} className="font-bold hover:underline">{activity.game.title}</Link>
                    {activity.type === 'review' && activity.details && (
                        <span className="text-light-text/80 italic">: {activity.details}</span>
                    )}
                </p>
                <p className="text-xs text-subtle-text mt-1">{activity.timestamp}</p>
            </div>
        </div>
    );
};


const FriendsActivity: React.FC = () => (
    <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">From Friends</h2>
        <div className="space-y-3">
            {MOCK_ACTIVITY.map(activity => (
                <ActivityItem key={activity.id} activity={activity} />
            ))}
        </div>
    </div>
);

const GamesContent: React.FC<{ onNewsClick: (article: NewsArticle) => void }> = ({ onNewsClick }) => (
    <>
        <GameSection title="Popular This Week" games={MOCK_GAMES} />
        <GameSection title="Staff Picks" games={[...MOCK_GAMES].reverse()} />
        <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Gaming News</h2>
            <button
                onClick={() => onNewsClick(MOCK_NEWS[0])}
                className="w-full text-left bg-content-bg p-4 rounded-xl shadow-lg transform hover:scale-[1.02] transition-transform duration-300 group hover:shadow-brand-purple/30"
            >
                <p className="font-bold text-light-text group-hover:text-brand-light-purple transition-colors">{MOCK_NEWS[0].title}</p>
                <p className="text-sm text-subtle-text mt-1">{MOCK_NEWS[0].summary}</p>
            </button>
        </div>
        <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Upcoming Releases</h2>
             <button
                onClick={() => onNewsClick(MOCK_NEWS[1])}
                className="w-full text-left bg-content-bg p-4 rounded-xl shadow-lg transform hover:scale-[1.02] transition-transform duration-300 group hover:shadow-brand-purple/30"
            >
                <p className="font-bold text-light-text group-hover:text-brand-light-purple transition-colors">{MOCK_NEWS[1].title}</p>
                <p className="text-sm text-subtle-text mt-1">{MOCK_NEWS[1].summary}</p>
            </button>
        </div>
    </>
);

const Feed: React.FC<FeedProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null);
  const tabs = ['All', 'Friends', 'Games'];

  return (
    <div>
      <Header title="Feed">
        Welcome back, {user.username}!
      </Header>

      <div className="mb-6">
        <div className="bg-content-bg p-1 rounded-full flex space-x-1">
            {tabs.map(tab => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`${
                        activeTab === tab
                            ? 'bg-dark-bg text-light-text shadow-sm'
                            : 'text-subtle-text hover:text-light-text'
                    } flex-1 whitespace-nowrap py-2 px-1 rounded-full font-semibold text-sm transition-colors`}
                    aria-current={activeTab === tab ? 'page' : undefined}
                >
                    {tab}
                </button>
            ))}
        </div>
      </div>
      
      <div>
        {activeTab === 'All' && (
            <>
                <GameSection title="Popular This Week" games={MOCK_GAMES} />
                <GameSection title="Staff Picks" games={[...MOCK_GAMES].reverse()} />
                <FriendsActivity />
            </>
        )}
        {activeTab === 'Friends' && <FriendsActivity />}
        {activeTab === 'Games' && <GamesContent onNewsClick={setSelectedNews} />}
      </div>

      {selectedNews && <NewsModal article={selectedNews} onClose={() => setSelectedNews(null)} />}
    </div>
  );
};

export default Feed;