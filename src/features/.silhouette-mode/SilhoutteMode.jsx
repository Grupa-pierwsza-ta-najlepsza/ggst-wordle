import { useState } from 'react'
import { characters } from '../../shared/data/characters'
import { getDailyCharacter } from '../../shared/utils/gameLogic'
import { saveGameResult } from '../../shared/utils/localStorage'
import ResultModal from '../../shared/components/ResultModal'

function SilhouetteMode({ onBack }) {
  const [answer] = useState(() => getDailyCharacter(characters))
  const [guesses, setGuesses] = useState([])
  const [input, setInput] = useState('')
  const [revealLevel, setRevealLevel] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [isWin, setIsWin] = useState(false)
  const maxTries = 5

  const revealLevels = [
    { brightness: 0, blur: 10 },
    { brightness: 0.2, blur: 8 },
    { brightness: 0.4, blur: 5 },
    { brightness: 0.6, blur: 3 },
    { brightness: 0.8, blur: 1 }
  ]

  const currentReveal = revealLevels[revealLevel] || revealLevels

  const handleSubmit = () => {
    if (gameOver || !input.trim()) return

    const guessChar = characters.find(
      c => c.name.toLowerCase() === input.trim().toLowerCase()
    )

    if (!guessChar) {
      alert('Please select a valid character from the list')
      return
    }

    setGuesses([...guesses, guessChar.name])
    setInput('')

    if (guessChar.name === answer.name) {
      setIsWin(true)
      setGameOver(true)
      saveGameResult('silhouette', true)
    } else if (guesses.length + 1 >= maxTries) {
      setIsWin(false)
      setGameOver(true)
      saveGameResult('silhouette', false)
    } else {
      setRevealLevel(prev => Math.min(prev + 1, revealLevels.length - 1))
    }
  }

  const handleReset = () => {
    setGuesses([])
    setInput('')
    setRevealLevel(0)
    setGameOver(false)
    setIsWin(false)
  }

  return (
    <div className="game-card p-6">
      <div className="flex justify-between items-center mb-6">
        <button onClick={onBack} className="text-gray-400 hover:text-white">
          ← Back
        </button>
        <h2 className="text-2xl font-bold">Silhouette Mode</h2>
        <div className="text-gray-400">Tries: {guesses.length}/{maxTries}</div>
      </div>

      {/* Silhouette Image */}
      <div className="flex justify-center mb-6">
        <img
          src={answer.imageUrl}
          alt="Character Silhouette"
          className="w-full max-w-md h-96 object-contain transition-all duration-500"
          style={{
            filter: gameOver 
              ? 'brightness(1) blur(0)' 
              : `brightness(${currentReveal.brightness}) blur(${currentReveal.blur}px)`
          }}
        />
      </div>

      {/* Input Section */}
      <div className="mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          className="w-full p-3 bg-gray-800 border-2 border-gray-600 rounded-lg text-white focus:border-ggst-red focus:outline-none"
          placeholder="Guess the character..."
          list="characterList"
          disabled={gameOver}
        />
        <datalist id="characterList">
          {characters.map(char => (
            <option key={char.name} value={char.name} />
          ))}
        </datalist>
        <button
          onClick={handleSubmit}
          disabled={gameOver}
          className="w-full mt-4 bg-ggst-red hover:bg-red-600 disabled:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition"
        >
          Submit Guess
        </button>
      </div>

      {/* Previous Guesses */}
      <div className="space-y-2">
        {guesses.map((guess, idx) => (
          <div key={idx} className="text-center text-gray-400">
            {idx + 1}. {guess}
          </div>
        ))}
      </div>

      {/* Result Modal */}
      {gameOver && (
        <ResultModal
          isWin={isWin}
          answer={answer.name}
          tries={guesses.length}
          onPlayAgain={handleReset}
          onBackToMenu={onBack}
        />
      )}
    </div>
  )
}

export default SilhouetteMode
