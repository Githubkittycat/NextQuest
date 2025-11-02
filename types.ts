import type { ReactElement, SVGProps } from 'react';

export interface GameReview {
  username: string;
  rating: number;
  text: string;
}

export interface Game {
  id: string;
  title: string;
  coverUrl: string;
  bannerUrl: string;
  screenshots: string[];
  genres: string[];
  platforms: string[];
  releaseYear: number;
  publisher: string;
  description: string;
  avgRating: number;
  reviews: GameReview[];
}

export interface User {
  id: string;
  username: string;
  bio: string;
  avatarUrl: string;
  top4Games: Game[];
  friends: { id: string; username: string; avatarUrl: string }[];
}

export interface LoggedGame {
  game: Game;
  logDate: string;
  platformPlayed: string;
  playtimeHours: number;
  rating: number;
  review: string;
}

export interface GameList {
  id: string;
  title: string;
  description: string;
  tags: string[];
  games: Game[];
  authorId: string;
}

export interface Collection {
  wishlist: Game[];
  backlog: Game[];
  reviews: LoggedGame[];
  dropped: Game[];
  playing: Game[];
  lists: GameList[];
}

export type GameStatus = 'played' | 'playing' | 'backlog' | 'dropped' | 'wishlist' | 'none';

export interface DiscoverPreferences {
  mood: string;
  genre: string;
  playtime: string;
  platform: string;
}

export interface RecommendedGame {
  title: string;
  description: string;
  genre: string;
  platform: string;
  reason: string;
  coverUrl: string;
}

export interface GenreDetail {
    name: string;
    // FIX: Resolve "Cannot find namespace 'React'" by importing SVGProps and using it directly.
    icon: (props: SVGProps<SVGSVGElement>) => ReactElement;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
}

export interface Activity {
  id: string;
  user: {
    id: string;
    username: string;
    avatarUrl: string;
  };
  type: 'review' | 'backlog' | 'playing' | 'wishlist' | 'dropped';
  game: Game;
  timestamp: string;
  details?: string; // e.g., the review text
}