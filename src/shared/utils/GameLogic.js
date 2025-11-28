export function compareAttributes(guess, answer) {
    const result = {}
  
    // Weight comparison (numeric with partial match)
    if (guess.weight === answer.weight) {
      result.weight = 'correct'
    } else if (Math.abs(guess.weight - answer.weight) === 1) {
      result.weight = 'partial'
    } else {
      result.weight = 'incorrect'
    }
  
    // Exact match attributes
    result.playstyle = guess.playstyle === answer.playstyle ? 'correct' : 'incorrect'
    result.species = guess.species === answer.species ? 'correct' : 'incorrect'
    result.release = guess.release === answer.release ? 'correct' : 'incorrect'
    result.difficulty = guess.difficulty === answer.difficulty ? 'correct' : 'incorrect'
    result.gender = guess.gender === answer.gender ? 'correct' : 'incorrect'
  
    // Colors comparison (array overlap)
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
  
  export function getDailyCharacter(characters) {
    // Use today's date as seed for consistent daily character
    const today = new Date()
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24)
    const index = dayOfYear % characters.length
    return characters[index]
  }
  