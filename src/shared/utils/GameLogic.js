export function compareAttributes(guess, answer) {
    const result = {}
  
    
    // skalowanie hp rosnące
const healthScaleOrder = ["0.75-0.92", "0.93-1.0", "1.01-1.5"]

const guessIndex = healthScaleOrder.indexOf(guess.healthScale)
const answerIndex = healthScaleOrder.indexOf(answer.healthScale)

if (guessIndex === -1 || answerIndex === -1) {
  // nieznane -> nieprawidlowe
  result.healthScale = 'incorrect'
} else if (guessIndex === answerIndex) {
  result.healthScale = 'correct'
} else if (Math.abs(guessIndex - answerIndex) === 1) {
  result.healthScale = 'partial'
} else {
  result.healthScale = 'incorrect'
}

  
    
    result.playstyle = guess.playstyle === answer.playstyle ? 'correct' : 'incorrect'
    result.species = guess.species === answer.species ? 'correct' : 'incorrect'
    result.release = guess.release === answer.release ? 'correct' : 'incorrect'
    result.difficulty = guess.difficulty === answer.difficulty ? 'correct' : 'incorrect'
    result.gender = guess.gender === answer.gender ? 'correct' : 'incorrect'
  
    // porwnywanie kolorów
    const colorOverlap = guess.colors.filter(c => answer.colors.includes(c))
    if (colorOverlap.length === answer.colors.length && guess.colors.length === answer.colors.length) {
      result.colors = 'correct'
    } else if (colorOverlap.length > 0) {
      result.colors = 'partial'
    } else {
      result.colors = 'incorrect'
    }
  
    return result
  }
  


  //tymczasowa funkcja na testowanie
  /*
  function rollRandom() {
    let number = Math.floor(Math.random() * 32)
    while (number === 18) {
      number = Math.floor(Math.random() * 32)
    }
    return number
  }
    */
  
  const result = getDailyCharacter()
  export function getDailyCharacter(characters) {
    // Wykorzystanie daty do wylosowania postaci
    const today = new Date()
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24)
    const index = dayOfYear % characters.length // rollRandom()
    return characters[index]
  }
  