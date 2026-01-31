const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use('/downloads', express.static('downloads'));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/psapk';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// App Schema
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

// Text search index
appSchema.index({ name: 'text', description: 'text', developer: 'text' });

const App = mongoose.model('App', appSchema);

// Review Schema
const reviewSchema = new mongoose.Schema({
    appId: { type: mongoose.Schema.Types.ObjectId, ref: 'App', required: true },
    userId: { type: String, required: true },
    userName: String,
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: String,
    createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);

// Category Schema
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    displayName: String,
    icon: String,
    description: String,
    appCount: { type: Number, default: 0 }
});

const Category = mongoose.model('Category', categorySchema);

// File Upload Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = file.fieldname === 'apk' ? './downloads' : './uploads';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
    fileFilter: function (req, file, cb) {
        if (file.fieldname === 'apk') {
            if (path.extname(file.originalname).toLowerCase() === '.apk') {
                cb(null, true);
            } else {
                cb(new Error('Only .apk files are allowed'));
            }
        } else if (file.fieldname === 'icon' || file.fieldname === 'screenshots') {
            if (['.png', '.jpg', '.jpeg', '.webp'].includes(path.extname(file.originalname).toLowerCase())) {
                cb(null, true);
            } else {
                cb(new Error('Only image files are allowed'));
            }
        } else {
            cb(null, true);
        }
    }
});

// ========== ROUTES ==========

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'PS APK API is running' });
});

// Get all apps with pagination
app.get('/api/apps', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const category = req.query.category;
        const featured = req.query.featured;
        const sort = req.query.sort || '-downloads';

        let query = {};
        if (category) query.category = category;
        if (featured) query.isFeatured = featured === 'true';

        const apps = await App.find(query)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await App.countDocuments(query);

        res.json({
            apps,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalApps: total
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get single app by ID
app.get('/api/apps/:id', async (req, res) => {
    try {
        const app = await App.findById(req.params.id);
        if (!app) {
            return res.status(404).json({ error: 'App not found' });
        }
        res.json(app);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Search apps
app.get('/api/apps/search/:query', async (req, res) => {
    try {
        const query = req.params.query;
        const apps = await App.find({
            $text: { $search: query }
        }).limit(20);
        
        res.json(apps);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get featured apps
app.get('/api/apps/featured', async (req, res) => {
    try {
        const apps = await App.find({ isFeatured: true }).limit(10);
        res.json(apps);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get popular apps
app.get('/api/apps/popular', async (req, res) => {
    try {
        const apps = await App.find().sort('-downloads').limit(10);
        res.json(apps);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get recent updates
app.get('/api/apps/recent', async (req, res) => {
    try {
        const apps = await App.find().sort('-updatedAt').limit(10);
        res.json(apps);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get apps by category
app.get('/api/apps/category/:category', async (req, res) => {
    try {
        const apps = await App.find({ category: req.params.category });
        res.json(apps);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new app (admin)
app.post('/api/apps', upload.fields([
    { name: 'apk', maxCount: 1 },
    { name: 'icon', maxCount: 1 },
    { name: 'screenshots', maxCount: 5 }
]), async (req, res) => {
    try {
        const appData = {
            ...req.body,
            permissions: JSON.parse(req.body.permissions || '[]')
        };

        if (req.files['apk']) {
            appData.apkFile = req.files['apk'][0].filename;
        }
        if (req.files['icon']) {
            appData.icon = req.files['icon'][0].filename;
        }
        if (req.files['screenshots']) {
            appData.screenshots = req.files['screenshots'].map(f => f.filename);
        }

        const app = new App(appData);
        await app.save();

        res.status(201).json(app);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update app
app.put('/api/apps/:id', upload.fields([
    { name: 'apk', maxCount: 1 },
    { name: 'icon', maxCount: 1 },
    { name: 'screenshots', maxCount: 5 }
]), async (req, res) => {
    try {
        const updateData = { ...req.body, updatedAt: Date.now() };

        if (req.body.permissions) {
            updateData.permissions = JSON.parse(req.body.permissions);
        }

        if (req.files['apk']) {
            updateData.apkFile = req.files['apk'][0].filename;
        }
        if (req.files['icon']) {
            updateData.icon = req.files['icon'][0].filename;
        }
        if (req.files['screenshots']) {
            updateData.screenshots = req.files['screenshots'].map(f => f.filename);
        }

        const app = await App.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!app) {
            return res.status(404).json({ error: 'App not found' });
        }

        res.json(app);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete app
app.delete('/api/apps/:id', async (req, res) => {
    try {
        const app = await App.findByIdAndDelete(req.params.id);
        if (!app) {
            return res.status(404).json({ error: 'App not found' });
        }

        // Delete associated files
        if (app.apkFile && fs.existsSync(`./downloads/${app.apkFile}`)) {
            fs.unlinkSync(`./downloads/${app.apkFile}`);
        }
        if (app.icon && fs.existsSync(`./uploads/${app.icon}`)) {
            fs.unlinkSync(`./uploads/${app.icon}`);
        }

        res.json({ message: 'App deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Download app
app.get('/api/download/:id', async (req, res) => {
    try {
        const app = await App.findById(req.params.id);
        if (!app) {
            return res.status(404).json({ error: 'App not found' });
        }

        if (!app.apkFile) {
            return res.status(404).json({ error: 'APK file not found' });
        }

        const filePath = path.join(__dirname, 'downloads', app.apkFile);
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'APK file not found on server' });
        }

        // Increment download count
        app.downloads += 1;
        await app.save();

        res.download(filePath, `${app.name}-v${app.version}.apk`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ========== REVIEW ROUTES ==========

// Get reviews for an app
app.get('/api/apps/:id/reviews', async (req, res) => {
    try {
        const reviews = await Review.find({ appId: req.params.id })
            .sort('-createdAt')
            .limit(50);
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add review
app.post('/api/apps/:id/reviews', async (req, res) => {
    try {
        const review = new Review({
            appId: req.params.id,
            ...req.body
        });
        await review.save();

        // Update app rating
        const reviews = await Review.find({ appId: req.params.id });
        const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
        
        await App.findByIdAndUpdate(req.params.id, {
            rating: avgRating,
            reviews: reviews.length
        });

        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ========== CATEGORY ROUTES ==========

// Get all categories
app.get('/api/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create category
app.post('/api/categories', async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ========== STATISTICS ROUTES ==========

// Get overall statistics
app.get('/api/stats', async (req, res) => {
    try {
        const totalApps = await App.countDocuments();
        const totalDownloads = await App.aggregate([
            { $group: { _id: null, total: { $sum: '$downloads' } } }
        ]);
        const categoryStats = await App.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } }
        ]);

        res.json({
            totalApps,
            totalDownloads: totalDownloads[0]?.total || 0,
            categoryStats
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`PS APK Server running on port ${PORT}`);
    console.log(`API available at http://localhost:${PORT}/api`);
});

module.exports = app;
