const STATS_KEY = 'strivedle_stats'

export function loadStats() {
  const stats = localStorage.getItem(STATS_KEY)
  return stats ? JSON.parse(stats) : {
    classicWins: 0,
    classicPlayed: 0,
    silhouetteWins: 0,
    silhouettePlayed: 0
  }
}

export function saveGameResult(mode, won) {
  const stats = loadStats()
  
  if (mode === 'classic') {
    stats.classicPlayed++
    if (won) stats.classicWins++
  } else if (mode === 'silhouette') {
    stats.silhouettePlayed++
    if (won) stats.silhouetteWins++
  }
  
  localStorage.setItem(STATS_KEY, JSON.stringify(stats))
}
