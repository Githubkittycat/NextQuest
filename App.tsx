import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Feed from './pages/Feed';
import Explore from './pages/Explore';
import Discover from './pages/Discover';
import Profile from './pages/Profile';
import GenrePage from './pages/GenrePage';
import GameDetailPage from './pages/GameDetailPage';
import BottomNav from './components/BottomNav';
import LogGameModal from './components/LogGameModal';
import SettingsPage from './pages/SettingsPage';
import LogGamePage from './pages/LogGamePage';
import FriendProfilePage from './pages/FriendProfilePage';
import CreateListPage from './pages/CreateListPage';
import ListPage from './pages/ListPage';
import { MOCK_USER, MOCK_COLLECTION, MOCK_COLLECTIONS } from './data/mock';
import type { User, Game, Collection, LoggedGame, GameStatus, GameList } from './types';

function App() {
  const [gameToLog, setGameToLog] = useState<Game | null>(null);
  const [reviewToEdit, setReviewToEdit] = useState<LoggedGame | null>(null);
  const [user, setUser] = useState<User>(MOCK_USER);
  const [collection, setCollection] = useState<Collection>(MOCK_COLLECTION);

  const handleLogGameSubmit = (loggedGame: LoggedGame) => {
    setCollection(prevCollection => {
        const existingReviewIndex = prevCollection.reviews.findIndex(
            review => review.game.id === loggedGame.game.id
        );
        
        let updatedReviews;
        if (existingReviewIndex > -1) {
            // Update existing review
            updatedReviews = [...prevCollection.reviews];
            updatedReviews[existingReviewIndex] = loggedGame;
        } else {
            // Add new review
            updatedReviews = [...prevCollection.reviews, loggedGame];
        }
        
        // Ensure the game is removed from other lists when a review is submitted
        return { 
            ...prevCollection, 
            reviews: updatedReviews,
            wishlist: prevCollection.wishlist.filter(g => g.id !== loggedGame.game.id),
            backlog: prevCollection.backlog.filter(g => g.id !== loggedGame.game.id),
            dropped: prevCollection.dropped.filter(g => g.id !== loggedGame.game.id),
            playing: prevCollection.playing.filter(g => g.id !== loggedGame.game.id),
        };
    });
    setGameToLog(null);
    setReviewToEdit(null);
  };

  const handleUpdateGameStatus = (game: Game, status: GameStatus) => {
    if (status === 'played') {
        const existingReview = collection.reviews.find(r => r.game.id === game.id);
        if (existingReview) {
            handleEditReview(existingReview);
        } else {
            setGameToLog(game);
        }
        return;
    }

    setCollection(prev => {
        const newCollection = {
            ...prev,
            reviews: prev.reviews.filter(r => r.game.id !== game.id),
            wishlist: prev.wishlist.filter(g => g.id !== game.id),
            backlog: prev.backlog.filter(g => g.id !== game.id),
            dropped: prev.dropped.filter(g => g.id !== game.id),
            playing: prev.playing.filter(g => g.id !== game.id),
        };

        switch (status) {
            case 'wishlist':
                newCollection.wishlist = [...newCollection.wishlist, game];
                break;
            case 'backlog':
                newCollection.backlog = [...newCollection.backlog, game];
                break;
            case 'dropped':
                newCollection.dropped = [...newCollection.dropped, game];
                break;
            case 'playing':
                newCollection.playing = [...newCollection.playing, game];
                break;
            // 'played' is handled by opening the modal, 'none' removes it from all lists.
        }
        return newCollection;
    });
  };

  const handleEditReview = (loggedGame: LoggedGame) => {
    setReviewToEdit(loggedGame);
  };

  const handleDeleteReview = (gameId: string) => {
    setCollection(prevCollection => ({
        ...prevCollection,
        reviews: prevCollection.reviews.filter(review => review.game.id !== gameId)
    }));
    setGameToLog(null);
    setReviewToEdit(null);
  };

  const handleCloseModal = () => {
    setGameToLog(null);
    setReviewToEdit(null);
  };

  const handleSaveList = (listToSave: GameList) => {
    setCollection(prev => {
        const listIndex = prev.lists.findIndex(l => l.id === listToSave.id);
        let newLists;
        let savedList = { ...listToSave }; // Create a mutable copy

        if (listIndex > -1) {
            // Edit existing list
            newLists = [...prev.lists];
            newLists[listIndex] = savedList;
        } else {
            // Add new list
            savedList.id = `list-${Date.now()}`;
            newLists = [...prev.lists, savedList];
        }

        // Update the global MOCK_COLLECTIONS map.
        // This is a workaround because ListPage reads from the static mock data.
        const currentUserCollection = MOCK_COLLECTIONS.get(user.id);
        if (currentUserCollection) {
            MOCK_COLLECTIONS.set(user.id, {
                ...currentUserCollection,
                lists: newLists,
            });
        }

        return { ...prev, lists: newLists };
    });
  };

  const handleDeleteList = (listId: string) => {
      setCollection(prev => {
          const newLists = prev.lists.filter(l => l.id !== listId);

          // Update the global MOCK_COLLECTIONS map.
          const currentUserCollection = MOCK_COLLECTIONS.get(user.id);
          if (currentUserCollection) {
              MOCK_COLLECTIONS.set(user.id, {
                  ...currentUserCollection,
                  lists: newLists,
              });
          }
          
          return {
              ...prev,
              lists: newLists,
          };
      });
  };

  return (
    <HashRouter>
      <div className="bg-dark-bg text-light-text font-sans antialiased">
        <div className="container mx-auto max-w-lg h-screen flex flex-col">
          <main className="flex-grow overflow-y-auto p-4 no-scrollbar">
            <Routes>
              <Route path="/" element={<Feed user={user} />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/discover" element={<Discover collection={collection} />} />
              <Route path="/profile" element={<Profile user={user} collection={collection} onEditReview={handleEditReview} />} />
              <Route path="/profile/:username" element={<FriendProfilePage />} />
              <Route path="/profile/settings" element={<SettingsPage user={user} onUpdateUser={setUser} />} />
              <Route path="/genre/:genreName" element={<GenrePage />} />
              <Route path="/log" element={<LogGamePage onLogGame={setGameToLog} />} />
              <Route path="/game/:gameId" element={<GameDetailPage collection={collection} onUpdateGameStatus={handleUpdateGameStatus} />} />
              <Route path="/createlist" element={<CreateListPage onSaveList={handleSaveList} user={user} />} />
              <Route path="/list/edit/:listId" element={<CreateListPage onSaveList={handleSaveList} onDeleteList={handleDeleteList} user={user} collection={collection} />} />
              <Route path="/list/:listId" element={<ListPage currentUser={user} />} />
            </Routes>
          </main>
          <BottomNav />
          {(gameToLog || reviewToEdit) && (
            <LogGameModal 
                game={gameToLog || reviewToEdit!.game}
                loggedGame={reviewToEdit}
                onClose={handleCloseModal} 
                onLogSubmit={handleLogGameSubmit}
                onDeleteReview={handleDeleteReview}
            />
          )}
        </div>
      </div>
    </HashRouter>
  );
}

export default App;