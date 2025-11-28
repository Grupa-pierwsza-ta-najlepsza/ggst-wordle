function ModeSelector({ onSelectMode }) {
    return (
      <div className="game-card p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Select Game Mode</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <button
            onClick={() => onSelectMode('classic')}
            className="mode-btn p-6 border-4 border-ggst-red rounded-lg hover:bg-ggst-red transition-all"
          >
            <div className="text-4xl mb-2">🎮</div>
            <div className="text-xl font-bold">Classic Mode</div>
            <div className="text-sm text-gray-400 mt-2">Guess by attributes</div>
          </button>
          <button
            onClick={() => onSelectMode('silhouette')}
            className="mode-btn p-6 border-4 border-ggst-red rounded-lg hover:bg-ggst-red transition-all"
          >
            <div className="text-4xl mb-2">🖤</div>
            <div className="text-xl font-bold">Silhouette Mode</div>
            <div className="text-sm text-gray-400 mt-2">Guess by image</div>
          </button>
          <button
            onClick={() => onSelectMode('dashboard')}
            className="mode-btn p-6 border-4 border-ggst-red rounded-lg hover:bg-ggst-red transition-all"
          >
            <div className="text-4xl mb-2">📊</div>
            <div className="text-xl font-bold">Dashboard</div>
            <div className="text-sm text-gray-400 mt-2">View your stats</div>
          </button>
        </div>
      </div>
    )
  }
  
  export default ModeSelector
  