import React, { useState, useEffect, useRef } from 'react';
import type { Game, Collection, GameStatus } from '../types';
import { 
    CheckCircleIcon, HeartIcon, PlusCircleIcon, BookmarkIcon, 
    GamepadIcon, XCircleIcon, TrashIcon, ChevronDownIcon 
} from './Icons';

interface GameStatusSelectorProps {
    game: Game;
    collection: Collection;
    onStatusChange: (game: Game, status: GameStatus) => void;
}

const getCurrentStatus = (gameId: string, collection: Collection): GameStatus => {
    if (collection.reviews.some(r => r.game.id === gameId)) return 'played';
    if (collection.playing.some(g => g.id === gameId)) return 'playing';
    if (collection.backlog.some(g => g.id === gameId)) return 'backlog';
    if (collection.dropped.some(g => g.id === gameId)) return 'dropped';
    if (collection.wishlist.some(g => g.id === gameId)) return 'wishlist';
    return 'none';
};

const statusOptions: { status: GameStatus; label: string; icon: React.ElementType }[] = [
    { status: 'playing', label: 'Playing', icon: GamepadIcon },
    { status: 'played', label: 'Played', icon: CheckCircleIcon },
    { status: 'backlog', label: 'Backlog', icon: BookmarkIcon },
    { status: 'wishlist', label: 'Wishlist', icon: HeartIcon },
    { status: 'dropped', label: 'Dropped', icon: XCircleIcon },
    { status: 'none', label: 'Remove', icon: TrashIcon },
];

const GameStatusSelector: React.FC<GameStatusSelectorProps> = ({ game, collection, onStatusChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const currentStatus = getCurrentStatus(game.id, collection);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);
    
    const handleSelect = (status: GameStatus) => {
        onStatusChange(game, status);
        setIsOpen(false);
    };

    const currentOption = statusOptions.find(opt => opt.status === currentStatus);

    return (
        <div className="relative w-full" ref={wrapperRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-center font-bold py-3 px-4 rounded-lg transition-colors ${
                    currentStatus === 'none' 
                        ? 'bg-content-bg hover:bg-gray-700' 
                        : 'bg-brand-purple hover:bg-brand-light-purple text-white'
                }`}
            >
                {currentOption && currentOption.status !== 'none' ? (
                    <>
                        <currentOption.icon className="w-5 h-5 mr-2" />
                        <span>{currentOption.label}</span>
                    </>
                ) : (
                    <>
                        <PlusCircleIcon className="w-5 h-5 mr-2" />
                        <span>Add to Library</span>
                    </>
                )}
                <ChevronDownIcon className={`w-5 h-5 ml-auto transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute bottom-full mb-2 w-full bg-content-bg rounded-lg shadow-lg z-20 border border-gray-600">
                    <ul className="py-1">
                        {statusOptions.map(({ status, label, icon: Icon }) => {
                            const isCurrent = currentStatus === status;
                            if (isCurrent && status !== 'none') return null; // Don't show current status in list, except for 'Remove'
                            if (currentStatus === 'none' && status === 'none') return null; // Don't show 'Remove' if not in library

                            return (
                                <li key={status}>
                                    <button
                                        onClick={() => handleSelect(status)}
                                        className={`w-full text-left flex items-center px-4 py-2 text-sm transition-colors ${
                                            status === 'none' 
                                                ? 'text-red-400 hover:bg-red-900/50'
                                                : 'text-light-text hover:bg-brand-purple/50'
                                        }`}
                                    >
                                        <Icon className="w-5 h-5 mr-3" />
                                        <span>{label}</span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default GameStatusSelector;