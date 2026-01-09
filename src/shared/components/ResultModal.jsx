function ResultModal({ isWin, answer, tries, onBackToMenu }) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="game-card p-8 max-w-md w-full mx-4">
          <h3 className={`text-2xl font-bold mb-4 text-center ${isWin ? 'text-ggst-correct' : 'text-ggst-red'}`}>
            {isWin ? '🎉 You Win!' : '❌ Game Over'}
          </h3>
          <p className="text-center mb-6">
            {isWin 
              ? `You guessed ${answer} in ${tries} tries!`
              : `The answer was ${answer}. Better luck next time!`
            }
          </p>
          <button onClick={onBackToMenu} className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition">
            Back to Menu
          </button>
        </div>
      </div>
    )
  }
  
  export default ResultModal
  