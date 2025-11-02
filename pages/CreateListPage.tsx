import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import GameSearchModal from '../components/GameSearchModal';
import { ChevronLeftIcon, XIcon, PlusCircleIcon, TrashIcon } from '../components/Icons';
import type { Game, GameList, User, Collection } from '../types';

interface CreateListPageProps {
    onSaveList: (list: GameList) => void;
    onDeleteList?: (listId: string) => void;
    user: User;
    collection?: Collection;
}

const CreateListPage: React.FC<CreateListPageProps> = ({ onSaveList, onDeleteList, user, collection }) => {
    const { listId } = useParams<{ listId: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const isEditing = !!listId;

    const existingList = isEditing ? collection?.lists.find(l => l.id === listId) : undefined;
    
    const [title, setTitle] = useState(existingList?.title || '');
    const [description, setDescription] = useState(existingList?.description || '');
    const [tags, setTags] = useState(existingList?.tags.join(', ') || '');
    const [games, setGames] = useState<Game[]>(existingList?.games || []);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

    const handleAddGame = (game: Game) => {
        if (!games.some(g => g.id === game.id)) {
            setGames(prev => [...prev, game]);
        }
    };

    const handleRemoveGame = (gameId: string) => {
        setGames(prev => prev.filter(g => g.id !== gameId));
    };

    const handleSave = () => {
        const listData: GameList = {
            id: listId || '', // ID will be generated in App.tsx for new lists
            authorId: user.id,
            title,
            description,
            tags: tags.split(',').map(t => t.trim()).filter(Boolean),
            games,
        };
        onSaveList(listData);
        navigate(isEditing ? `/list/${listId}` : '/profile');
    };

    const handleDelete = () => {
        if (listId && onDeleteList) {
            onDeleteList(listId);
            navigate('/profile');
        }
    }

    const handleBack = () => {
        if (location.state?.from) {
            navigate(location.state.from);
        } else if (isEditing) {
            navigate(`/list/${listId}`);
        } else {
            navigate('/profile');
        }
    };
    
    return (
        <div>
            <GameSearchModal
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
                onSelectGame={handleAddGame}
            />

            {isConfirmingDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                     <div className="bg-content-bg rounded-lg shadow-xl w-full max-w-md p-6">
                        <h2 className="text-2xl font-bold mb-2">Delete List?</h2>
                        <p className="text-subtle-text mb-6">
                            Are you sure you want to permanently delete the list "{title}"? This action cannot be undone.
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
                                onClick={handleDelete}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex items-center -ml-2">
                <button onClick={handleBack} className="p-2 text-subtle-text hover:text-light-text">
                  <ChevronLeftIcon className="w-6 h-6" />
                </button>
                <Header title={isEditing ? 'Edit List' : 'Create a New List'} />
            </div>

            <div className="space-y-6">
                <div className="bg-content-bg p-6 rounded-lg space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-subtle-text mb-1">List Title</label>
                        <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-dark-bg border border-gray-600 rounded-md p-2 focus:ring-brand-purple focus:border-brand-purple" placeholder="e.g., Best Indie Games" />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-subtle-text mb-1">Description</label>
                        <textarea id="description" rows={3} value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-dark-bg border border-gray-600 rounded-md p-2 focus:ring-brand-purple focus:border-brand-purple" placeholder="A short description of your list."></textarea>
                    </div>
                    <div>
                        <label htmlFor="tags" className="block text-sm font-medium text-subtle-text mb-1">Tags (comma-separated)</label>
                        <input type="text" id="tags" value={tags} onChange={e => setTags(e.target.value)} className="w-full bg-dark-bg border border-gray-600 rounded-md p-2 focus:ring-brand-purple focus:border-brand-purple" placeholder="e.g., RPG, Cozy, Must-Play" />
                    </div>
                </div>

                <div className="bg-content-bg p-6 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Games in this List ({games.length})</h2>
                    <div className="grid grid-cols-4 gap-4">
                        {games.map(game => (
                            <div key={game.id} className="relative group">
                                <div className="aspect-[2/3] bg-dark-bg rounded-lg overflow-hidden">
                                    <img src={game.coverUrl} alt={game.title} className="w-full h-full object-cover" />
                                </div>
                                <button
                                    onClick={() => handleRemoveGame(game.id)}
                                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    aria-label={`Remove ${game.title}`}
                                >
                                    <XIcon className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                         <button 
                            onClick={() => setIsSearchOpen(true)}
                            className="flex items-center justify-center aspect-[2/3] bg-dark-bg rounded-lg border-2 border-dashed border-gray-600 hover:border-brand-purple transition-colors"
                            aria-label="Add a game to the list"
                        >
                            <PlusCircleIcon className="w-8 h-8 text-gray-600" />
                        </button>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    {isEditing && onDeleteList && (
                         <button onClick={() => setIsConfirmingDelete(true)} className="flex items-center text-red-400 font-bold py-2 px-4 rounded-lg hover:bg-red-500/10 transition-colors">
                            <TrashIcon className="w-5 h-5 mr-2"/> Delete List
                         </button>
                    )}
                    <button onClick={handleSave} className="bg-brand-purple hover:bg-brand-light-purple text-white font-bold py-2 px-6 rounded-lg transition-colors ml-auto">
                        {isEditing ? 'Save Changes' : 'Create List'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateListPage;