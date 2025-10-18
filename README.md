# Espresso Yourself - AI-Powered Cafe Finder

An advanced web application for discovering and saving cafes with AI recommendations, photo uploads, sentiment analysis, and community leaderboards.

## 🌐 Live Demo

**Try it now:** [https://kaushikasemwal.github.io/Espresso-Yourself-/](https://kaushikasemwal.github.io/Espresso-Yourself-/)

## Features

### AI Matching System
- Smart algorithm calculating 0-100% personalized match scores
- Sentiment analysis of customer reviews using NLP
- Real-time Google Places API integration
- 6 preference categories: Quiet, WiFi, Cozy, Social, Workspace, Artisan

### Photo Upload System (NEW)
- Upload multiple photos per cafe visit
- Photo count display on saved cafes
- Base64 storage in sessionStorage
- 5 points per photo uploaded
- "Photographer" badge unlock

### Community Leaderboard (NEW)
- Global Rankings: All-time top visitors
- Weekly Rankings: Last 7 days activity
- Best Reviewers: Highest AI match scores
- Gold/Silver/Bronze medals for top 3
- Real-time automatic updates

### Coffee Passport System
- Digital passport with unique ID
- Stamp collection for each cafe
- 16+ achievement badges
- Progress tracking to "Coffee Master"
- Data export as JSON
- Social sharing support

### Additional Features
- Tinder-style swipe interface with Hammer.js gestures
- Mobile responsive design
- Swipe-based cafe discovery
- Save and manage collections
- Statistics tracking
- Mock data fallback for offline testing

## Setup Instructions

### 1. Get Google Maps API Key
- Visit [Google Cloud Console](https://console.cloud.google.com/)
- Create new project
- Enable: Maps JavaScript API, Places API, Geocoding API
- Create API Key in Credentials
- Copy your key

### 2. Update API Key
In index.html, replace:
```html
<script async src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places"></script>
```

### 3. Run Local Server
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server -p 8000

# PHP
php -S localhost:8000
```

### 4. Open Browser
Navigate to: `http://localhost:8000`

## How to Use

1. **Set Preferences**: Select cafe attributes (Quiet, WiFi, Cozy, Social, Workspace, Artisan)
2. **Find Cafes**: Use current location or search by city
3. **Swipe**: Right to save, Left to skip
4. **Upload Photos**: Add photos to saved cafes (📸 Add Photos button)
5. **Check Leaderboard**: View community rankings
6. **View Passport**: Track achievements and progress

## Badge System

| Badge | Icon | Requirement |
|-------|------|-------------|
| Coffee Newbie | 🌱 | Visit 1 cafe |
| Explorer | 🗺️ | Visit 3 cafes |
| Adventurer | ⛰️ | Visit 5 cafes |
| Local Legend | 👑 | Visit 10 cafes |
| Coffee Master | 🏆 | Visit 20 cafes |
| Photographer | 📸 | Upload photos |
| Early Bird | 🌅 | Visit before noon |
| Night Owl | 🦉 | Visit after 8 PM |
| City Connoisseur | 🏙️ | Visit 5+ cafes |
| Reviewer | ⭐ | Review cafes |
| Sharer | 📤 | Share passport |
| Seasonal Badges | 🍂❄️🌸☀️ | Various |

## Data Storage

- **sessionStorage**: Saved cafes, photos, current session
- **localStorage**: Passport, leaderboard, user ID
- **No external servers**: All data stored locally
- **Privacy first**: No tracking or personal data collection

## File Structure

```
espresso-yourself/
├── index.html                      # Main app
├── script.js                       # AI logic & photo uploads
├── leaderboard.js                  # Rankings system
├── passport.js                     # Badges & stamps
├── passport_implementation.html    # Passport page
├── style.css                       # Complete styling
└── README.md                       # This file
```

## Browser Support

- Chrome (Recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS/Android)

## Troubleshooting

**Google Maps API not loading**
- Verify API key is correct
- Check APIs enabled in Google Cloud
- Review CORS settings

**Photos not saving**
- Check sessionStorage is enabled
- Not in private/incognito mode
- Browser storage quota available

**Leaderboard not updating**
- Check localStorage enabled
- Refresh page to sync
- Try incognito window

## Technologies Used

- HTML5, CSS3, JavaScript ES6+
- Google Maps JavaScript API
- Hammer.js for gestures
- No backend required
- All local storage

## Future Enhancements

- Backend cloud storage
- Photo gallery view
- Social networking features
- Opening hours filtering
- Route optimization
- Mobile app version
- Offline support
- AR cafe previews

## Privacy & Security

- No backend server
- No personal data collected
- No cookies or tracking
- Local browser storage only
- GDPR compliant
- Anonymous leaderboard participation

## License

MIT License - Free for personal and commercial use

## Credits

Made with coffee and passion for coffee enthusiasts everywhere.

---

**Start discovering amazing cafes today!**

Visit the live demo: [https://kaushikasemwal.github.io/Espresso-Yourself-/](https://kaushikasemwal.github.io/Espresso-Yourself-/)