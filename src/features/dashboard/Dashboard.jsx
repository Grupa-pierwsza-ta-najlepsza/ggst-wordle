import { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { loadStats } from '../../shared/utils/localStorage'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function Dashboard({ onBack }) {
  const [stats, setStats] = useState({})

  useEffect(() => {
    setStats(loadStats())
  }, [])

  const totalWins = (stats.classicWins || 0) + (stats.silhouetteWins || 0)
  const totalPlayed = (stats.classicPlayed || 0) + (stats.silhouettePlayed || 0)
  const winRate = totalPlayed > 0 ? ((totalWins / totalPlayed) * 100).toFixed(1) : 0

  const chartData = {
    labels: ['Classic Mode', 'Silhouette Mode'],
    datasets: [
      {
        label: 'Wins',
        data: [stats.classicWins || 0, stats.silhouetteWins || 0],
        backgroundColor: '#27ae60'
      },
      {
        label: 'Losses',
        data: [
          (stats.classicPlayed || 0) - (stats.classicWins || 0),
          (stats.silhouettePlayed || 0) - (stats.silhouetteWins || 0)
        ],
        backgroundColor: '#e74c3c'
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: '#eee' }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: '#eee' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      },
      x: {
        ticks: { color: '#eee' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      }
    }
  }

  return (
    <div className="game-card p-6">
      <div className="flex justify-between items-center mb-6">
        <button onClick={onBack} className="text-gray-400 hover:text-white">
          ← Back
        </button>
        <h2 className="text-2xl font-bold">Your Stats</h2>
        <div></div>
      </div>

      {/* Overall Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <div className="text-4xl font-bold text-green-400">{totalWins}</div>
          <div className="text-gray-400 mt-2">Games Won</div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <div className="text-4xl font-bold text-blue-400">{totalPlayed}</div>
          <div className="text-gray-400 mt-2">Games Played</div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <div className="text-4xl font-bold text-yellow-400">{winRate}%</div>
          <div className="text-gray-400 mt-2">Win Rate</div>
        </div>
      </div>

      {/* Mode Stats */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Classic Mode</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Wins:</span>
              <span>{stats.classicWins || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Played:</span>
              <span>{stats.classicPlayed || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Win Rate:</span>
              <span>
                {stats.classicPlayed > 0
                  ? ((stats.classicWins / stats.classicPlayed) * 100).toFixed(1)
                  : 0}%
              </span>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Silhouette Mode</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Wins:</span>
              <span>{stats.silhouetteWins || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Played:</span>
              <span>{stats.silhouettePlayed || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Win Rate:</span>
              <span>
                {stats.silhouettePlayed > 0
                  ? ((stats.silhouetteWins / stats.silhouettePlayed) * 100).toFixed(1)
                  : 0}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Win Rate Comparison</h3>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  )
}

export default Dashboard
