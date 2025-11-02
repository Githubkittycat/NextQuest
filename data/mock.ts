import type { Game, User, Collection, LoggedGame, GenreDetail, NewsArticle, Activity, GameList } from '../types';
import {
    ExplosionIcon, CompassRoseIcon, SwordIcon, AtomIcon, JigsawIcon,
    CheckeredFlagIcon, SoccerBallIcon, GhostIcon, RocketIcon, DragonIcon,
    PlatformerIcon, StrategyPixelFlagIcon
} from '../components/Icons';

export const GENRES = [
  "Action", "Adventure", "RPG", "Strategy", "Simulation", "Puzzle", 
  "Racing", "Sports", "Horror", "Sci-Fi", "Fantasy", "Platformer"
];

export const GENRE_DETAILS: GenreDetail[] = [
  { name: "Action", icon: ExplosionIcon },
  { name: "Adventure", icon: CompassRoseIcon },
  { name: "RPG", icon: SwordIcon },
  { name: "Strategy", icon: StrategyPixelFlagIcon },
  { name: "Simulation", icon: AtomIcon },
  { name: "Puzzle", icon: JigsawIcon },
  { name: "Racing", icon: CheckeredFlagIcon },
  { name: "Sports", icon: SoccerBallIcon },
  { name: "Horror", icon: GhostIcon },
  { name: "Sci-Fi", icon: RocketIcon },
  { name: "Fantasy", icon: DragonIcon },
  { name: "Platformer", icon: PlatformerIcon },
];

const realGames = {
  Action: [
    { title: "God of War", releaseYear: 2018, publisher: "Sony Interactive Entertainment", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1593500/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1593500/header.jpg", screenshots: ["https://cdn.akamai.steamstatic.com/steam/apps/1593500/ss_8e7c10db0a75333b27c369e1a8080f35558117c7.1920x1080.jpg", "https://cdn.akamai.steamstatic.com/steam/apps/1593500/ss_d08d23e32b350f528723659c25659d1a457a1e3e.1920x1080.jpg"] },
    { title: "Hades", releaseYear: 2020, publisher: "Supergiant Games", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1145360/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1145360/header.jpg", screenshots: ["https://cdn.akamai.steamstatic.com/steam/apps/1145360/ss_4083424d156555193297a7389b25180f959c153b.1920x1080.jpg", "https://cdn.akamai.steamstatic.com/steam/apps/1145360/ss_ea2913e273014c2c5100067332204680e9275e5c.1920x1080.jpg"] },
    { title: "Doom Eternal", releaseYear: 2020, publisher: "Bethesda Softworks", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/782330/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/782330/header.jpg", screenshots: [] },
    { title: "Sekiro: Shadows Die Twice", releaseYear: 2019, publisher: "Activision", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/814380/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/814380/header.jpg", screenshots: [] },
    { title: "Control", releaseYear: 2019, publisher: "505 Games", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/870780/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/870780/header.jpg", screenshots: [] },
  ],
  Adventure: [
    { title: "Red Dead Redemption 2", releaseYear: 2018, publisher: "Rockstar Games", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1174180/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg", screenshots: [] },
    { title: "The Witcher 3: Wild Hunt", releaseYear: 2015, publisher: "CD Projekt Red", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/292030/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg", screenshots: [] },
    { title: "Uncharted 4: A Thief's End", releaseYear: 2016, publisher: "Sony Computer Entertainment", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1659420/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1659420/header.jpg", screenshots: [] },
    { title: "Ghost of Tsushima", releaseYear: 2020, publisher: "Sony Interactive Entertainment", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/2215430/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/2215430/header.jpg", screenshots: ["https://cdn.akamai.steamstatic.com/steam/apps/2215430/ss_8576d3f2375806c5b058c4996914620f592f6d50.1920x1080.jpg", "https://cdn.akamai.steamstatic.com/steam/apps/2215430/ss_54a3c2007805d3976860a221f43503f83713008e.1920x1080.jpg"] },
  ],
  RPG: [
    { title: "Elden Ring", releaseYear: 2022, publisher: "Bandai Namco Entertainment", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1245620/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg", screenshots: ["https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_8087922ac26906238b753696fff486df8f7881a8.1920x1080.jpg", "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_5033a824497475357833a68b75d774843f87b8d1.1920x1080.jpg"] },
    { title: "Persona 5 Royal", releaseYear: 2019, publisher: "Atlus", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1687950/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1687950/header.jpg", screenshots: [] },
    { title: "Final Fantasy VII Remake", releaseYear: 2020, publisher: "Square Enix", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1462040/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1462040/header.jpg", screenshots: [] },
    { title: "Disco Elysium", releaseYear: 2019, publisher: "ZA/UM", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/632470/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/632470/header.jpg", screenshots: [] },
    { title: "Baldur's Gate 3", releaseYear: 2023, publisher: "Larian Studios", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1086940/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg", screenshots: [] },
  ],
  Strategy: [
    { title: "Civilization VI", releaseYear: 2016, publisher: "2K Games", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/289070/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/289070/header.jpg", screenshots: [] },
    { title: "XCOM 2", releaseYear: 2016, publisher: "2K Games", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/268500/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/268500/header.jpg", screenshots: [] },
    { title: "Into the Breach", releaseYear: 2018, publisher: "Subset Games", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/590380/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/590380/header.jpg", screenshots: [] },
    { title: "Fire Emblem: Three Houses", releaseYear: 2019, publisher: "Nintendo", coverUrl: "https://assets.nintendo.com/image/upload/ar_1:1,c_lpad,dpr_2.0,f_auto,q_auto,w_500/b_white/ncom/en_US/games/switch/f/fire-emblem-three-houses-switch/boxart", bannerUrl: "https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_1.0/c_scale,w_1200/ncom/en_US/games/switch/f/fire-emblem-three-houses-switch/wallpapers/fire-emblem-three-houses-Black-Eagles-wallpaper", screenshots: [] },
  ],
  Simulation: [
    { title: "Stardew Valley", releaseYear: 2016, publisher: "ConcernedApe", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/413150/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/413150/header.jpg", screenshots: [] },
    { title: "The Sims 4", releaseYear: 2014, publisher: "Electronic Arts", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1222670/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1222670/header.jpg", screenshots: [] },
    { title: "Microsoft Flight Simulator", releaseYear: 2020, publisher: "Xbox Game Studios", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1250410/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1250410/header.jpg", screenshots: [] },
    { title: "Animal Crossing: New Horizons", releaseYear: 2020, publisher: "Nintendo", coverUrl: "https://assets.nintendo.com/image/upload/ar_1:1,c_lpad,dpr_2.0,f_auto,q_auto,w_500/b_white/ncom/en_US/games/switch/a/animal-crossing-new-horizons-switch/boxart", bannerUrl: "https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_1.0/c_scale,w_1200/ncom/en_US/games/switch/a/animal-crossing-new-horizons-switch/wallpapers/animal-crossing-new-horizons-New-Horizons-wallpaper", screenshots: [] },
    { title: "Cities: Skylines", releaseYear: 2015, publisher: "Paradox Interactive", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/255710/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/255710/header.jpg", screenshots: [] },
  ],
  Puzzle: [
    { title: "Portal 2", releaseYear: 2011, publisher: "Valve", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/620/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/620/header.jpg", screenshots: [] },
    { title: "The Witness", releaseYear: 2016, publisher: "Thekla, Inc.", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/210970/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/210970/header.jpg", screenshots: [] },
    { title: "Return of the Obra Dinn", releaseYear: 2018, publisher: "3909", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/653530/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/653530/header.jpg", screenshots: [] },
    { title: "Baba Is You", releaseYear: 2019, publisher: "Hempuli", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/736260/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/736260/header.jpg", screenshots: [] },
    { title: "Outer Wilds", releaseYear: 2019, publisher: "Annapurna Interactive", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/753640/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/753640/header.jpg", screenshots: [] },
  ],
  Racing: [
    { title: "Forza Horizon 5", releaseYear: 2021, publisher: "Xbox Game Studios", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1551360/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1551360/header.jpg", screenshots: [] },
    { title: "Mario Kart 8 Deluxe", releaseYear: 2017, publisher: "Nintendo", coverUrl: "https://assets.nintendo.com/image/upload/ar_1:1,c_lpad,dpr_2.0,f_auto,q_auto,w_500/b_white/ncom/en_US/games/switch/m/mario-kart-8-deluxe-switch/boxart", bannerUrl: "https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/games_15/nintendo_switch_4/HAC_P_AABPA_s_img01.jpg", screenshots: [] },
    { title: "Burnout Paradise Remastered", releaseYear: 2018, publisher: "Electronic Arts", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1238080/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1238080/header.jpg", screenshots: [] },
  ],
  Sports: [
    { title: "FIFA 23", releaseYear: 2022, publisher: "EA Sports", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1811260/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1811260/header.jpg", screenshots: [] },
    { title: "NBA 2K23", releaseYear: 2022, publisher: "2K Sports", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1919590/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1919590/header.jpg", screenshots: [] },
    { title: "Madden NFL 23", releaseYear: 2022, publisher: "EA Sports", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1760250/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1760250/header.jpg", screenshots: [] },
    { title: "Rocket League", releaseYear: 2015, publisher: "Psyonix", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/252950/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/252950/header.jpg", screenshots: [] },
  ],
  Horror: [
    { title: "Resident Evil Village", releaseYear: 2021, publisher: "Capcom", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1196590/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1196590/header.jpg", screenshots: [] },
    { title: "Alien: Isolation", releaseYear: 2014, publisher: "Sega", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/214490/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/214490/header.jpg", screenshots: [] },
    { title: "Dead Space (Remake)", releaseYear: 2023, publisher: "Electronic Arts", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1693980/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1693980/header.jpg", screenshots: [] },
    { title: "Amnesia: The Bunker", releaseYear: 2023, publisher: "Frictional Games", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1944430/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1944430/header.jpg", screenshots: [] },
    { title: "Phasmophobia", releaseYear: 2020, publisher: "Kinetic Games", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/739630/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/739630/header.jpg", screenshots: [] },
  ],
  "Sci-Fi": [
    { title: "Cyberpunk 2077", releaseYear: 2020, publisher: "CD Projekt Red", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1091500/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg", screenshots: ["https://cdn.akamai.steamstatic.com/steam/apps/1091500/ss_3d1a6e9a6e1f7d2877531d0440356c369165d21a.1920x1080.jpg", "https://cdn.akamai.steamstatic.com/steam/apps/1091500/ss_89467645513bc1a8511718507851608984365449.1920x1080.jpg"] },
    { title: "Mass Effect Legendary Edition", releaseYear: 2021, publisher: "Electronic Arts", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1328670/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1328670/header.jpg", screenshots: [] },
    { title: "No Man's Sky", releaseYear: 2016, publisher: "Hello Games", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/275850/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/275850/header.jpg", screenshots: [] },
    { title: "Starfield", releaseYear: 2023, publisher: "Bethesda Softworks", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1716740/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1716740/header.jpg", screenshots: [] },
    { title: "Titanfall 2", releaseYear: 2016, publisher: "Electronic Arts", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1237970/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1237970/header.jpg", screenshots: [] },
  ],
  Fantasy: [
    { title: "The Elder Scrolls V: Skyrim", releaseYear: 2011, publisher: "Bethesda Softworks", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/489830/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/489830/header.jpg", screenshots: [] },
    { title: "Dragon Age: Inquisition", releaseYear: 2014, publisher: "Electronic Arts", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1222690/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1222690/header.jpg", screenshots: [] },
    { title: "Diablo IV", releaseYear: 2023, publisher: "Blizzard Entertainment", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/2344520/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/2344520/header.jpg", screenshots: [] },
    { title: "Hogwarts Legacy", releaseYear: 2023, publisher: "Warner Bros. Games", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/990080/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/990080/header.jpg", screenshots: [] },
  ],
  Platformer: [
    { title: "Hollow Knight", releaseYear: 2017, publisher: "Team Cherry", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/367520/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/367520/header.jpg", screenshots: [] },
    { title: "Celeste", releaseYear: 2018, publisher: "Maddy Makes Games", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/504230/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/504230/header.jpg", screenshots: [] },
    { title: "Super Mario Odyssey", releaseYear: 2017, publisher: "Nintendo", coverUrl: "https://assets.nintendo.com/image/upload/ar_1:1,c_lpad,dpr_2.0,f_auto,q_auto,w_500/b_white/ncom/en_US/games/switch/s/super-mario-odyssey-switch/boxart", bannerUrl: "https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_1.0/c_scale,w_1200/ncom/en_US/games/switch/s/super-mario-odyssey-switch/wallpapers/super-mario-odyssey-New-Donk-City-wallpaper", screenshots: [] },
    { title: "Ori and the Will of the Wisps", releaseYear: 2020, publisher: "Xbox Game Studios", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1057090/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1057090/header.jpg", screenshots: [] },
    { title: "Psychonauts 2", releaseYear: 2021, publisher: "Xbox Game Studios", coverUrl: "https://cdn.akamai.steamstatic.com/steam/apps/607080/library_600x900.jpg", bannerUrl: "https://cdn.akamai.steamstatic.com/steam/apps/607080/header.jpg", screenshots: [] },
  ],
};

const platforms = ['PC', 'PS5', 'Xbox', 'Switch'];

const getRandomElements = <T>(arr: T[], count: number): T[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const generateMockReviews = (gameTitle: string) => {
    const usernames = ['GamerPro', 'PixelFan', 'QuestMaster', 'LevelUp', 'BossSlayer'];
    const comments = [
        `An absolute must-play! The story for ${gameTitle} is incredible.`,
        `Challenging but rewarding. Highly recommend it.`,
        `I couldn't put this game down. 10/10!`,
        `Visually stunning and the gameplay is so smooth.`,
        `A decent game, but didn't quite live up to the hype for me.`
    ];
    
    return getRandomElements(usernames, 3).map((username, i) => ({
        username,
        rating: 4 + Math.floor(Math.random() * 2), // 4 or 5
        text: comments[i % comments.length],
    }));
};

let gameIdCounter = 1;

export const MOCK_GAMES: Game[] = GENRES.flatMap((genre) => {
  const gamesInGenre = realGames[genre as keyof typeof realGames];
  return gamesInGenre.map((game) => {
    const id = (gameIdCounter++).toString();
    const avgRating = parseFloat((3.8 + Math.random() * 1.2).toFixed(1));

    return {
      id,
      title: game.title,
      coverUrl: game.coverUrl,
      bannerUrl: game.bannerUrl,
      screenshots: game.screenshots || [],
      genres: [genre, ...getRandomElements(GENRES.filter(g => g !== genre), 1)],
      platforms: getRandomElements(platforms, Math.ceil(Math.random() * 3) + 1),
      releaseYear: game.releaseYear,
      publisher: game.publisher,
      description: `An acclaimed ${genre.toLowerCase()} game, ${game.title} was released in ${game.releaseYear} by ${game.publisher}. It has captivated players with its immersive world and engaging gameplay.`,
      avgRating,
      reviews: generateMockReviews(game.title),
    };
  });
});

const MOCK_LOGGED_GAME: LoggedGame = {
    game: MOCK_GAMES[0],
    logDate: '2024-05-10',
    platformPlayed: 'PC',
    playtimeHours: 85,
    rating: 5,
    review: 'An absolute masterpiece of the action genre. The world-building is second to none.'
};

export const MOCK_LISTS: GameList[] = [
    {
        id: 'list1',
        authorId: 'u1',
        title: 'My All-Time Favorites',
        description: 'These are the games that defined genres and left a lasting impact on me.',
        tags: ['GOAT', 'Masterpiece', 'Must-Play'],
        games: MOCK_GAMES.filter(g => ['Elden Ring', 'The Witcher 3: Wild Hunt', 'Red Dead Redemption 2', 'Hollow Knight', 'Portal 2', 'God of War'].includes(g.title))
    }
];

export const MOCK_COLLECTION: Collection = {
    wishlist: MOCK_GAMES.slice(10, 14),
    backlog: MOCK_GAMES.slice(15, 20),
    reviews: [MOCK_LOGGED_GAME],
    dropped: MOCK_GAMES.slice(30, 32),
    playing: MOCK_GAMES.filter(g => g.title === 'Cyberpunk 2077'),
    lists: MOCK_LISTS,
};

export const MOCK_NEWS: NewsArticle[] = [
  {
    id: 'news1',
    title: 'Major Summer Game Fest announcements drop!',
    summary: 'New trailers for highly anticipated titles and surprise reveals.',
    content: `The annual Summer Game Fest kicked off with a bang, showcasing a plethora of new games and updates on existing ones. Highlights included the world premiere of "Cybernetic Echoes 2," a stunning sequel to the beloved sci-fi RPG. Fans were treated to a 10-minute gameplay demo that showed off its new gravity-defying mechanics.

Additionally, indie developer "Pixelated Dreams" unveiled "Forest of Whispers," a charming adventure game with a unique hand-drawn art style. A surprise announcement came from Rockstar Games, who teased a new project with a cryptic trailer, sending the community into a frenzy of speculation. Several other studios dropped release dates, new character reveals, and DLC plans, making this one of the most packed SGF shows in recent memory.`
  },
  {
    id: 'news2',
    title: "'Project Aether' gets a release date: Fall 2024.",
    summary: 'The sci-fi RPG is one of the most wishlisted games this year.',
    content: `After years of development, "Celestial Studios" has finally announced a release window for their highly anticipated sci-fi RPG, 'Project Aether.' Set for a Fall 2024 launch, the game promises a vast open world across multiple planets, deep character customization, and a branching narrative that responds to player choices.

The announcement was accompanied by a new trailer showcasing the game's stunning visuals, powered by a next-generation engine. We saw glimpses of sprawling alien cities, intense ship-to-ship combat, and heartfelt character moments. 'Project Aether' has consistently topped wishlists since its reveal, and this news has only amplified the excitement for what could be one of the biggest releases of the year.`
  }
];

// --- MOCK DATA FOR FRIENDS ---

const generateMockCollection = (userId: string): Collection => {
    // simple hash function to get different slices for different users
    const hash = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const start = hash % (MOCK_GAMES.length - 20); // ensure we have enough games
    return {
        wishlist: MOCK_GAMES.slice(start, start + 4),
        backlog: MOCK_GAMES.slice(start + 5, start + 10),
        reviews: [
            {
                game: MOCK_GAMES[start + 11],
                logDate: '2024-06-15',
                platformPlayed: 'PC',
                playtimeHours: 50 + (hash % 50),
                rating: 4,
                review: 'A classic! Really enjoyed my time with this one.'
            }
        ],
        dropped: MOCK_GAMES.slice(start + 12, start + 14),
        playing: MOCK_GAMES.slice(start + 15, start + 17),
        lists: [
            {
                id: `list-${userId}`,
                authorId: userId,
                title: 'Must-Play Indies',
                description: 'Some of the best indie games I have ever played.',
                tags: ['Indie', 'Hidden Gem'],
                games: MOCK_GAMES.filter(g => ['Hades', 'Celeste', 'Stardew Valley', 'Outer Wilds'].includes(g.title))
            }
        ]
    };
};

const friendData = [
    { id: 'u2', username: 'GlitchQueen', bio: 'Finding new ways to break the game.', avatarUrl: 'https://picsum.photos/seed/GlitchQueen/200/200' },
    { id: 'u3', username: 'RetroGamer', bio: 'They don\'t make them like they used to.', avatarUrl: 'https://picsum.photos/seed/RetroGamer/200/200' },
    { id: 'u4', username: 'ConsoleKing', bio: 'Controller in hand, ready for adventure.', avatarUrl: 'https://picsum.photos/seed/ConsoleKing/200/200' },
    { id: 'u5', username: 'IndieExplorer', bio: 'Searching for hidden gems.', avatarUrl: 'https://picsum.photos/seed/IndieExplorer/200/200' },
    { id: 'u6', username: 'SpeedRunner', bio: 'Gotta go fast. Any%.', avatarUrl: 'https://picsum.photos/seed/SpeedRunner/200/200' },
];

export const MOCK_USER: User = {
  id: 'u1',
  username: 'PixelatedHero',
  bio: 'Just a gamer trying to clear my backlog. Lover of indie gems and sprawling RPGs.',
  avatarUrl: 'https://picsum.photos/seed/PixelatedHero/200/200',
  // FIX: Add missing 'top4Games' property to satisfy the User type.
  top4Games: MOCK_GAMES.slice(4, 8),
  friends: friendData.map(({ id, username, avatarUrl }) => ({ id, username, avatarUrl })),
};

const allUsers: User[] = [
    MOCK_USER,
    ...friendData.map(f => ({
        ...f,
        top4Games: MOCK_GAMES.slice(f.id.charCodeAt(1) % (MOCK_GAMES.length - 4), f.id.charCodeAt(1) % (MOCK_GAMES.length - 4) + 4),
        friends: [] // Friends' friends lists are empty for simplicity
    }))
];

const allCollections = new Map<string, Collection>();
allUsers.forEach(user => {
    if (user.id === 'u1') {
        allCollections.set(user.id, MOCK_COLLECTION);
    } else {
        allCollections.set(user.id, generateMockCollection(user.id));
    }
});

export const MOCK_USERS: readonly User[] = allUsers;
export const MOCK_COLLECTIONS: Map<string, Collection> = allCollections;

export const MOCK_ACTIVITY: Activity[] = [
  {
    id: 'act1',
    user: MOCK_USER.friends[0], // GlitchQueen
    type: 'review',
    game: MOCK_GAMES.find(g => g.title === 'Cyberpunk 2077')!,
    timestamp: '2 hours ago',
    details: '"Absolutely stunning visuals!"',
  },
  {
    id: 'act2',
    user: MOCK_USER.friends[1], // RetroGamer
    type: 'backlog',
    game: MOCK_GAMES.find(g => g.title === 'Stardew Valley')!,
    timestamp: '1 day ago',
  },
  {
    id: 'act3',
    user: MOCK_USER.friends[2], // ConsoleKing
    type: 'playing',
    game: MOCK_GAMES.find(g => g.title === 'Elden Ring')!,
    timestamp: '3 days ago',
  },
  {
    id: 'act4',
    user: MOCK_USER.friends[3], // IndieExplorer
    type: 'wishlist',
    game: MOCK_GAMES.find(g => g.title === 'Hollow Knight')!,
    timestamp: '5 days ago',
  },
];