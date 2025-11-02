import React from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { MOCK_USERS, MOCK_COLLECTIONS } from '../data/mock';
import ProfileContent from '../components/ProfileContent';
import { ChevronLeftIcon } from '../components/Icons';

const FriendProfilePage: React.FC = () => {
    const { username } = useParams<{ username: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const user = MOCK_USERS.find(u => u.username === username);
    const collection = user ? MOCK_COLLECTIONS.get(user.id) : undefined;

    if (!user || !collection) {
        return (
            <div className="text-center py-10">
                <h2 className="text-2xl font-bold">User Not Found</h2>
                <Link to="/profile" className="text-brand-light-purple hover:underline mt-4 inline-block">
                    Back to your Profile
                </Link>
            </div>
        );
    }

    const handleBack = () => {
        if (location.state?.from) {
            navigate(location.state.from);
        } else {
            navigate('/profile'); // Fallback to user's own profile
        }
    };

    return (
        <div>
            <button onClick={handleBack} className="flex items-center text-subtle-text hover:text-light-text mb-4 -ml-2 p-1">
                <ChevronLeftIcon className="w-6 h-6" />
                <span className="ml-1">Back</span>
            </button>
            <ProfileContent user={user} collection={collection} isFriendProfile={true} />
        </div>
    );
};

export default FriendProfilePage;