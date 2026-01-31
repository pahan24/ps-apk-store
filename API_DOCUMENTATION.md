# PS APK - API Documentation

Base URL: `http://localhost:3000/api`

## Authentication

Currently, the API does not require authentication. For production use, implement JWT-based authentication.

## Response Format

All responses are in JSON format.

**Success Response:**
```json
{
  "data": {},
  "message": "Success"
}
```

**Error Response:**
```json
{
  "error": "Error message"
}
```

---

## Apps API

### Get All Apps

**Endpoint:** `GET /apps`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `category` (optional): Filter by category
- `featured` (optional): Filter featured apps (true/false)
- `sort` (optional): Sort field (default: -downloads)

**Example Request:**
```bash
GET /api/apps?page=1&limit=10&category=games&featured=true
```

**Example Response:**
```json
{
  "apps": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Game Center",
      "developer": "Fun Games Studio",
      "category": "games",
      "version": "1.9.5",
      "size": "120 MB",
      "downloads": 100000000,
      "rating": 4.8,
      "reviews": 500000,
      "description": "Collection of exciting mini-games",
      "isFeatured": true,
      "createdAt": "2025-01-15T00:00:00.000Z"
    }
  ],
  "currentPage": 1,
  "totalPages": 5,
  "totalApps": 50
}
```

---

### Get Single App

**Endpoint:** `GET /apps/:id`

**Parameters:**
- `id`: MongoDB ObjectId of the app

**Example Request:**
```bash
GET /api/apps/507f1f77bcf86cd799439011
```

**Example Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Photo Editor Pro",
  "developer": "Creative Studio",
  "category": "photography",
  "icon": "photo-icon.png",
  "version": "3.5.2",
  "size": "45 MB",
  "downloads": 10000000,
  "rating": 4.5,
  "reviews": 125000,
  "description": "Professional photo editing with advanced features",
  "fullDescription": "Photo Editor Pro is the ultimate...",
  "whatsNew": "- New AI-powered filters\n- Improved performance",
  "permissions": ["Camera", "Storage", "Internet"],
  "screenshots": ["screenshot1.png", "screenshot2.png"],
  "isFeatured": true,
  "apkFile": "photoeditor-v3.5.2.apk",
  "packageName": "com.creativestudio.photoeditor",
  "minAndroidVersion": "5.0",
  "targetAndroidVersion": "13.0",
  "createdAt": "2025-01-15T00:00:00.000Z",
  "updatedAt": "2025-01-20T00:00:00.000Z"
}
```

---

### Search Apps

**Endpoint:** `GET /apps/search/:query`

**Parameters:**
- `query`: Search term

**Example Request:**
```bash
GET /api/apps/search/photo
```

**Example Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Photo Editor Pro",
    "developer": "Creative Studio",
    "category": "photography",
    "rating": 4.5
  }
]
```

---

### Get Featured Apps

**Endpoint:** `GET /apps/featured`

**Example Request:**
```bash
GET /api/apps/featured
```

---

### Get Popular Apps

**Endpoint:** `GET /apps/popular`

Returns apps sorted by download count.

**Example Request:**
```bash
GET /api/apps/popular
```

---

### Get Recent Updates

**Endpoint:** `GET /apps/recent`

Returns apps sorted by last update date.

**Example Request:**
```bash
GET /api/apps/recent
```

---

### Get Apps by Category

**Endpoint:** `GET /apps/category/:category`

**Parameters:**
- `category`: Category name (e.g., games, social, tools)

**Example Request:**
```bash
GET /api/apps/category/games
```

---

### Create App

**Endpoint:** `POST /apps`

**Content-Type:** `multipart/form-data`

**Form Fields:**
- `name` (required): App name
- `developer` (required): Developer name
- `category` (required): App category
- `version` (required): Version number
- `packageName` (required): Android package name
- `description`: Short description
- `fullDescription`: Detailed description
- `whatsNew`: Update notes
- `size`: File size (e.g., "45 MB")
- `permissions`: JSON array of permissions
- `isFeatured`: Boolean (true/false)
- `minAndroidVersion`: Minimum Android version
- `targetAndroidVersion`: Target Android version
- `apk`: APK file (required)
- `icon`: Icon image file
- `screenshots`: Screenshot images (max 5)

**Example Request (using curl):**
```bash
curl -X POST http://localhost:3000/api/apps \
  -F "name=My App" \
  -F "developer=My Company" \
  -F "category=games" \
  -F "version=1.0.0" \
  -F "packageName=com.mycompany.myapp" \
  -F "description=A great app" \
  -F "apk=@myapp.apk" \
  -F "icon=@icon.png"
```

**Example Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "My App",
  "developer": "My Company",
  "apkFile": "apk-1234567890.apk",
  "icon": "icon-1234567890.png"
}
```

---

### Update App

**Endpoint:** `PUT /apps/:id`

**Content-Type:** `multipart/form-data` or `application/json`

**Parameters:**
- `id`: App ID

**Form Fields:** Same as Create App (all optional)

**Example Request:**
```bash
curl -X PUT http://localhost:3000/api/apps/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"version":"1.0.1","whatsNew":"Bug fixes"}'
```

---

### Delete App

**Endpoint:** `DELETE /apps/:id`

**Parameters:**
- `id`: App ID

**Example Request:**
```bash
curl -X DELETE http://localhost:3000/api/apps/507f1f77bcf86cd799439011
```

**Example Response:**
```json
{
  "message": "App deleted successfully"
}
```

---

### Download App

**Endpoint:** `GET /download/:id`

**Parameters:**
- `id`: App ID

**Response:** Binary APK file

**Example Request:**
```bash
GET /api/download/507f1f77bcf86cd799439011
```

This endpoint automatically increments the download count and returns the APK file for download.

---

## Reviews API

### Get App Reviews

**Endpoint:** `GET /apps/:id/reviews`

**Parameters:**
- `id`: App ID

**Example Request:**
```bash
GET /api/apps/507f1f77bcf86cd799439011/reviews
```

**Example Response:**
```json
[
  {
    "_id": "607f1f77bcf86cd799439012",
    "appId": "507f1f77bcf86cd799439011",
    "userId": "user123",
    "userName": "John Doe",
    "rating": 5,
    "comment": "Great app! Very useful.",
    "createdAt": "2025-01-20T00:00:00.000Z"
  }
]
```

---

### Add Review

**Endpoint:** `POST /apps/:id/reviews`

**Parameters:**
- `id`: App ID

**Request Body:**
```json
{
  "userId": "user123",
  "userName": "John Doe",
  "rating": 5,
  "comment": "Excellent app!"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/apps/507f1f77bcf86cd799439011/reviews \
  -H "Content-Type: application/json" \
  -d '{"userId":"user123","userName":"John Doe","rating":5,"comment":"Great!"}'
```

**Example Response:**
```json
{
  "_id": "607f1f77bcf86cd799439012",
  "appId": "507f1f77bcf86cd799439011",
  "rating": 5,
  "comment": "Great!"
}
```

---

## Categories API

### Get All Categories

**Endpoint:** `GET /categories`

**Example Request:**
```bash
GET /api/categories
```

**Example Response:**
```json
[
  {
    "_id": "707f1f77bcf86cd799439013",
    "name": "games",
    "displayName": "Games",
    "icon": "🎮",
    "description": "Play the best mobile games",
    "appCount": 25
  }
]
```

---

### Create Category

**Endpoint:** `POST /categories`

**Request Body:**
```json
{
  "name": "health",
  "displayName": "Health & Fitness",
  "icon": "💪",
  "description": "Health and fitness apps"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name":"health","displayName":"Health & Fitness","icon":"💪"}'
```

---

## Statistics API

### Get Overall Statistics

**Endpoint:** `GET /stats`

**Example Request:**
```bash
GET /api/stats
```

**Example Response:**
```json
{
  "totalApps": 50,
  "totalDownloads": 500000000,
  "categoryStats": [
    {
      "_id": "games",
      "count": 15
    },
    {
      "_id": "social",
      "count": 10
    }
  ]
}
```

---

## Error Codes

| Status Code | Meaning |
|-------------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## Rate Limiting

Currently not implemented. Recommended for production:
- 100 requests per minute per IP
- 1000 requests per hour per IP

---

## File Upload Specifications

### APK Files
- Max size: 100 MB
- Format: .apk
- Stored in: `backend/downloads/`

### Icon Images
- Max size: 5 MB
- Formats: .png, .jpg, .jpeg, .webp
- Recommended: 512x512 px
- Stored in: `backend/uploads/`

### Screenshots
- Max count: 5 per app
- Max size: 5 MB each
- Formats: .png, .jpg, .jpeg, .webp
- Recommended: 1080x1920 px (portrait)
- Stored in: `backend/uploads/`

---

## CORS Configuration

CORS is enabled for all origins in development. For production, restrict to specific domains:

```javascript
app.use(cors({
  origin: ['https://yourdomain.com', 'https://admin.yourdomain.com']
}));
```

---

## Testing the API

### Using curl

```bash
# Health check
curl http://localhost:3000/api/health

# Get all apps
curl http://localhost:3000/api/apps

# Search
curl http://localhost:3000/api/apps/search/game
```

### Using Postman

1. Import collection from repository
2. Set base URL to `http://localhost:3000/api`
3. Test endpoints

---

## Webhooks (Future Feature)

Coming soon: Webhooks for app updates, new reviews, etc.

---

## API Versioning

Current version: v1 (implicit)

Future versions will use URL versioning:
- `/api/v1/apps`
- `/api/v2/apps`

---

**Last Updated:** January 2025
