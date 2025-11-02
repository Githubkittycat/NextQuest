import React from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { MOCK_USERS, MOCK_COLLECTIONS } from '../data/mock';
import GameCard from '../components/GameCard';
import { ChevronLeftIcon, PencilIcon } from '../components/Icons';
import type { User } from '../types';

interface ListPageProps {
    currentUser: User;
}

const ListPage: React.FC<ListPageProps> = ({ currentUser }) => {
    const { listId } = useParams<{ listId: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    
    // In a real app, this would be a single API call. Here we search all mock collections.
    let list, author;
    for (const collection of MOCK_COLLECTIONS.values()) {
        const foundList = collection.lists.find(l => l.id === listId);
        if (foundList) {
            list = foundList;
            author = MOCK_USERS.find(u => u.id === list.authorId);
            break;
        }
    }

    if (!list || !author) {
        return (
            <div className="text-center py-10">
                <h2 className="text-2xl font-bold">List Not Found</h2>
                <Link to="/profile" className="text-brand-light-purple hover:underline mt-4 inline-block">
                    Back to your Profile
                </Link>
            </div>
        );
    }

    const isAuthor = currentUser.id === author.id;

    const handleBack = () => {
        // Navigate back to the 'from' location if it exists in state, otherwise go to the author's profile as a fallback.
        if (location.state?.from) {
            navigate(location.state.from);
        } else {
            const fallbackPath = isAuthor ? '/profile' : `/profile/${author.username}`;
            navigate(fallbackPath);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <button onClick={handleBack} className="flex items-center text-subtle-text hover:text-light-text -ml-2 p-1">
                    <ChevronLeftIcon className="w-6 h-6" />
                    <span className="ml-1 font-medium">Back</span>
                </button>
                {isAuthor && (
                    <Link to={`/list/edit/${list.id}`} className="flex items-center bg-content-bg hover:bg-gray-700 text-light-text font-bold py-2 px-4 rounded-lg transition-colors text-sm">
                        <PencilIcon className="w-4 h-4 mr-2" />
                        Edit
                    </Link>
                )}
            </div>

            <div className="mb-6">
                <h1 className="text-4xl font-extrabold text-light-text tracking-tight">{list.title}</h1>
                 <Link to={`/profile/${author.username}`} className="flex items-center space-x-2 mt-2 group">
                    <img src={author.avatarUrl} alt={author.username} className="w-6 h-6 rounded-full"/>
                    <span className="text-subtle-text font-semibold group-hover:text-brand-light-purple">By {author.username}</span>
                </Link>
            </div>

            {list.description && <p className="text-subtle-text leading-relaxed mb-4">{list.description}</p>}
            
            {list.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                    {list.tags.map(tag => <span key={tag} className="bg-content-bg text-xs font-semibold px-3 py-1 rounded-full">{tag}</span>)}
                </div>
            )}
            
            <div className="grid grid-cols-3 gap-4">
                {list.games.map(game => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>
        </div>
    );
};

export default ListPage;