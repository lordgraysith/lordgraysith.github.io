const App = (function () {
  const letters = document.getElementById('letters')
  const suggestions = document.getElementById('suggestions')
  const file = document.getElementById('file')
  const min = document.getElementById('min')
  const max = document.getElementById('max')
  let words

  letters.addEventListener('keyup', debounce(letterChange))
  min.addEventListener('keyup', debouce(letterChange)) 
  max.addEventListener('keyup', debouce(letterChange)) 
  file.addEventListener('change', fileChange)
  file.addEventListener('change', letterChange)
  fileChange()

  function debounce (fn) {
    let timeout
    return () => {
      clearTimeout(timeout)
      timeout = setTimeout(fn, 1000)
    }
  }

  function letterChange () {
    suggestions.innerHTML = ''
    const lettersInput = letters.value.toLowerCase().split('')
    const toSuggest = words.reduce((acc, word) => {
      if (
        word.length < parseInt(min.value) ||
        word.length > parseInt(max.value)
      ) {
        return acc
      }
      const isNotValid = lettersInput.reduce((remaining, letter) => {
        return remaining.replace(letter, '')
      }, word.toLowerCase())
      if (!isNotValid) {
        return acc.concat([word.toLowerCase()])
      }
      return acc
    }, [])
    suggestions.innerHTML = toSuggest.join('<br/>')
  }

  function fileChange () {
    const fileName = file.value
    fetch(`/cheater/${fileName}`).then(res =>
      res.text().then(txt => {
        words = txt.split('\n').filter(word => word.match(/^[A-Za-z]{2,}$/))
      })
    )
  }

  return {
    getWords () {
      return words
    },
    letters,
    min,
    max
  }
})()
