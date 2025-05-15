import { useState, useEffect } from 'react'
import JokeDisplay from './components/JokeDisplay'
import FetchButton from './components/FetchButton'

function App() {
  const [joke, setJoke] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchJoke = () => {
    setLoading(true)
    fetch('https://v2.jokeapi.dev/joke/Programming?type=single')
      .then((response) => response.json())
      .then((data) => {
        setJoke(data.joke)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching joke:', error)
        setJoke('Failed to load a joke. Please try again.')
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchJoke()
  }, [])

  return (
    <div className="app">
      <h1>Programming Jokes</h1>
      <JokeDisplay joke={joke} loading={loading} />
      <FetchButton onClick={fetchJoke} />
    </div>
  )
}

export default App
