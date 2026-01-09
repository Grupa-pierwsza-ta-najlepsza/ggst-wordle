import { useState, useEffect } from 'react'
import { characters } from '../../shared/data/characters'
import { compareAttributes, getDailyCharacter } from '../../shared/utils/gameLogic'
import { saveGameResult } from '../../shared/utils/localStorage'
import ResultModal from '../../shared/components/ResultModal'

function ClassicMode({ onBack }) {
  const [answer] = useState(() => getDailyCharacter(characters))
  const [guesses, setGuesses] = useState([])
  const [input, setInput] = useState('')
  const [gameOver, setGameOver] = useState(false)
  const [isWin, setIsWin] = useState(false)
  const maxTries = 6

  const handleSubmit = () => {
    if (gameOver || !input.trim()) return

    const guessChar = characters.find(
      c => c.name.toLowerCase() === input.trim().toLowerCase()
    )

    if (!guessChar) {
      alert('Please select a valid character from the list')
      return
    }

    if (guesses.find(g => g.character.name === guessChar.name)) {
      alert('You already guessed this character!')
      return
    }

    const comparison = compareAttributes(guessChar, answer)
    setGuesses([{ character: guessChar, comparison }, ...guesses])
    setInput('')

    // Check win/loss
    if (guessChar.name === answer.name) {
      setIsWin(true)
      setGameOver(true)
      saveGameResult('classic', true)
    } else if (guesses.length + 1 >= maxTries) {
      setIsWin(false)
      setGameOver(true)
      saveGameResult('classic', false)
    }
  }

  const handleReset = () => {
    setGuesses([])
    setInput('')
    setGameOver(false)
    setIsWin(false)
  }

  return (
    <div className="game-card p-6">
      <div className="flex justify-between items-center mb-6">
        <button onClick={onBack} className="text-gray-400 hover:text-white">
          ← Back
        </button>
        <h2 className="text-2xl font-bold">Classic Mode</h2>
        <div className="text-gray-400">Tries: {guesses.length}/{maxTries}</div>
      </div>

      {/* Input Section */}
      <div className="mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          className="w-full p-3 bg-gray-800 border-2 border-gray-600 rounded-lg text-white focus:border-ggst-red focus:outline-none"
          placeholder="Type character name..."
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

      {/* Guess History */}
      <div className="space-y-4">
        {guesses.map((guess, idx) => (
          <div key={idx} className="bg-gray-800 p-4 rounded-lg">
            <div className="font-bold mb-2">{guess.character.name}</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div className={`attribute-box ${guess.comparison.healthScale}`}>
              Health Scale: {guess.character.healthScale}
              </div>
              <div className={`attribute-box ${guess.comparison.playstyle}`}>
                {guess.character.playstyle}
              </div>
              <div className={`attribute-box ${guess.comparison.species}`}>
                {guess.character.species}
              </div>
              <div className={`attribute-box ${guess.comparison.release}`}>
                {guess.character.release}
              </div>
              <div className={`attribute-box ${guess.comparison.difficulty}`}>
                Diff: {guess.character.difficulty}
              </div>
              <div className={`attribute-box ${guess.comparison.gender}`}>
                {guess.character.gender}
              </div>
              <div className={`attribute-box ${guess.comparison.colors} md:col-span-2`}>
                {guess.character.colors.join(', ')}
              </div>
            </div>
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

export default ClassicMode
