import React from 'react';
import ProfileContent from '../components/ProfileContent';
import type { User, LoggedGame, Collection } from '../types';

interface ProfileProps {
    user: User;
    collection: Collection;
    onEditReview: (loggedGame: LoggedGame) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, collection, onEditReview }) => {
    return (
        <ProfileContent 
            user={user} 
            collection={collection}
            onEditReview={onEditReview}
            isFriendProfile={false}
        />
    );
};

export default Profile;