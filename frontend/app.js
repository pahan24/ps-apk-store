// Configuration
const API_BASE_URL = 'http://localhost:3000/api';

// Sample data for demonstration (replace with API calls)
let allApps = [
    {
        id: 1,
        name: "Photo Editor Pro",
        developer: "Creative Studio",
        category: "photography",
        icon: "📷",
        version: "3.5.2",
        size: "45 MB",
        downloads: "10M+",
        rating: 4.5,
        reviews: 125000,
        description: "Professional photo editing with advanced features including filters, effects, cropping, and more. Transform your photos into masterpieces.",
        fullDescription: "Photo Editor Pro is the ultimate photo editing application for Android. With over 100 filters, advanced editing tools, and an intuitive interface, you can create stunning images in minutes. Features include: HDR effects, beauty tools, collage maker, batch processing, and much more.",
        whatsNew: "- New AI-powered filters\n- Improved performance\n- Bug fixes and stability improvements",
        permissions: ["Camera", "Storage", "Internet"],
        screenshots: 4,
        isFeatured: true,
        lastUpdate: "2025-01-15"
    },
    {
        id: 2,
        name: "Music Player Ultimate",
        developer: "Sound Wave Inc",
        category: "music",
        icon: "🎵",
        version: "2.8.1",
        size: "32 MB",
        downloads: "50M+",
        rating: 4.7,
        reviews: 250000,
        description: "Feature-rich music player with equalizer, bass boost, and beautiful visualizations. Supports all audio formats.",
        fullDescription: "Experience music like never before with Music Player Ultimate. Our advanced audio engine delivers crystal clear sound with customizable equalizer settings. Create playlists, browse by artist, album, or genre, and enjoy your music with stunning visualizations.",
        whatsNew: "- Added support for FLAC format\n- New widget designs\n- Performance improvements",
        permissions: ["Storage", "Audio"],
        screenshots: 5,
        isFeatured: true,
        lastUpdate: "2025-01-20"
    },
    {
        id: 3,
        name: "Task Manager Pro",
        developer: "Productivity Apps",
        category: "productivity",
        icon: "✓",
        version: "4.2.0",
        size: "28 MB",
        downloads: "5M+",
        rating: 4.3,
        reviews: 85000,
        description: "Organize your tasks, set reminders, and boost productivity. Simple yet powerful task management.",
        fullDescription: "Task Manager Pro helps you stay organized and productive. Create tasks, set priorities, add reminders, and track your progress. With cloud sync, your tasks are always available across all your devices.",
        whatsNew: "- Cloud sync enabled\n- Dark mode added\n- New notification system",
        permissions: ["Calendar", "Notifications", "Internet"],
        screenshots: 3,
        isFeatured: false,
        lastUpdate: "2025-01-25"
    },
    {
        id: 4,
        name: "Game Center",
        developer: "Fun Games Studio",
        category: "games",
        icon: "🎮",
        version: "1.9.5",
        size: "120 MB",
        downloads: "100M+",
        rating: 4.8,
        reviews: 500000,
        description: "Collection of exciting mini-games. Puzzle, arcade, and strategy games all in one app.",
        fullDescription: "Game Center brings you the best collection of casual games. From puzzle challenges to action-packed arcade games, there's something for everyone. Play offline, compete with friends, and unlock achievements.",
        whatsNew: "- 5 new games added\n- Multiplayer mode\n- Bug fixes",
        permissions: ["Storage", "Internet"],
        screenshots: 6,
        isFeatured: true,
        lastUpdate: "2025-01-28"
    },
    {
        id: 5,
        name: "Video Chat Connect",
        developer: "Social Apps Co",
        category: "social",
        icon: "💬",
        version: "5.1.2",
        size: "65 MB",
        downloads: "500M+",
        rating: 4.6,
        reviews: 1200000,
        description: "Connect with friends through video calls, messages, and group chats. High-quality video calling.",
        fullDescription: "Video Chat Connect makes staying in touch easy and fun. Enjoy crystal-clear video calls, instant messaging, group chats, and share photos and videos with your loved ones. End-to-end encrypted for your privacy.",
        whatsNew: "- Improved video quality\n- New filters and effects\n- Enhanced security",
        permissions: ["Camera", "Microphone", "Contacts", "Internet"],
        screenshots: 4,
        isFeatured: true,
        lastUpdate: "2025-01-30"
    },
    {
        id: 6,
        name: "Fitness Tracker",
        developer: "Health Apps",
        category: "health",
        icon: "💪",
        version: "3.3.0",
        size: "38 MB",
        downloads: "20M+",
        rating: 4.4,
        reviews: 95000,
        description: "Track workouts, count calories, and achieve your fitness goals. Complete health and fitness companion.",
        fullDescription: "Fitness Tracker is your personal fitness coach. Track your workouts, monitor your progress, count steps, calories, and get personalized workout plans. Sync with wearable devices and achieve your health goals.",
        whatsNew: "- New workout plans\n- Improved step counter\n- Integration with smartwatches",
        permissions: ["Sensors", "Location", "Internet"],
        screenshots: 5,
        isFeatured: false,
        lastUpdate: "2025-01-18"
    },
    {
        id: 7,
        name: "Learning Hub",
        developer: "EduTech",
        category: "education",
        icon: "📚",
        version: "2.5.3",
        size: "55 MB",
        downloads: "15M+",
        rating: 4.7,
        reviews: 180000,
        description: "Learn new skills with video courses, quizzes, and certificates. Thousands of courses available.",
        fullDescription: "Learning Hub provides access to thousands of courses across various subjects. Learn programming, design, business, languages, and more. Interactive lessons, quizzes, and certificates upon completion.",
        whatsNew: "- 100+ new courses\n- Offline download\n- Progress tracking",
        permissions: ["Storage", "Internet"],
        screenshots: 4,
        isFeatured: false,
        lastUpdate: "2025-01-22"
    },
    {
        id: 8,
        name: "File Manager Plus",
        developer: "System Tools",
        category: "tools",
        icon: "📁",
        version: "6.0.1",
        size: "22 MB",
        downloads: "30M+",
        rating: 4.5,
        reviews: 220000,
        description: "Powerful file manager with cloud storage support. Manage files easily with a clean interface.",
        fullDescription: "File Manager Plus is the most powerful file management app for Android. Browse files, create folders, move and copy files, compress and extract archives, and access cloud storage services. Clean and intuitive interface.",
        whatsNew: "- Added cloud storage support\n- New dark theme\n- Improved file search",
        permissions: ["Storage", "Internet"],
        screenshots: 3,
        isFeatured: true,
        lastUpdate: "2025-01-26"
    }
];

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedApps();
    loadPopularApps();
    loadRecentUpdates();
});

// Load featured apps
function loadFeaturedApps() {
    const container = document.getElementById('featuredApps');
    const featuredApps = allApps.filter(app => app.isFeatured);
    
    container.innerHTML = featuredApps.map(app => createAppCard(app)).join('');
}

// Load popular apps
function loadPopularApps() {
    const container = document.getElementById('popularApps');
    const popularApps = allApps.sort((a, b) => {
        const downloadsA = parseInt(a.downloads);
        const downloadsB = parseInt(b.downloads);
        return downloadsB - downloadsA;
    }).slice(0, 6);
    
    container.innerHTML = popularApps.map(app => createAppCard(app)).join('');
}

// Load recent updates
function loadRecentUpdates() {
    const container = document.getElementById('recentUpdates');
    const recentApps = allApps.sort((a, b) => new Date(b.lastUpdate) - new Date(a.lastUpdate)).slice(0, 5);
    
    container.innerHTML = recentApps.map(app => createAppListItem(app)).join('');
}

// Create app card HTML
function createAppCard(app) {
    return `
        <div class="app-card" onclick="showAppDetails(${app.id})">
            <div class="app-card-header">
                <div class="app-icon">${app.icon}</div>
                <div class="app-info">
                    <h3>${app.name}</h3>
                    <div class="developer">${app.developer}</div>
                    <div class="category">${app.category.toUpperCase()}</div>
                </div>
            </div>
            <div class="app-card-body">
                <div class="app-stats">
                    <div class="stat">⭐ ${app.rating}</div>
                    <div class="stat">📥 ${app.downloads}</div>
                    <div class="stat">📦 ${app.size}</div>
                </div>
                <div class="app-description">${app.description}</div>
                <button class="download-btn" onclick="event.stopPropagation(); downloadApp(${app.id})">
                    Download
                </button>
            </div>
        </div>
    `;
}

// Create app list item HTML
function createAppListItem(app) {
    return `
        <div class="app-list-item" onclick="showAppDetails(${app.id})">
            <div class="app-list-left">
                <div class="app-list-icon">${app.icon}</div>
                <div class="app-list-info">
                    <h3>${app.name}</h3>
                    <p>${app.developer} • Updated: ${formatDate(app.lastUpdate)}</p>
                </div>
            </div>
            <div class="version-badge">v${app.version}</div>
        </div>
    `;
}

// Show app details in modal
function showAppDetails(appId) {
    const app = allApps.find(a => a.id === appId);
    if (!app) return;
    
    const modal = document.getElementById('appModal');
    const detailsContainer = document.getElementById('appDetails');
    
    const stars = '⭐'.repeat(Math.floor(app.rating));
    const screenshots = Array(app.screenshots).fill(0).map((_, i) => 
        `<div class="screenshot"></div>`
    ).join('');
    
    detailsContainer.innerHTML = `
        <div class="app-detail-header">
            <div class="app-detail-icon">${app.icon}</div>
            <div class="app-detail-info">
                <h2>${app.name}</h2>
                <p>${app.developer}</p>
                <div class="rating">
                    <span class="stars">${stars}</span>
                    <span>${app.rating} (${formatNumber(app.reviews)} reviews)</span>
                </div>
                <button class="download-btn" onclick="downloadApp(${app.id})">
                    Download APK (${app.size})
                </button>
            </div>
        </div>
        
        <div class="app-detail-stats">
            <div class="detail-stat">
                <div class="detail-stat-value">${app.downloads}</div>
                <div class="detail-stat-label">Downloads</div>
            </div>
            <div class="detail-stat">
                <div class="detail-stat-value">${app.size}</div>
                <div class="detail-stat-label">Size</div>
            </div>
            <div class="detail-stat">
                <div class="detail-stat-value">v${app.version}</div>
                <div class="detail-stat-label">Version</div>
            </div>
            <div class="detail-stat">
                <div class="detail-stat-value">${app.category}</div>
                <div class="detail-stat-label">Category</div>
            </div>
        </div>
        
        <div class="app-detail-section">
            <h3>About this app</h3>
            <p>${app.fullDescription}</p>
        </div>
        
        <div class="app-detail-section">
            <h3>What's New</h3>
            <p>${app.whatsNew.replace(/\n/g, '<br>')}</p>
        </div>
        
        <div class="app-detail-section">
            <h3>Permissions</h3>
            <ul>
                ${app.permissions.map(p => `<li>${p}</li>`).join('')}
            </ul>
        </div>
        
        <div class="app-detail-section">
            <h3>Screenshots</h3>
            <div class="screenshots">
                ${screenshots}
            </div>
        </div>
        
        <div class="app-detail-section">
            <h3>Additional Information</h3>
            <p><strong>Updated:</strong> ${formatDate(app.lastUpdate)}</p>
            <p><strong>Current Version:</strong> ${app.version}</p>
            <p><strong>Requires Android:</strong> 5.0 and up</p>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Close modal
function closeModal() {
    document.getElementById('appModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('appModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Download app
function downloadApp(appId) {
    const app = allApps.find(a => a.id === appId);
    if (!app) return;
    
    // In a real application, this would trigger an actual download
    alert(`Downloading ${app.name} v${app.version}...\n\nIn production, this would download the APK file from your server.`);
    
    // You would make an API call like:
    // window.location.href = `${API_BASE_URL}/download/${appId}`;
}

// Search apps
function searchApps() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    
    if (!query) {
        loadFeaturedApps();
        return;
    }
    
    const results = allApps.filter(app => 
        app.name.toLowerCase().includes(query) ||
        app.developer.toLowerCase().includes(query) ||
        app.category.toLowerCase().includes(query) ||
        app.description.toLowerCase().includes(query)
    );
    
    const container = document.getElementById('featuredApps');
    
    if (results.length === 0) {
        container.innerHTML = '<p class="loading">No apps found matching your search.</p>';
        return;
    }
    
    container.innerHTML = results.map(app => createAppCard(app)).join('');
    
    // Scroll to results
    document.getElementById('trending').scrollIntoView({ behavior: 'smooth' });
}

// Allow search on Enter key
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchApps();
            }
        });
    }
});

// Filter by category
function filterByCategory(category) {
    const filtered = allApps.filter(app => app.category === category);
    const container = document.getElementById('featuredApps');
    
    container.innerHTML = filtered.map(app => createAppCard(app)).join('');
    
    // Scroll to results
    document.getElementById('trending').scrollIntoView({ behavior: 'smooth' });
}

// Utility functions
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// API Functions (for when you connect to backend)
async function fetchApps() {
    try {
        const response = await fetch(`${API_BASE_URL}/apps`);
        const data = await response.json();
        allApps = data;
        loadFeaturedApps();
        loadPopularApps();
        loadRecentUpdates();
    } catch (error) {
        console.error('Error fetching apps:', error);
    }
}

async function fetchAppById(appId) {
    try {
        const response = await fetch(`${API_BASE_URL}/apps/${appId}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching app:', error);
        return null;
    }
}

async function searchAppsAPI(query) {
    try {
        const response = await fetch(`${API_BASE_URL}/apps/search?q=${encodeURIComponent(query)}`);
        return await response.json();
    } catch (error) {
        console.error('Error searching apps:', error);
        return [];
    }
}

async function incrementDownload(appId) {
    try {
        await fetch(`${API_BASE_URL}/apps/${appId}/download`, {
            method: 'POST'
        });
    } catch (error) {
        console.error('Error incrementing download:', error);
    }
}

// Uncomment this to use real API data instead of sample data
// fetchApps();
