function switchLeaderboardTab(tab) {
  document.querySelectorAll('.leaderboard-tab-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  loadLeaderboard(tab);
}

function loadLeaderboard(type) {
  let lb = JSON.parse(localStorage.getItem('communityLeaderboard') || '[]');
  const content = document.getElementById('leaderboardContent');
  
  if (lb.length === 0) {
    lb = generateMockLeaderboardData();
    localStorage.setItem('communityLeaderboard', JSON.stringify(lb));
  }
  
  let sorted = [...lb];
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  
  switch(type) {
    case 'global': sorted.sort((a, b) => b.visits - a.visits); break;
    case 'weekly':
      sorted = sorted.filter(u => new Date(u.lastUpdated) > weekAgo);
      sorted.sort((a, b) => b.visits - a.visits);
      break;
    case 'sentiment': sorted.sort((a, b) => b.avgMatch - a.avgMatch); break;
  }

  if (sorted.length === 0) {
    content.innerHTML = '<div class="empty-leaderboard">No data available for this view.</div>';
    return;
  }

  content.innerHTML = `
    <div class="leaderboard-table">
      <div class="leaderboard-header">
        <div class="leaderboard-rank">Rank</div>
        <div class="leaderboard-player">Player</div>
        <div class="leaderboard-stat">${type === 'sentiment' ? 'Avg Match' : 'Cafes'}</div>
        <div class="leaderboard-level">Level</div>
      </div>
      ${sorted.map((u, i) => `
        <div class="leaderboard-row ${i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : ''}">
          <div class="leaderboard-rank">${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '#' + (i + 1)}</div>
          <div class="leaderboard-player">
            <div class="player-name">${u.username}</div>
            <div class="player-id">ID: ${u.userId.substr(0, 12)}...</div>
          </div>
          <div class="leaderboard-stat">${type === 'sentiment' ? u.avgMatch + '%' : u.visits}</div>
          <div class="leaderboard-level"><span class="level-badge">${u.level}</span></div>
        </div>`).join('')}
    </div>`;
}

function generateMockLeaderboardData() {
  return [
    { userId: 'user_1001', username: 'CoffeeAddict', visits: 45, avgMatch: 87, level: 'Coffee Master', lastUpdated: new Date().toISOString() },
    { userId: 'user_1002', username: 'LocalExplorer', visits: 38, avgMatch: 82, level: 'Local Legend', lastUpdated: new Date().toISOString() },
    { userId: 'user_1003', username: 'CoffeeLover', visits: 28, avgMatch: 79, level: 'Adventurer', lastUpdated: new Date().toISOString() },
    { userId: 'user_1004', username: 'BeansHunter', visits: 22, avgMatch: 85, level: 'Adventurer', lastUpdated: new Date().toISOString() },
    { userId: 'user_1005', username: 'ArtisanFan', visits: 18, avgMatch: 88, level: 'Explorer', lastUpdated: new Date().toISOString() }
  ];
}

document.addEventListener('DOMContentLoaded', () => {
  let lb = JSON.parse(localStorage.getItem('communityLeaderboard') || '[]');
  if (lb.length === 0) {
    localStorage.setItem('communityLeaderboard', JSON.stringify(generateMockLeaderboardData()));
  }
});