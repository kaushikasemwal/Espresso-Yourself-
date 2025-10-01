class CoffeePassport {
  constructor() {
    this.passport = this.loadPassport();
    this.initializePassport();
  }

  loadPassport() {
    const defaultPassport = {
      passport_id: 'CE' + Date.now().toString().slice(-6),
      total_stamps: 0,
      total_cafes_visited: 0,
      current_level: 'Coffee Newbie',
      total_points: 0,
      stamps: [],
      badges: []
    };
    const saved = localStorage.getItem('coffeePassport');
    return saved ? JSON.parse(saved) : defaultPassport;
  }

  savePassport() {
    localStorage.setItem('coffeePassport', JSON.stringify(this.passport));
  }

  initializePassport() {
    document.getElementById('passportNumber').textContent = '#' + this.passport.passport_id;
    document.getElementById('totalStamps').textContent = this.passport.total_stamps;
    document.getElementById('totalCafes').textContent = this.passport.total_cafes_visited;
    document.getElementById('currentLevel').textContent = this.passport.current_level;
    document.getElementById('totalPoints').textContent = this.passport.total_points;

    this.renderStamps();
    this.renderBadges();
  }

  awardStamp(cafe) {
    if(this.passport.stamps.find(s => s.cafe_id === cafe.place_id)) return;

    const stamp = {
      stamp_id: 'stamp_' + Date.now(),
      cafe_name: cafe.name,
      cafe_id: cafe.place_id,
      stamp_image: cafe.photo || ''
    };
    this.passport.stamps.push(stamp);
    this.passport.total_stamps = this.passport.stamps.length;
    this.passport.total_cafes_visited += 1;
    this.passport.total_points += 10;

    this.awardBadges();
    this.updateLevel();
    this.savePassport();
    this.initializePassport();
  }

  awardBadges() {
    const b = this.passport.badges;
    const total = this.passport.total_cafes_visited;

    // Discovery Badges
    if(total >= 1 && !b.includes("Coffee Newbie 🌱")) b.push("Coffee Newbie 🌱");
    if(total >= 3 && !b.includes("Explorer 🗺️")) b.push("Explorer 🗺️");
    if(total >= 5 && !b.includes("Adventurer ⛰️")) b.push("Adventurer ⛰️");
    if(total >= 10 && !b.includes("Local Legend 👑")) b.push("Local Legend 👑");
    if(total >= 20 && !b.includes("Coffee Master 🏆")) b.push("Coffee Master 🏆");

    // Time-Based Badges
    const hour = new Date().getHours();
    if(hour < 12 && !b.includes("Early Bird 🌅")) b.push("Early Bird 🌅");
    if(hour >= 20 && !b.includes("Night Owl 🦉")) b.push("Night Owl 🦉");

    // Regional
    if(total >= 2 && !b.includes("Neighborhood Navigator 🧭")) b.push("Neighborhood Navigator 🧭");
    if(total >= 5 && !b.includes("City Connoisseur 🏙️")) b.push("City Connoisseur 🏙️");

    // Social (for demo, award immediately)
    if(!b.includes("Reviewer ⭐")) b.push("Reviewer ⭐");
    if(!b.includes("Sharer 📤")) b.push("Sharer 📤");

    // Seasonal (demo only, can tie to date)
    if(!b.includes("Autumn Lover 🍂")) b.push("Autumn Lover 🍂");
    if(!b.includes("Winter Warmer ❄️")) b.push("Winter Warmer ❄️");
    if(!b.includes("Spring Awakening 🌸")) b.push("Spring Awakening 🌸");
    if(!b.includes("Summer Sipper ☀️")) b.push("Summer Sipper ☀️");
  }

  updateLevel() {
    const total = this.passport.total_cafes_visited;
    if(total >= 20) this.passport.current_level = "Coffee Master";
    else if(total >= 10) this.passport.current_level = "Local Legend";
    else if(total >= 5) this.passport.current_level = "Adventurer";
    else if(total >= 3) this.passport.current_level = "Explorer";
    else this.passport.current_level = "Coffee Newbie";
  }

  renderStamps() {
    const container = document.getElementById('stampsList');
    if(!container) return;
    container.innerHTML = '';
    if(this.passport.stamps.length === 0) container.innerHTML = '<p>No stamps yet ☕</p>';
    else this.passport.stamps.forEach(s => {
      const div = document.createElement('div');
      div.textContent = s.cafe_name;
      container.appendChild(div);
    });
  }

  renderBadges() {
    const container = document.getElementById('badgesList');
    if(!container) return;
    container.innerHTML = '';
    if(this.passport.badges.length === 0) container.innerHTML = '<p>No badges yet 🎖️</p>';
    else this.passport.badges.forEach(b => {
      const div = document.createElement('div');
      div.textContent = b;
      container.appendChild(div);
    });
  }
}
