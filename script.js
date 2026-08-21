// Initialize map
let map = L.map('map').setView([20, 0], 2);
let markers = [];

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
}).addTo(map);

// Add some markers for popular locations
const locations = [
    { lat: 40.7128, lng: -74.0060, name: 'نيويورك، الولايات المتحدة' },
    { lat: 48.8566, lng: 2.3522, name: 'باريس، فرنسا' },
    { lat: 35.6762, lng: 139.6503, name: 'طوكيو، اليابان' },
    { lat: -33.8688, lng: 151.2093, name: 'سيدني، أستراليا' },
    { lat: 30.0444, lng: 31.2357, name: 'القاهرة، مصر' },
    { lat: 51.5074, lng: -0.1278, name: 'لندن، المملكة المتحدة' }
];

// Add markers to map
locations.forEach(location => {
    const marker = L.marker([location.lat, location.lng])
        .bindPopup(`<b>${location.name}</b>`, { closeButton: true })
        .addTo(map);
    markers.push(marker);
});

// Navigation Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
});

// Modal Functions
function toggleAbout() {
    const modal = document.getElementById('aboutModal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

function toggleSettings() {
    const modal = document.getElementById('settingsModal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

function toggleContact() {
    const modal = document.getElementById('contactModal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

// Close modals when clicking outside
window.onclick = function(event) {
    const aboutModal = document.getElementById('aboutModal');
    const settingsModal = document.getElementById('settingsModal');
    const contactModal = document.getElementById('contactModal');
    
    if (event.target === aboutModal) {
        aboutModal.style.display = 'none';
    }
    if (event.target === settingsModal) {
        settingsModal.style.display = 'none';
    }
    if (event.target === contactModal) {
        contactModal.style.display = 'none';
    }
}

// Go to Home
function goToHome() {
    map.setView([20, 0], 2);
    document.querySelector('.nav-menu').classList.remove('active');
}

// Show Featured Locations
function showFeaturedLocations() {
    alert('الأماكن المميزة:\n' +
        '🗽 نيويورك - عاصمة الحرية\n' +
        '🗼 باريس - مدينة الحب\n' +
        '🗾 طوكيو - عاصمة اليابان\n' +
        '🏖️ سيدني - جمال أسترالي\n' +
        '🔺 القاهرة - أرض الفراعنة\n' +
        '🎡 لندن - عاصمة بريطانيا');
    document.querySelector('.nav-menu').classList.remove('active');
}

// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

// Toggle Markers
function toggleMarkers() {
    const showMarkers = document.getElementById('showMarkers').checked;
    markers.forEach(marker => {
        if (showMarkers) {
            map.addLayer(marker);
        } else {
            map.removeLayer(marker);
        }
    });
}

// Set Default Zoom
function setDefaultZoom() {
    const zoomLevel = parseInt(document.getElementById('zoomLevel').value);
    map.setZoom(zoomLevel);
}

// Send Message
function sendMessage(event) {
    event.preventDefault();
    const form = document.getElementById('contactForm');
    const name = form.elements[0].value;
    const email = form.elements[1].value;
    const message = form.elements[2].value;
    
    // Simulating sending message (in real scenario, this would send to a server)
    alert(`شكراً ${name}!\n\nتم استقبال رسالتك على البريد: ${email}\n\nسيتم الرد عليك قريباً.`);
    
    form.reset();
    toggleContact();
}

// Search functionality
function searchLocation() {
    const searchInput = document.getElementById('searchInput').value.trim();
    
    if (!searchInput) {
        alert('الرجاء إدخال اسم المكان');
        return;
    }
    
    // Use Nominatim API (OpenStreetMap's geocoding service)
    fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchInput)}&format=json&limit=1`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const result = data[0];
                const lat = parseFloat(result.lat);
                const lng = parseFloat(result.lon);
                
                // Center map on result
                map.setView([lat, lng], 12);
                
                // Add marker
                L.marker([lat, lng])
                    .bindPopup(`<b>${result.name}</b>`, { closeButton: true })
                    .addTo(map)
                    .openPopup();
            } else {
                alert('لم يتم العثور على المكان. حاول مرة أخرى.');
            }
        })
        .catch(error => {
            console.error('خطأ في البحث:', error);
            alert('حدث خطأ في البحث');
        });
}

// Allow Enter key to search
document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchLocation();
    }
});

// Load dark mode preference from localStorage
window.addEventListener('load', function() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.getElementById('darkMode').checked = true;
    }
});
