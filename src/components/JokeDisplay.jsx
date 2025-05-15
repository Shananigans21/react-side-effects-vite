function JokeDisplay({ joke, loading }) {
  return (
    <p aria-live="polite">
      {loading ? 'Loading joke...' : joke}
    </p>
  )
}

export default JokeDisplay
