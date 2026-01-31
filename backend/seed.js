const mongoose = require('mongoose');

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/psapk';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Schemas (duplicated from server.js for independence)
const appSchema = new mongoose.Schema({
    name: { type: String, required: true, index: true },
    developer: { type: String, required: true },
    category: { type: String, required: true, index: true },
    icon: String,
    version: { type: String, required: true },
    size: String,
    downloads: { type: Number, default: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviews: { type: Number, default: 0 },
    description: String,
    fullDescription: String,
    whatsNew: String,
    permissions: [String],
    screenshots: [String],
    isFeatured: { type: Boolean, default: false },
    apkFile: String,
    packageName: String,
    minAndroidVersion: String,
    targetAndroidVersion: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

appSchema.index({ name: 'text', description: 'text', developer: 'text' });

const App = mongoose.model('App', appSchema);

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    displayName: String,
    icon: String,
    description: String,
    appCount: { type: Number, default: 0 }
});

const Category = mongoose.model('Category', categorySchema);

// Sample data
const sampleCategories = [
    {
        name: 'games',
        displayName: 'Games',
        icon: '🎮',
        description: 'Play the best mobile games'
    },
    {
        name: 'social',
        displayName: 'Social',
        icon: '💬',
        description: 'Connect with friends and family'
    },
    {
        name: 'tools',
        displayName: 'Tools',
        icon: '🔧',
        description: 'Useful utilities and tools'
    },
    {
        name: 'entertainment',
        displayName: 'Entertainment',
        icon: '🎬',
        description: 'Movies, TV shows, and more'
    },
    {
        name: 'productivity',
        displayName: 'Productivity',
        icon: '📊',
        description: 'Get things done efficiently'
    },
    {
        name: 'education',
        displayName: 'Education',
        icon: '📚',
        description: 'Learn new skills and knowledge'
    },
    {
        name: 'photography',
        displayName: 'Photography',
        icon: '📷',
        description: 'Photo editing and camera apps'
    },
    {
        name: 'music',
        displayName: 'Music & Audio',
        icon: '🎵',
        description: 'Music players and audio apps'
    }
];

const sampleApps = [
    {
        name: "Photo Editor Pro",
        developer: "Creative Studio",
        category: "photography",
        icon: "📷",
        version: "3.5.2",
        size: "45 MB",
        downloads: 10000000,
        rating: 4.5,
        reviews: 125000,
        description: "Professional photo editing with advanced features including filters, effects, cropping, and more.",
        fullDescription: "Photo Editor Pro is the ultimate photo editing application for Android. With over 100 filters, advanced editing tools, and an intuitive interface, you can create stunning images in minutes. Features include: HDR effects, beauty tools, collage maker, batch processing, and much more.",
        whatsNew: "- New AI-powered filters\n- Improved performance\n- Bug fixes and stability improvements",
        permissions: ["Camera", "Storage", "Internet"],
        isFeatured: true,
        packageName: "com.creativestudio.photoeditor",
        minAndroidVersion: "5.0",
        targetAndroidVersion: "13.0"
    },
    {
        name: "Music Player Ultimate",
        developer: "Sound Wave Inc",
        category: "music",
        icon: "🎵",
        version: "2.8.1",
        size: "32 MB",
        downloads: 50000000,
        rating: 4.7,
        reviews: 250000,
        description: "Feature-rich music player with equalizer, bass boost, and beautiful visualizations.",
        fullDescription: "Experience music like never before with Music Player Ultimate. Our advanced audio engine delivers crystal clear sound with customizable equalizer settings. Create playlists, browse by artist, album, or genre, and enjoy your music with stunning visualizations.",
        whatsNew: "- Added support for FLAC format\n- New widget designs\n- Performance improvements",
        permissions: ["Storage", "Audio"],
        isFeatured: true,
        packageName: "com.soundwave.musicplayer",
        minAndroidVersion: "5.0",
        targetAndroidVersion: "13.0"
    },
    {
        name: "Task Manager Pro",
        developer: "Productivity Apps",
        category: "productivity",
        icon: "✓",
        version: "4.2.0",
        size: "28 MB",
        downloads: 5000000,
        rating: 4.3,
        reviews: 85000,
        description: "Organize your tasks, set reminders, and boost productivity.",
        fullDescription: "Task Manager Pro helps you stay organized and productive. Create tasks, set priorities, add reminders, and track your progress. With cloud sync, your tasks are always available across all your devices.",
        whatsNew: "- Cloud sync enabled\n- Dark mode added\n- New notification system",
        permissions: ["Calendar", "Notifications", "Internet"],
        isFeatured: false,
        packageName: "com.productivityapps.taskmanager",
        minAndroidVersion: "6.0",
        targetAndroidVersion: "13.0"
    },
    {
        name: "Game Center",
        developer: "Fun Games Studio",
        category: "games",
        icon: "🎮",
        version: "1.9.5",
        size: "120 MB",
        downloads: 100000000,
        rating: 4.8,
        reviews: 500000,
        description: "Collection of exciting mini-games. Puzzle, arcade, and strategy games all in one app.",
        fullDescription: "Game Center brings you the best collection of casual games. From puzzle challenges to action-packed arcade games, there's something for everyone. Play offline, compete with friends, and unlock achievements.",
        whatsNew: "- 5 new games added\n- Multiplayer mode\n- Bug fixes",
        permissions: ["Storage", "Internet"],
        isFeatured: true,
        packageName: "com.fungames.gamecenter",
        minAndroidVersion: "5.0",
        targetAndroidVersion: "13.0"
    },
    {
        name: "Video Chat Connect",
        developer: "Social Apps Co",
        category: "social",
        icon: "💬",
        version: "5.1.2",
        size: "65 MB",
        downloads: 500000000,
        rating: 4.6,
        reviews: 1200000,
        description: "Connect with friends through video calls, messages, and group chats.",
        fullDescription: "Video Chat Connect makes staying in touch easy and fun. Enjoy crystal-clear video calls, instant messaging, group chats, and share photos and videos with your loved ones. End-to-end encrypted for your privacy.",
        whatsNew: "- Improved video quality\n- New filters and effects\n- Enhanced security",
        permissions: ["Camera", "Microphone", "Contacts", "Internet"],
        isFeatured: true,
        packageName: "com.socialapps.videochat",
        minAndroidVersion: "6.0",
        targetAndroidVersion: "13.0"
    },
    {
        name: "Fitness Tracker",
        developer: "Health Apps",
        category: "health",
        icon: "💪",
        version: "3.3.0",
        size: "38 MB",
        downloads: 20000000,
        rating: 4.4,
        reviews: 95000,
        description: "Track workouts, count calories, and achieve your fitness goals.",
        fullDescription: "Fitness Tracker is your personal fitness coach. Track your workouts, monitor your progress, count steps, calories, and get personalized workout plans. Sync with wearable devices and achieve your health goals.",
        whatsNew: "- New workout plans\n- Improved step counter\n- Integration with smartwatches",
        permissions: ["Sensors", "Location", "Internet"],
        isFeatured: false,
        packageName: "com.healthapps.fitness",
        minAndroidVersion: "6.0",
        targetAndroidVersion: "13.0"
    },
    {
        name: "Learning Hub",
        developer: "EduTech",
        category: "education",
        icon: "📚",
        version: "2.5.3",
        size: "55 MB",
        downloads: 15000000,
        rating: 4.7,
        reviews: 180000,
        description: "Learn new skills with video courses, quizzes, and certificates.",
        fullDescription: "Learning Hub provides access to thousands of courses across various subjects. Learn programming, design, business, languages, and more. Interactive lessons, quizzes, and certificates upon completion.",
        whatsNew: "- 100+ new courses\n- Offline download\n- Progress tracking",
        permissions: ["Storage", "Internet"],
        isFeatured: false,
        packageName: "com.edutech.learning",
        minAndroidVersion: "5.0",
        targetAndroidVersion: "13.0"
    },
    {
        name: "File Manager Plus",
        developer: "System Tools",
        category: "tools",
        icon: "📁",
        version: "6.0.1",
        size: "22 MB",
        downloads: 30000000,
        rating: 4.5,
        reviews: 220000,
        description: "Powerful file manager with cloud storage support.",
        fullDescription: "File Manager Plus is the most powerful file management app for Android. Browse files, create folders, move and copy files, compress and extract archives, and access cloud storage services. Clean and intuitive interface.",
        whatsNew: "- Added cloud storage support\n- New dark theme\n- Improved file search",
        permissions: ["Storage", "Internet"],
        isFeatured: true,
        packageName: "com.systemtools.filemanager",
        minAndroidVersion: "5.0",
        targetAndroidVersion: "13.0"
    },
    {
        name: "Weather Live",
        developer: "Weather Apps",
        category: "tools",
        icon: "🌤️",
        version: "1.7.8",
        size: "18 MB",
        downloads: 25000000,
        rating: 4.6,
        reviews: 150000,
        description: "Accurate weather forecasts with hourly updates and beautiful widgets.",
        fullDescription: "Weather Live provides accurate weather forecasts for your location. Get hourly and 10-day forecasts, severe weather alerts, and customizable widgets. Beautiful weather animations and detailed weather information.",
        whatsNew: "- New weather animations\n- Improved accuracy\n- Widget customization",
        permissions: ["Location", "Internet"],
        isFeatured: false,
        packageName: "com.weatherapps.live",
        minAndroidVersion: "5.0",
        targetAndroidVersion: "13.0"
    },
    {
        name: "Video Editor Studio",
        developer: "Creative Media",
        category: "entertainment",
        icon: "🎬",
        version: "2.4.6",
        size: "72 MB",
        downloads: 35000000,
        rating: 4.4,
        reviews: 180000,
        description: "Create and edit videos with professional tools and effects.",
        fullDescription: "Video Editor Studio is a powerful video editing app with professional features. Trim, merge, add music, apply filters, create transitions, and export in HD quality. Perfect for social media content creators.",
        whatsNew: "- New transition effects\n- 4K export support\n- Performance improvements",
        permissions: ["Storage", "Camera", "Microphone"],
        isFeatured: true,
        packageName: "com.creativemedia.videoeditor",
        minAndroidVersion: "6.0",
        targetAndroidVersion: "13.0"
    }
];

// Seed function
async function seedDatabase() {
    try {
        console.log('Clearing existing data...');
        await App.deleteMany({});
        await Category.deleteMany({});

        console.log('Inserting categories...');
        await Category.insertMany(sampleCategories);

        console.log('Inserting apps...');
        await App.insertMany(sampleApps);

        // Update category counts
        for (const category of sampleCategories) {
            const count = await App.countDocuments({ category: category.name });
            await Category.updateOne(
                { name: category.name },
                { appCount: count }
            );
        }

        console.log('Database seeded successfully!');
        console.log(`Inserted ${sampleCategories.length} categories`);
        console.log(`Inserted ${sampleApps.length} apps`);
        
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
