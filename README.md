# PS APK - Android App Store Platform

A complete, modern web-based Android APK distribution platform with admin panel, built with Node.js, Express, MongoDB, and vanilla JavaScript.

## 🚀 Features

### Frontend (User-Facing)
- **Modern UI Design** - Clean, responsive interface with gradient styling
- **App Browsing** - Browse apps by categories, featured apps, popular downloads
- **Search Functionality** - Real-time search across app names, developers, categories
- **Category Filter** - 8 predefined categories (Games, Social, Tools, Entertainment, etc.)
- **App Details Modal** - Comprehensive app information with screenshots, permissions, reviews
- **Featured Apps Section** - Highlighted apps on the homepage
- **Popular Downloads** - Most downloaded apps ranking
- **Recent Updates** - Latest updated apps
- **Responsive Design** - Works on desktop, tablet, and mobile devices

### Backend (API)
- **RESTful API** - Complete API for all operations
- **File Upload** - Support for APK files, icons, and screenshots
- **MongoDB Database** - NoSQL database for flexible data storage
- **Search** - Text-based search with MongoDB indexing
- **Statistics** - Dashboard stats (total apps, downloads, categories)
- **Reviews System** - User reviews and ratings
- **Download Tracking** - Automatic download count increment
- **Category Management** - Dynamic category system

### Admin Panel
- **Dashboard** - Overview with statistics and charts
- **App Management** - Add, edit, delete, and view apps
- **File Uploads** - APK, icon, and screenshot uploads
- **Category Management** - Create and manage categories
- **Search & Filter** - Find apps quickly in admin interface
- **Review Moderation** - View and manage user reviews
- **Settings** - Configure platform settings

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## 🛠️ Installation

### 1. Clone or Extract the Project

```bash
cd ps-apk-store
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Set Up MongoDB

**Option 1: Local MongoDB**
- Install MongoDB on your system
- Start MongoDB service:
  ```bash
  mongod
  ```

**Option 2: MongoDB Atlas (Cloud)**
- Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster
- Get connection string

### 4. Configure Environment

Create a `.env` file in the `backend` directory:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/psapk
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/psapk
```

### 5. Seed the Database (Optional)

```bash
npm run seed
```

This will populate your database with sample apps and categories.

## 🚀 Running the Application

### Start the Backend Server

```bash
cd backend
npm start
```

The API will be available at `http://localhost:3000`

For development with auto-reload:
```bash
npm run dev
```

### Serve the Frontend

**Option 1: Using Live Server (VS Code Extension)**
- Install "Live Server" extension in VS Code
- Right-click on `frontend/index.html`
- Select "Open with Live Server"

**Option 2: Using Python**
```bash
cd frontend
python -m http.server 8000
```

**Option 3: Using Node.js http-server**
```bash
npm install -g http-server
cd frontend
http-server
```

### Access the Application

- **User Site**: `http://localhost:8000` (or your chosen port)
- **Admin Panel**: `http://localhost:8000/admin.html`
- **API**: `http://localhost:3000/api`

## 📁 Project Structure

```
ps-apk-store/
├── frontend/
│   ├── index.html          # Main user-facing page
│   ├── styles.css          # User interface styles
│   ├── app.js              # Frontend functionality
│   ├── admin.html          # Admin panel
│   ├── admin-styles.css    # Admin panel styles
│   └── admin.js            # Admin functionality
├── backend/
│   ├── server.js           # Express server & API
│   ├── package.json        # Backend dependencies
│   └── seed.js             # Database seeding script
├── database/
│   └── (MongoDB data stored here if local)
└── docs/
    └── README.md           # This file
```

## 🔌 API Endpoints

### Apps

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/apps` | Get all apps (with pagination) |
| GET | `/api/apps/:id` | Get single app by ID |
| GET | `/api/apps/search/:query` | Search apps |
| GET | `/api/apps/featured` | Get featured apps |
| GET | `/api/apps/popular` | Get popular apps |
| GET | `/api/apps/recent` | Get recently updated apps |
| GET | `/api/apps/category/:category` | Get apps by category |
| POST | `/api/apps` | Create new app (multipart/form-data) |
| PUT | `/api/apps/:id` | Update app |
| DELETE | `/api/apps/:id` | Delete app |
| GET | `/api/download/:id` | Download APK file |

### Reviews

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/apps/:id/reviews` | Get reviews for an app |
| POST | `/api/apps/:id/reviews` | Add a review |

### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | Get all categories |
| POST | `/api/categories` | Create category |

### Statistics

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/stats` | Get overall statistics |

## 📦 Adding an App (via Admin Panel)

1. Open Admin Panel (`admin.html`)
2. Navigate to "Add New App"
3. Fill in the form:
   - **Required**: Name, Developer, Package Name, Category, Version
   - **Optional**: Size, Android versions, descriptions, permissions
   - **Files**: Icon (image), APK file, Screenshots (up to 5)
4. Check "Featured App" if you want it highlighted
5. Click "Add App"

## 🔧 Configuration

### Categories

Default categories include:
- Games (🎮)
- Social (💬)
- Tools (🔧)
- Entertainment (🎬)
- Productivity (📊)
- Education (📚)
- Photography (📷)
- Music & Audio (🎵)

You can add more categories through the admin panel.

### File Upload Limits

- APK files: 100 MB max
- Images: Standard image formats (PNG, JPG, JPEG, WEBP)
- Screenshots: Up to 5 per app

## 🎨 Customization

### Branding

1. **Site Name**: Edit in `index.html` and `admin.html`
2. **Colors**: Modify gradient colors in CSS files
3. **Logo**: Replace text logo with image in header section

### Styling

- Main styles: `frontend/styles.css`
- Admin styles: `frontend/admin-styles.css`
- Color scheme uses purple gradient (`#667eea` to `#764ba2`)

## 🔒 Security Considerations

**Important**: This is a basic implementation. For production use, add:

1. **Authentication & Authorization**
   - Admin login system
   - JWT tokens
   - Role-based access control

2. **File Validation**
   - Verify APK signatures
   - Scan for malware
   - Validate file types

3. **Rate Limiting**
   - Prevent API abuse
   - Limit upload frequency

4. **HTTPS**
   - Use SSL certificates
   - Secure data transmission

5. **Input Validation**
   - Sanitize all user inputs
   - Prevent SQL/NoSQL injection
   - XSS protection

## 🚀 Deployment

### Backend Deployment (Heroku Example)

```bash
cd backend
heroku create your-app-name
git push heroku main
```

### Frontend Deployment (Netlify/Vercel)

1. Connect your repository
2. Set build directory to `frontend`
3. Deploy

### Database (MongoDB Atlas)

1. Create cluster in MongoDB Atlas
2. Update connection string in environment variables
3. Whitelist deployment server IP

## 📊 Database Schema

### App Schema
```javascript
{
  name: String,
  developer: String,
  category: String,
  icon: String,
  version: String,
  size: String,
  downloads: Number,
  rating: Number,
  reviews: Number,
  description: String,
  fullDescription: String,
  whatsNew: String,
  permissions: [String],
  screenshots: [String],
  isFeatured: Boolean,
  apkFile: String,
  packageName: String,
  minAndroidVersion: String,
  targetAndroidVersion: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Review Schema
```javascript
{
  appId: ObjectId,
  userId: String,
  userName: String,
  rating: Number,
  comment: String,
  createdAt: Date
}
```

### Category Schema
```javascript
{
  name: String,
  displayName: String,
  icon: String,
  description: String,
  appCount: Number
}
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access (for Atlas)

### File Upload Issues
- Check file size limits
- Verify write permissions on `uploads` and `downloads` folders
- Ensure correct `enctype="multipart/form-data"` on forms

### CORS Errors
- Backend already includes CORS middleware
- If issues persist, check origin configuration

## 📝 Future Enhancements

- [ ] User authentication system
- [ ] User profiles and app upload
- [ ] Comments and discussions
- [ ] App versioning and update history
- [ ] Advanced search with filters
- [ ] App recommendations
- [ ] Download statistics and analytics
- [ ] Email notifications
- [ ] API rate limiting
- [ ] CDN integration for file delivery
- [ ] Mobile app (React Native/Flutter)

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to submit pull requests or open issues.

## 📧 Support

For questions or issues, please open an issue on the repository.

---

**Made with ❤️ for the Android community**
