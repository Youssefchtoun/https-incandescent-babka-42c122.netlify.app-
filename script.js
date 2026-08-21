// Initialize map
let map = L.map('map').setView([20, 0], 2);

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
    L.marker([location.lat, location.lng])
        .bindPopup(`<b>${location.name}</b>`, { closeButton: true })
        .addTo(map);
});

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
