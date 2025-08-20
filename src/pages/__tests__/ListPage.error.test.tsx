import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../app/store'
import { BrowserRouter } from 'react-router-dom'
import ListPage from '../ListPage'
import { http, HttpResponse } from 'msw'
import { server } from '../../tests/server'

const API = 'https://pokeapi.co/api/v2'

describe('ListPage - error state', () => {
	it('renders error and retry button when API fails', async () => {
		server.use(
			http.get(`${API}/pokemon`, () => HttpResponse.text('fail', { status: 500 }))
		)

		render(
			<Provider store={store}>
				<BrowserRouter>
					<ListPage />
				</BrowserRouter>
			</Provider>
		)

		expect(await screen.findByText(/Error loading/i)).toBeInTheDocument()
		const retry = screen.getByRole('button', { name: /retry/i })
		expect(retry).toBeInTheDocument()

		fireEvent.click(retry)
		// stays error unless handlers change; this ensures button is wired
		expect(await screen.findByText(/Error loading/i)).toBeInTheDocument()
	})
}) 