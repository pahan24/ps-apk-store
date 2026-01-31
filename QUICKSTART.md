# Quick Start Guide - PS APK Store

## ⚡ Get Running in 5 Minutes

### Step 1: Install MongoDB

**Windows:**
1. Download from https://www.mongodb.com/try/download/community
2. Run installer
3. Start MongoDB service from Services

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

### Step 2: Set Up Backend

```bash
# Navigate to backend folder
cd ps-apk-store/backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Seed database with sample data
npm run seed

# Start server
npm start
```

You should see:
```
Connected to MongoDB
PS APK Server running on port 3000
```

### Step 3: Set Up Frontend

**Option A: Using VS Code Live Server**
1. Install "Live Server" extension in VS Code
2. Open `ps-apk-store/frontend/index.html`
3. Right-click → "Open with Live Server"

**Option B: Using Python**
```bash
cd ps-apk-store/frontend
python -m http.server 8000
```

**Option C: Using npm http-server**
```bash
npm install -g http-server
cd ps-apk-store/frontend
http-server -p 8000
```

### Step 4: Access the Application

Open your browser:
- **Main Site**: http://localhost:8000
- **Admin Panel**: http://localhost:8000/admin.html
- **API**: http://localhost:3000/api/health

## ✅ Verify Installation

1. **Check API**: Visit http://localhost:3000/api/health
   - Should show: `{"status":"OK","message":"PS APK API is running"}`

2. **Check Database**: Visit http://localhost:3000/api/stats
   - Should show statistics about apps in database

3. **Check Frontend**: Visit http://localhost:8000
   - Should see the PS APK homepage with sample apps

4. **Check Admin**: Visit http://localhost:8000/admin.html
   - Should see admin dashboard with stats

## 🎯 First Tasks

### Add Your First App (Manual)

1. Go to http://localhost:8000/admin.html
2. Click "Add New App" in sidebar
3. Fill in the form:
   - Name: "Test App"
   - Developer: "Your Name"
   - Package Name: "com.test.app"
   - Category: Select any
   - Version: "1.0.0"
   - Description: "My first test app"
4. Upload an APK file (or use a dummy file for testing)
5. Click "Add App"

### Test the Main Site

1. Go to http://localhost:8000
2. Browse categories
3. Search for apps
4. Click on an app to view details
5. Try the download button (in production, this would download the APK)

## 🔧 Common Issues & Solutions

### Issue: "Cannot connect to MongoDB"
**Solution:**
- Make sure MongoDB is running
- Check `MONGODB_URI` in `.env` file
- Try: `mongo` or `mongosh` in terminal to verify connection

### Issue: "Port 3000 already in use"
**Solution:**
- Change `PORT=3000` to `PORT=3001` in `.env`
- Update API_BASE_URL in frontend JavaScript files

### Issue: "File upload fails"
**Solution:**
- Create `uploads` and `downloads` folders in backend directory:
```bash
cd backend
mkdir uploads downloads
```

### Issue: "No apps showing on frontend"
**Solution:**
- Make sure backend is running
- Run database seed: `npm run seed`
- Check browser console for errors
- Verify API_BASE_URL in `frontend/app.js`

### Issue: "CORS errors"
**Solution:**
- Backend already has CORS enabled
- If still having issues, check that frontend and backend URLs match

## 📱 Sample Data

The seed script adds:
- 10 sample apps across different categories
- 8 categories (Games, Social, Tools, etc.)
- Sample ratings and download counts

You can customize this data in `backend/seed.js`

## 🎨 Customization Quick Tips

### Change Colors
Edit `frontend/styles.css` and `frontend/admin-styles.css`:
```css
/* Find and replace these colors */
#667eea → Your primary color
#764ba2 → Your secondary color
```

### Change Site Name
1. `frontend/index.html`: Update `<h1>PS APK</h1>` and `<title>`
2. `frontend/admin.html`: Update `<h2>PS APK Admin</h2>`

### Add More Categories
1. Go to admin panel
2. Click "Categories"
3. Click "Add Category"
4. Enter details (name, display name, emoji icon)

## 📊 Testing the API

Use these curl commands or Postman:

```bash
# Get all apps
curl http://localhost:3000/api/apps

# Get featured apps
curl http://localhost:3000/api/apps/featured

# Search apps
curl http://localhost:3000/api/apps/search/music

# Get statistics
curl http://localhost:3000/api/stats

# Get app by ID (replace with actual ID)
curl http://localhost:3000/api/apps/507f1f77bcf86cd799439011
```

## 🚀 Next Steps

1. **Add Authentication**: Implement login system for admin panel
2. **Deploy**: Host on Heroku, AWS, or DigitalOcean
3. **Custom Domain**: Point your domain to the deployment
4. **SSL Certificate**: Enable HTTPS with Let's Encrypt
5. **Analytics**: Add Google Analytics or custom tracking
6. **CDN**: Use Cloudflare or AWS CloudFront for file delivery

## 💡 Tips

- Keep backend running in one terminal
- Keep frontend server in another terminal
- Use browser DevTools to debug
- Check backend logs for errors
- MongoDB Compass is great for viewing database

## 🆘 Need Help?

- Check the full README.md for detailed documentation
- MongoDB docs: https://docs.mongodb.com
- Express.js docs: https://expressjs.com
- Node.js docs: https://nodejs.org

---

**You're all set! Happy coding! 🎉**
