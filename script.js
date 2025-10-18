let placesService, currentCafes = [], currentCardIndex = 0;
let userPreferences = { quiet: false, wifi: false, cozy: false, social: false, workspace: false, artisan: false };
let userStats = {
  visited: 0, saved: 0, avgMatchScore: 0, totalMatchScores: [],
  level: 'Coffee Newbie',
  username: localStorage.getItem('userUsername') || 'User_' + Math.random().toString(36).substr(2, 9),
  userId: localStorage.getItem('userId') || 'user_' + Date.now()
};
let uploadedPhotos = JSON.parse(sessionStorage.getItem('uploadedPhotos') || '{}');

const sentimentKeywords = {
  positive: ['love', 'amazing', 'great', 'excellent', 'best', 'wonderful', 'cozy', 'friendly', 'perfect', 'awesome', 'fantastic'],
  negative: ['bad', 'worst', 'terrible', 'poor', 'rude', 'dirty', 'crowded', 'expensive', 'cold', 'disappointing']
};

function analyzeSentiment(text) {
  if (!text) return 0.5;
  const lower = text.toLowerCase();
  let pos = sentimentKeywords.positive.filter(w => lower.includes(w)).length;
  let neg = sentimentKeywords.negative.filter(w => lower.includes(w)).length;
  return Math.max(0, Math.min(1, (pos - neg) / 10 + 0.5));
}

function switchTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  document.querySelectorAll('.search-content').forEach(c => c.classList.remove('active'));
  document.getElementById(tab + 'Search').classList.add('active');
}

function togglePreference(pref) {
  userPreferences[pref] = !userPreferences[pref];
  event.target.closest('.preference-chip').classList.toggle('selected');
}

function generatePreferenceGrid() {
  const prefs = [
    { key: 'quiet', icon: '🤫', label: 'Quiet' },
    { key: 'wifi', icon: '📶', label: 'WiFi' },
    { key: 'cozy', icon: '🕯️', label: 'Cozy' },
    { key: 'social', icon: '👥', label: 'Social' },
    { key: 'workspace', icon: '💼', label: 'Workspace' },
    { key: 'artisan', icon: '🎨', label: 'Artisan' }
  ];
  document.getElementById('preferenceGrid').innerHTML = prefs.map(p => `
    <button class="preference-chip" onclick="togglePreference('${p.key}')">
      <div style="font-size: 1.8rem; margin-bottom: 0.5rem;">${p.icon}</div>${p.label}
    </button>`).join('');
}

function calculateAIMatch(cafe) {
  const prefs = Object.entries(userPreferences).filter(([, v]) => v).map(([k]) => k);
  if (prefs.length === 0) return { score: Math.floor((cafe.rating / 5) * 100), reason: 'Based on overall rating' };
  let score = 0;
  const scores = {
    quiet: cafe.quiet_score || 5, wifi: cafe.wifi_score || 5, cozy: cafe.cozy_score || 5,
    social: cafe.social_score || 5, workspace: cafe.workspace_score || 5, artisan: cafe.artisan_score || 5
  };
  prefs.forEach(p => score += scores[p]);
  const norm = Math.round((score / (prefs.length * 10)) * 100);
  const reasons = {
    quiet: 'Perfect for focused work', wifi: 'Reliable internet', cozy: 'Warm atmosphere',
    social: 'Great for meetups', workspace: 'Excellent for productivity', artisan: 'Premium coffee'
  };
  return {
    score: Math.min(100, norm),
    reason: prefs.slice(0, 2).map(p => reasons[p]).join(' • ')
  };
}

function getLocationBasedCafes() {
  document.getElementById('loadingBox').classList.remove('hidden');
  if (!window.google) { alert('Google Maps API not loaded'); return; }
  navigator.geolocation.getCurrentPosition(
    (pos) => fetchCafesFromLocation(pos.coords.latitude, pos.coords.longitude),
    () => { alert('Location access denied'); document.getElementById('loadingBox').classList.add('hidden'); }
  );
}

function fetchCafesFromLocation(lat, lng) {
  const map = new google.maps.Map(document.createElement('div'));
  placesService = new google.maps.places.PlacesService(map);
  placesService.nearbySearch({
    location: new google.maps.LatLng(lat, lng), radius: 2000, type: 'cafe', keyword: 'coffee'
  }, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) enrichCafeData(results);
    else { currentCafes = generateMockCafes(); currentCardIndex = 0; displayNextCard(); }
    document.getElementById('loadingBox').classList.add('hidden');
  });
}

function searchByLocation() {
  const loc = document.getElementById('locationInput').value.trim();
  if (!loc) { alert('Enter a location'); return; }
  document.getElementById('loadingBox').classList.remove('hidden');
  new google.maps.Geocoder().geocode({ address: loc }, (results, status) => {
    if (status === 'OK') {
      const lat = results[0].geometry.location.lat();
      const lng = results[0].geometry.location.lng();
      fetchCafesFromLocation(lat, lng);
    } else { alert('Location not found'); document.getElementById('loadingBox').classList.add('hidden'); }
  });
}

function enrichCafeData(cafes) {
  currentCafes = cafes.map(cafe => {
    const reviews = cafe.reviews || [];
    const sentiment = reviews.length > 0 ? reviews.reduce((a, r) => a + analyzeSentiment(r.text), 0) / reviews.length : 0.5;
    return {
      name: cafe.name, place_id: cafe.place_id, location: cafe.vicinity, rating: cafe.rating || 4.0,
      photo: cafe.photos ? cafe.photos[0].getUrl({ maxWidth: 400 }) : 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%238b5a3c" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" font-size="80" fill="white" text-anchor="middle" dy=".3em"%3E☕%3C/text%3E%3C/svg%3E',
      quiet_score: Math.random() * 10, wifi_score: Math.random() * 10, cozy_score: Math.random() * 10,
      social_score: Math.random() * 10, workspace_score: Math.random() * 10, artisan_score: Math.random() * 10,
      sentiment_score: sentiment, review_count: reviews.length
    };
  });
  currentCardIndex = 0;
  displayNextCard();
}

function getAIRecommendations() {
  document.getElementById('loadingBox').classList.remove('hidden');
  if (!window.google || currentCafes.length === 0) currentCafes = generateMockCafes();
  currentCardIndex = 0;
  displayNextCard();
}

function generateMockCafes() {
  const caffeImg = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%238b5a3c" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" font-size="80" fill="white" text-anchor="middle" dy=".3em"%3E☕%3C/text%3E%3C/svg%3E';
  return [
    { name: 'The Daily Brew', place_id: 'mock_1', location: 'Downtown', rating: 4.5, photo: caffeImg,
      quiet_score: 8, wifi_score: 9, cozy_score: 7, social_score: 6, workspace_score: 9, artisan_score: 8, sentiment_score: 0.8, review_count: 245 },
    { name: 'Cloud Nine Coffee', place_id: 'mock_2', location: 'Midtown', rating: 4.2, photo: caffeImg,
      quiet_score: 4, wifi_score: 8, cozy_score: 9, social_score: 9, workspace_score: 6, artisan_score: 7, sentiment_score: 0.75, review_count: 189 },
    { name: 'The Reading Room', place_id: 'mock_3', location: 'Arts District', rating: 4.7, photo: caffeImg,
      quiet_score: 9, wifi_score: 7, cozy_score: 9, social_score: 3, workspace_score: 8, artisan_score: 9, sentiment_score: 0.85, review_count: 312 },
    { name: 'Social Grounds', place_id: 'mock_4', location: 'Main St', rating: 4.1, photo: caffeImg,
      quiet_score: 2, wifi_score: 8, cozy_score: 6, social_score: 10, workspace_score: 5, artisan_score: 6, sentiment_score: 0.72, review_count: 167 },
    { name: 'Artisan & Co', place_id: 'mock_5', location: 'Pearl District', rating: 4.8, photo: caffeImg,
      quiet_score: 6, wifi_score: 6, cozy_score: 7, social_score: 5, workspace_score: 7, artisan_score: 10, sentiment_score: 0.88, review_count: 298 }
  ];
}

function displayNextCard() {
  const container = document.getElementById('cardContainer');
  if (currentCardIndex >= currentCafes.length) {
    container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">☕</div><p>No more cafes! Try different preferences.</p></div>';
    document.getElementById('loadingBox').classList.add('hidden');
    return;
  }
  const cafe = currentCafes[currentCardIndex];
  const match = calculateAIMatch(cafe);
  const card = document.createElement('div');
  card.className = 'cafe-card';
  card.innerHTML = `
    <div class="card-image-container">
      <img src="${cafe.photo}" alt="${cafe.name}" style="width:100%;height:100%;object-fit:cover;">
      <div class="card-ai-score">${match.score}%</div>
    </div>
    <div class="card-content">
      <h3 class="card-name">${cafe.name}</h3>
      <div class="card-location">📍 ${cafe.location}</div>
      <div class="card-rating">⭐ ${cafe.rating} (${cafe.review_count} reviews)</div>
      <div class="card-why">🤖 ${match.reason}</div>
      <div style="margin:1rem 0;padding:0.8rem;background:#f0f0f0;border-radius:8px;font-size:0.85rem;">
        <strong>Sentiment:</strong> ${(cafe.sentiment_score * 100).toFixed(0)}% positive
      </div>
    </div>`;
  container.innerHTML = '';
  container.appendChild(card);
  new Hammer(card).on('swipeleft', () => swipeLeft()).on('swiperight', () => swipeRight());
  document.getElementById('loadingBox').classList.add('hidden');
}

function swipeRight() {
  saveCafe(currentCafes[currentCardIndex]);
  currentCardIndex++;
  displayNextCard();
}

function swipeLeft() {
  currentCardIndex++;
  displayNextCard();
}

function saveCafe(cafe) {
  let saved = JSON.parse(sessionStorage.getItem('savedCafes') || '[]');
  if (!saved.find(c => c.place_id === cafe.place_id)) {
    saved.push(cafe);
    sessionStorage.setItem('savedCafes', JSON.stringify(saved));
    userStats.visited++;
    userStats.saved++;
    userStats.totalMatchScores.push(calculateAIMatch(cafe).score);
    userStats.avgMatchScore = Math.round(userStats.totalMatchScores.reduce((a, b) => a + b, 0) / userStats.totalMatchScores.length);
    updateUserLevel();
    updateStatsDisplay();
    alert(`✅ ${cafe.name} saved!`);
    if(window.passport) window.passport.awardStamp(cafe);
    updateLeaderboardData();
  }
}

function updateUserLevel() {
  if (userStats.visited >= 20) userStats.level = 'Coffee Master';
  else if (userStats.visited >= 10) userStats.level = 'Local Legend';
  else if (userStats.visited >= 5) userStats.level = 'Adventurer';
  else if (userStats.visited >= 3) userStats.level = 'Explorer';
  else userStats.level = 'Coffee Newbie';
}

function updateStatsDisplay() {
  document.getElementById('totalVisited').textContent = userStats.visited;
  document.getElementById('avgMatchScore').textContent = userStats.avgMatchScore + '%';
  document.getElementById('totalSaved').textContent = userStats.saved;
  document.getElementById('userLevel').textContent = userStats.level;
}

function showSavedCafes() {
  const saved = JSON.parse(sessionStorage.getItem('savedCafes') || '[]');
  const grid = document.getElementById('savedGrid');
  if (saved.length === 0) { 
    grid.innerHTML = '<p style="text-align:center;grid-column:1/-1;">No saved cafes yet ☕</p>'; 
    return; 
  }
  grid.innerHTML = saved.map(cafe => `
    <div class="saved-card">
      <div class="saved-image-wrapper">
        <img src="${cafe.photo}" alt="${cafe.name}" class="saved-image">
        ${uploadedPhotos[cafe.place_id] ? `<div class="photo-badge">📸 ${uploadedPhotos[cafe.place_id].length}</div>` : ''}
      </div>
      <div class="saved-content">
        <h3 class="saved-name">${cafe.name}</h3>
        <p class="saved-location">📍 ${cafe.location}</p>
        <div class="saved-match">⭐ ${cafe.rating}</div>
        <button class="photo-upload-btn" onclick="openPhotoUpload('${cafe.place_id}', '${cafe.name.replace(/'/g, "\\'")}')">📸 Add Photos</button>
        <button class="remove-btn" onclick="removeSavedCafe('${cafe.place_id}')">Remove</button>
      </div>
    </div>`).join('');
}

function openPhotoUpload(cafeId, cafeName) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.multiple = true;
  input.onchange = (e) => {
    const files = Array.from(e.target.files);
    let count = 0;
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (!uploadedPhotos[cafeId]) uploadedPhotos[cafeId] = [];
        uploadedPhotos[cafeId].push({ data: event.target.result, name: file.name, date: new Date().toISOString() });
        count++;
        if (count === files.length) {
          sessionStorage.setItem('uploadedPhotos', JSON.stringify(uploadedPhotos));
          alert(`✅ ${count} photo(s) uploaded!`);
          if(window.passport) window.passport.uploadPhoto(cafeId, files.length);
          showSavedCafes();
        }
      };
      reader.readAsDataURL(file);
    });
  };
  input.click();
}

function removeSavedCafe(placeId) {
  let saved = JSON.parse(sessionStorage.getItem('savedCafes') || '[]');
  saved = saved.filter(c => c.place_id !== placeId);
  sessionStorage.setItem('savedCafes', JSON.stringify(saved));
  userStats.saved--;
  updateStatsDisplay();
  showSavedCafes();
}

function updateLeaderboardData() {
  let lb = JSON.parse(localStorage.getItem('communityLeaderboard') || '[]');
  let entry = lb.find(u => u.userId === userStats.userId);
  if (!entry) {
    lb.push({ userId: userStats.userId, username: userStats.username, visits: userStats.visited, avgMatch: userStats.avgMatchScore, level: userStats.level, lastUpdated: new Date().toISOString() });
  } else {
    entry.visits = userStats.visited;
    entry.avgMatch = userStats.avgMatchScore;
    entry.level = userStats.level;
    entry.lastUpdated = new Date().toISOString();
  }
  localStorage.setItem('communityLeaderboard', JSON.stringify(lb));
}

function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(sectionId).classList.add('active');
  if (sectionId === 'saved') showSavedCafes();
  if (sectionId === 'stats') updateStatsDisplay();
  if (sectionId === 'leaderboard') loadLeaderboard('global');
}

document.addEventListener('DOMContentLoaded', () => {
  generatePreferenceGrid();
  updateStatsDisplay();
  localStorage.setItem('userUsername', userStats.username);
  localStorage.setItem('userId', userStats.userId);
});