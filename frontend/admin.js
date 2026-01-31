// Admin Panel JavaScript
const API_BASE_URL = 'http://localhost:3000/api';

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    loadDashboardStats();
    loadApps();
    loadCategories();
});

// Navigation
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Update nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.nav-item').classList.add('active');
    
    // Update page title
    const titles = {
        'dashboard': 'Dashboard',
        'apps': 'Manage Apps',
        'add-app': 'Add New App',
        'categories': 'Categories',
        'reviews': 'Reviews',
        'settings': 'Settings'
    };
    document.getElementById('page-title').textContent = titles[sectionId] || 'Admin Panel';
}

// Dashboard Functions
async function loadDashboardStats() {
    try {
        const response = await fetch(`${API_BASE_URL}/stats`);
        const stats = await response.json();
        
        document.getElementById('total-apps').textContent = stats.totalApps;
        document.getElementById('total-downloads').textContent = formatNumber(stats.totalDownloads);
        document.getElementById('total-categories').textContent = stats.categoryStats.length;
        
        // Calculate average rating (mock for now)
        document.getElementById('avg-rating').textContent = '4.5';
        
        // Load recent activity
        loadRecentActivity();
        loadTopDownloads();
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

function loadRecentActivity() {
    const activityContainer = document.getElementById('recent-activity');
    const activities = [
        { text: 'New app "Photo Editor Pro" added', time: '2 hours ago' },
        { text: 'App "Music Player" updated to v2.8.1', time: '5 hours ago' },
        { text: 'New review submitted for "Game Center"', time: '1 day ago' },
        { text: 'Category "Health" created', time: '2 days ago' },
        { text: 'App "Video Chat" downloaded 1000 times', time: '3 days ago' }
    ];
    
    activityContainer.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <p>${activity.text}</p>
            <small>${activity.time}</small>
        </div>
    `).join('');
}

async function loadTopDownloads() {
    try {
        const response = await fetch(`${API_BASE_URL}/apps/popular`);
        const apps = await response.json();
        
        const container = document.getElementById('top-downloads');
        container.innerHTML = apps.slice(0, 5).map((app, index) => `
            <div class="activity-item">
                <p><strong>#${index + 1}</strong> ${app.name} - ${formatNumber(app.downloads)} downloads</p>
                <small>Rating: ${app.rating} ⭐</small>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading top downloads:', error);
    }
}

// Apps Management
async function loadApps() {
    try {
        const response = await fetch(`${API_BASE_URL}/apps?limit=100`);
        const data = await response.json();
        const apps = data.apps;
        
        const tbody = document.getElementById('apps-table-body');
        tbody.innerHTML = apps.map(app => `
            <tr>
                <td><span class="app-icon-small">${app.icon || '📱'}</span></td>
                <td>${app.name}</td>
                <td>${app.developer}</td>
                <td>${app.category}</td>
                <td>v${app.version}</td>
                <td>${formatNumber(app.downloads)}</td>
                <td>${app.rating} ⭐</td>
                <td>
                    <button class="action-btn btn-view" onclick="viewApp('${app._id}')">View</button>
                    <button class="action-btn btn-edit" onclick="editApp('${app._id}')">Edit</button>
                    <button class="action-btn btn-delete" onclick="deleteApp('${app._id}')">Delete</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error loading apps:', error);
    }
}

async function viewApp(appId) {
    try {
        const response = await fetch(`${API_BASE_URL}/apps/${appId}`);
        const app = await response.json();
        
        alert(`App Details:
Name: ${app.name}
Developer: ${app.developer}
Version: ${app.version}
Downloads: ${formatNumber(app.downloads)}
Rating: ${app.rating}
Category: ${app.category}
Description: ${app.description}`);
    } catch (error) {
        console.error('Error viewing app:', error);
    }
}

function editApp(appId) {
    // Open edit modal
    const modal = document.getElementById('edit-modal');
    modal.style.display = 'block';
    
    // Load app data into form
    fetch(`${API_BASE_URL}/apps/${appId}`)
        .then(response => response.json())
        .then(app => {
            const form = document.getElementById('edit-app-form');
            form.elements['appId'].value = app._id;
            form.elements['name'].value = app.name;
            form.elements['developer'].value = app.developer;
            form.elements['category'].value = app.category;
            form.elements['version'].value = app.version;
        })
        .catch(error => console.error('Error loading app for edit:', error));
}

function closeEditModal() {
    document.getElementById('edit-modal').style.display = 'none';
}

async function deleteApp(appId) {
    if (!confirm('Are you sure you want to delete this app?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/apps/${appId}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            alert('App deleted successfully');
            loadApps();
            loadDashboardStats();
        } else {
            alert('Failed to delete app');
        }
    } catch (error) {
        console.error('Error deleting app:', error);
        alert('Error deleting app');
    }
}

// Add App Form Handler
document.getElementById('add-app-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    
    // Convert permissions to array
    const permissions = formData.get('permissions');
    if (permissions) {
        const permissionsArray = permissions.split(',').map(p => p.trim());
        formData.set('permissions', JSON.stringify(permissionsArray));
    }
    
    // Convert isFeatured to boolean
    formData.set('isFeatured', formData.get('isFeatured') === 'on');
    
    try {
        const response = await fetch(`${API_BASE_URL}/apps`, {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            alert('App added successfully!');
            this.reset();
            loadApps();
            loadDashboardStats();
        } else {
            const error = await response.json();
            alert('Error adding app: ' + error.error);
        }
    } catch (error) {
        console.error('Error adding app:', error);
        alert('Error adding app: ' + error.message);
    }
});

// Edit App Form Handler
document.getElementById('edit-app-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const appId = formData.get('appId');
    
    const updateData = {
        name: formData.get('name'),
        developer: formData.get('developer'),
        category: formData.get('category'),
        version: formData.get('version')
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/apps/${appId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        });
        
        if (response.ok) {
            alert('App updated successfully!');
            closeEditModal();
            loadApps();
        } else {
            alert('Error updating app');
        }
    } catch (error) {
        console.error('Error updating app:', error);
        alert('Error updating app');
    }
});

// Categories Management
async function loadCategories() {
    try {
        const response = await fetch(`${API_BASE_URL}/categories`);
        const categories = await response.json();
        
        const container = document.getElementById('categories-grid');
        container.innerHTML = categories.map(category => `
            <div class="category-admin-card">
                <div class="icon">${category.icon}</div>
                <h4>${category.displayName}</h4>
                <p>${category.appCount} apps</p>
                <button class="action-btn btn-edit" onclick="editCategory('${category._id}')">Edit</button>
                <button class="action-btn btn-delete" onclick="deleteCategory('${category._id}')">Delete</button>
            </div>
        `).join('');
        
        // Also populate category filter
        const filterSelect = document.getElementById('filter-category');
        filterSelect.innerHTML = '<option value="">All Categories</option>' +
            categories.map(cat => `<option value="${cat.name}">${cat.displayName}</option>`).join('');
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

function showAddCategory() {
    const name = prompt('Enter category name:');
    if (!name) return;
    
    const displayName = prompt('Enter display name:');
    const icon = prompt('Enter emoji icon:');
    const description = prompt('Enter description:');
    
    addCategory({ name, displayName, icon, description });
}

async function addCategory(categoryData) {
    try {
        const response = await fetch(`${API_BASE_URL}/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categoryData)
        });
        
        if (response.ok) {
            alert('Category added successfully!');
            loadCategories();
        } else {
            alert('Error adding category');
        }
    } catch (error) {
        console.error('Error adding category:', error);
    }
}

function editCategory(categoryId) {
    alert('Edit category feature coming soon!');
}

async function deleteCategory(categoryId) {
    if (!confirm('Are you sure you want to delete this category?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/categories/${categoryId}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            alert('Category deleted successfully');
            loadCategories();
        } else {
            alert('Failed to delete category');
        }
    } catch (error) {
        console.error('Error deleting category:', error);
    }
}

// Search and Filter
document.getElementById('search-apps').addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#apps-table-body tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
    });
});

document.getElementById('filter-category').addEventListener('change', function(e) {
    const category = e.target.value;
    const rows = document.querySelectorAll('#apps-table-body tr');
    
    if (!category) {
        rows.forEach(row => row.style.display = '');
        return;
    }
    
    rows.forEach(row => {
        const categoryCell = row.cells[3].textContent;
        row.style.display = categoryCell === category ? '' : 'none';
    });
});

// Database Management
async function seedDatabase() {
    if (!confirm('This will add sample data to the database. Continue?')) {
        return;
    }
    
    alert('Database seeding is a backend operation. Please run: npm run seed');
}

// Utility Functions
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Close modals when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('edit-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}
