import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { vi } from 'vitest' // Use vi instead of jest
import App from '../App'

beforeEach(() => {
  // Mock fetch to return a test joke
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({ joke: 'Why do programmers prefer dark mode?' }),
    })
  )
})

afterEach(() => {
  vi.restoreAllMocks()
})

test('App component > displays a loading message before joke is loaded', async () => {
  render(<App />)

  // Ensure "Loading..." appears first
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument()

  // Wait for the joke to replace "Loading..."
  await waitFor(() => {
    expect(
      screen.getByText(/Why do programmers prefer dark mode?/i)
    ).toBeInTheDocument()
  })
})

test('App component > fetches and displays a joke on load', async () => {
  render(<App />)

  // Ensure the joke appears after fetching
  await waitFor(() => {
    expect(
      screen.getByText(/Why do programmers prefer dark mode?/i)
    ).toBeInTheDocument()
  })
})

test('App component > fetches a new joke when button is clicked', async () => {
  render(<App />)

  // Wait for initial joke to appear
  await waitFor(() => {
    expect(
      screen.getByText(/Why do programmers prefer dark mode?/i)
    ).toBeInTheDocument()
  })

  // Mock fetch for new joke
  global.fetch.mockResolvedValueOnce({
    json: () => Promise.resolve({ joke: 'Another programming joke!' }),
  })

  // Click the "Get a New Joke" button
  fireEvent.click(screen.getByText(/Fetch New Joke/i))

  // Wait for the new joke to appear
  await waitFor(() => {
    expect(screen.getByText(/Another programming joke!/i)).toBeInTheDocument()
  })
})
