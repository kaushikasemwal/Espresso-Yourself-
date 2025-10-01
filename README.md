# ☕️ Espresso Yourself - Coffee Finder App

A modern web application that helps coffee lovers discover and save the best cafes near them, featuring a unique Coffee Passport system to gamify your coffee exploration journey.

## 🌟 Features

### 🔍 **Smart Cafe Discovery**
- **Location-Based Search**: Find cafes near your current location using GPS
- **Manual Location Search**: Search for cafes in any city or area worldwide
- **Enhanced Indian Support**: Special database for Indian cities (Mumbai, Delhi, Bangalore, etc.)

### 📱 **Interactive Experience**
- **Swipe Interface**: Tinder-style card swiping to save or dismiss cafes
- **Touch Gestures**: Intuitive swipe controls with visual feedback
- **Responsive Design**: Seamless experience on desktop and mobile devices
- **Interactive Maps**: Google Maps integration with cafe markers

### ☕ **Coffee Passport System**
- **Digital Passport**: Track your coffee journey with a gamified system
- **Stamp Collection**: Earn stamps for each cafe you visit
- **Badge System**: Unlock achievements based on your exploration
- **Progress Tracking**: Monitor your journey from "Coffee Newbie" to "Coffee Master"

### 💾 **Personal Collection**
- **Save Favorites**: Keep track of cafes you want to visit
- **Local Storage**: All data saved locally in your browser
- **Manage Collection**: View and remove saved cafes

## 🚀 Live Demo

Visit the live app: [https://kaushikasemwal.github.io/Espresso-Yourself-/](https://kaushikasemwal.github.io/Espresso-Yourself-/)

## 📁 Project Structure

```
├── index.html                    # Main application page
├── passport_implementation.html  # Coffee passport interface  
├── script.js                    # Main application logic with 
├── passport.js                  # Coffee passport functionality
├── style.css                    # Main styling with coffee theme
├── passport.css                 # Passport-specific styling
└── README.md                    # Project documentation
```

## 🎮 How to Use

### 1. **Finding Cafes**
- Click **"Find Cafes Near Me"** to use your current location
- Or use the search box to find cafes in specific cities
- Allow location access when prompted for best results

### 2. **Browsing Cafes**
- **Swipe Right** or click **"💾 Save"** to save interesting cafes
- **Swipe Left** or click **"➡️ Skip"** to dismiss cafes
- View cafe details including ratings, photos, and addresses

### 3. **Coffee Passport**
- Click **"☕ Coffee Passport"** to view your progress
- Earn stamps automatically when you save cafes
- Collect badges based on your coffee exploration
- Track your level progression

### 4. **Managing Favorites**
- Click **"Show Saved Cafes"** to view your collection
- Remove cafes you no longer want to visit
- Export or share your favorite spots

## 🏆 Badge System

Earn various badges as you explore:

- **🌱 Coffee Newbie** - Welcome to your coffee journey!
- **🗺️ Coffee Explorer** - Discovered 5+ cafes
- **⛰️ Coffee Adventurer** - Explored 10+ cafes  
- **👑 Local Legend** - Found 25+ cafes
- **🏆 Coffee Master** - Ultimate coffee connoisseur (50+ cafes)

### Special Badges
- **🌅 Early Bird** - Visit cafes in the morning
- **🦉 Night Owl** - Explore evening coffee spots
- **🧭 Neighborhood Navigator** - Discover local gems
- **🏙️ City Connoisseur** - Explore multiple cities
- **⭐ Reviewer** - Rate and review cafes
- **🍂 Seasonal Explorer** - Visit cafes across different seasons

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **APIs**: 
  - Google Maps JavaScript API for mapping
  - Geolocation API for user location
- **Libraries**: Hammer.js for touch gestures
- **Storage**: Browser Local Storage for data persistence
- **Fonts**: Google Fonts (Savate)
- **Icons**: SVG emojis and custom icons

## 🎨 Design Theme

Coffee-inspired color palette:
- **Background**: Warm Cream (#F5F5DC)
- **Primary**: Coffee Brown (#6F4E37) 
- **Secondary**: Cappuccino Foam (#FAEBD7)
- **Accent**: Mocha Chocolate (#8B4513)
- **Text**: Espresso Dark (#3C2415)
- **Gradients**: Purple-blue coffee bean inspired

## 🌍 Supported Locations

### 🇮🇳 **Enhanced Indian Support**
- **Mumbai & Suburbs**: DN Nagar, Andheri, Bandra, Worli, Powai, etc.
- **Major Cities**: Delhi, Bangalore, Chennai, Kolkata, Pune, Hyderabad
- **Tier 2 Cities**: Jaipur, Lucknow, Nagpur, Indore, Ahmedabad
- **20+ cities** with local area support

### 🌏 **Global Coverage**
- Works worldwide with manual search
- Examples: New York, London, Tokyo, Paris, Sydney

## 🔧 Local Development

1. **Clone the repository:**
```bash
git clone https://github.com/kaushikasemwal/Cafe-Finder.git
cd Cafe-Finder
```

2. **Start a local server:**
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

3. **Open in browser:**
```
http://localhost:8000
```

## 📱 Browser Compatibility

- ✅ **Chrome** (recommended)
- ✅ **Firefox** 
- ✅ **Safari**
- ✅ **Edge**
- ✅ **Mobile browsers** (iOS Safari, Chrome Mobile)

## 🔒 Privacy & Security

- **No Backend**: All data stored locally in your browser
- **Privacy First**: No personal data transmitted to external servers
- **Location**: Only used temporarily to find nearby cafes
- **GDPR Compliant**: No cookies or tracking

## 🚧 Future Enhancements

- [ ] **Social Features**: Share favorite cafes with friends
- [ ] **Photo Upload**: Add personal photos to cafe visits
- [ ] **Reviews System**: Rate and review visited cafes
- [ ] **Export Data**: Backup passport and favorites
- [ ] **Offline Mode**: Cache cafe data for offline viewing
- [ ] **Push Notifications**: Remind about nearby saved cafes
- [ ] **Integration**: Connect with popular food apps

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Kaushika Semwal**
- GitHub: [@kaushikasemwal](https://github.com/kaushikasemwal)
- Project Link: [https://github.com/kaushikasemwal/Cafe-Finder](https://github.com/kaushikasemwal/Cafe-Finder)

## 🙏 Acknowledgments

- **Google Maps** for location and mapping services
- **Hammer.js** for smooth touch gesture support
- **Google Fonts** for beautiful typography
- Coffee lovers everywhere for inspiration ☕

---

## 🚀 Quick Start

```bash
# Clone and run
git clone https://github.com/kaushikasemwal/Cafe-Finder.git
cd Cafe-Finder
python -m http.server 8000
# Open http://localhost:8000
```

*Made with ☕ and ❤️ for coffee enthusiasts everywhere*

**Start your coffee journey today! 🌟**