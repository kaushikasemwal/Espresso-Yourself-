class CoffeePassport {
  constructor() {
    this.passport = this.loadPassport();
    this.initializePassport();
  }

  loadPassport() {
    const def = {
      passport_id: 'CE' + Date.now().toString().slice(-6),
      total_stamps: 0, total_cafes_visited: 0, current_level: 'Coffee Newbie',
      total_points: 0, stamps: [], badges: [], created_date: new Date().toISOString(), photos_uploaded: 0
    };
    const saved = sessionStorage.getItem('coffeePassport');
    return saved ? JSON.parse(saved) : def;
  }

  savePassport() {
    sessionStorage.setItem('coffeePassport', JSON.stringify(this.passport));
  }

  initializePassport() {
    const pid = document.getElementById('passportId');
    if(pid) pid.textContent = this.passport.passport_id;
    this.renderBadges();
    this.renderStamps();
  }

  awardStamp(cafe) {
    if(this.passport.stamps.find(s => s.cafe_id === cafe.place_id)) return;
    this.passport.stamps.push({
      stamp_id: 'stamp_' + Date.now(),
      cafe_name: cafe.name,
      cafe_id: cafe.place_id,
      stamp_image: cafe.photo || '',
      date_earned: new Date().toISOString(),
      cafe_rating: cafe.rating
    });
    this.passport.total_stamps = this.passport.stamps.length;
    this.passport.total_cafes_visited += 1;
    this.passport.total_points += 10;
    this.awardBadges();
    this.updateLevel();
    this.savePassport();
    this.initializePassport();
  }

  uploadPhoto(cafeId, count) {
    this.passport.photos_uploaded += count;
    this.passport.total_points += (count * 5);
    if (!this.passport.badges.includes("Photographer 📸")) {
      this.passport.badges.push("Photographer 📸");
    }
    this.savePassport();
    this.initializePassport();
  }

  awardBadges() {
    const b = this.passport.badges;
    const total = this.passport.total_cafes_visited;
    if(total >= 1 && !b.includes("Coffee Newbie 🌱")) b.push("Coffee Newbie 🌱");
    if(total >= 3 && !b.includes("Explorer 🗺️")) b.push("Explorer 🗺️");
    if(total >= 5 && !b.includes("Adventurer ⛰️")) b.push("Adventurer ⛰️");
    if(total >= 10 && !b.includes("Local Legend 👑")) b.push("Local Legend 👑");
    if(total >= 20 && !b.includes("Coffee Master 🏆")) b.push("Coffee Master 🏆");
    const hour = new Date().getHours();
    if(hour < 12 && !b.includes("Early Bird 🌅")) b.push("Early Bird 🌅");
    if(hour >= 20 && !b.includes("Night Owl 🦉")) b.push("Night Owl 🦉");
    if(total >= 2 && !b.includes("Neighborhood Navigator 🧭")) b.push("Neighborhood Navigator 🧭");
    if(total >= 5 && !b.includes("City Connoisseur 🏙️")) b.push("City Connoisseur 🏙️");
    if(!b.includes("Reviewer ⭐")) b.push("Reviewer ⭐");
    if(!b.includes("Sharer 📤")) b.push("Sharer 📤");
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
    const container = document.getElementById('stampsGrid');
    if(!container) return;
    container.innerHTML = '';
    for(let i = 0; i < 20; i++) {
      const stamp = document.createElement('div');
      stamp.className = 'stamp';
      if(i < this.passport.total_stamps) {
        stamp.classList.add('earned');
        stamp.innerHTML = `☕`;
      } else {
        stamp.innerHTML = `?`;
      }
      container.appendChild(stamp);
    }
  }

  renderBadges() {
    const container = document.getElementById('badgesGrid');
    if(!container) return;
    container.innerHTML = '';
    const allBadges = [
      "Coffee Newbie 🌱", "Explorer 🗺️", "Adventurer ⛰️", "Local Legend 👑", "Coffee Master 🏆",
      "Early Bird 🌅", "Night Owl 🦉", "Neighborhood Navigator 🧭", "City Connoisseur 🏙️",
      "Reviewer ⭐", "Sharer 📤", "Photographer 📸", "Autumn Lover 🍂", "Winter Warmer ❄️", "Spring Awakening 🌸", "Summer Sipper ☀️"
    ];
    allBadges.forEach(badge => {
      const div = document.createElement('div');
      div.className = 'badge';
      if(this.passport.badges.includes(badge)) div.classList.add('unlocked');
      div.textContent = badge;
      container.appendChild(div);
    });
  }

  exportData() {
    return JSON.stringify({ passport: this.passport, exportDate: new Date().toISOString() }, null, 2);
  }

  getStats() {
    return {
      totalCafes: this.passport.total_cafes_visited,
      totalStamps: this.passport.total_stamps,
      totalBadges: this.passport.badges.length,
      totalPoints: this.passport.total_points,
      photosUploaded: this.passport.photos_uploaded,
      level: this.passport.current_level
    };
  }
}

let passport;
document.addEventListener('DOMContentLoaded', () => {
  passport = new CoffeePassport();
});