import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../app/store'
import { BrowserRouter } from 'react-router-dom'
import ListPage from '../ListPage'

function setup() {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <ListPage />
      </BrowserRouter>
    </Provider>
  )
}

test('renders list and items', async () => {
  setup()
  expect(screen.getByText(/PokeReact/i)).toBeInTheDocument()
  await waitFor(() => {
    expect(screen.getAllByRole('link').length).toBeGreaterThan(1)
  })
})
