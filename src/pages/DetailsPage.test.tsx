import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../app/store'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import DetailsPage from './DetailsPage'
import { http, HttpResponse } from 'msw'
import { server } from '../tests/server'

const API = 'https://pokeapi.co/api/v2'

function renderAt(path: string) {
	return render(
		<Provider store={store}>
			<MemoryRouter initialEntries={[path]}>
				<Routes>
					<Route path='/pokemon/:id' element={<DetailsPage />} />
				</Routes>
			</MemoryRouter>
		</Provider>
	)
}

describe('DetailsPage', () => {
	it('renders pokemon details from API', async () => {
		renderAt('/pokemon/6')

		// title waits for data to load
		await waitFor(() => expect(screen.getByTestId('detail-title')).toHaveTextContent('charizard'))

		// table rows
		const table = await screen.findByTestId('detail-table')
		expect(table).toBeInTheDocument()

		const heightCell = screen.getByText('Height').parentElement?.nextElementSibling as HTMLElement
		expect(heightCell).toHaveTextContent('170 cm')

		const weightCell = screen.getByText('Weight').parentElement?.nextElementSibling as HTMLElement
		expect(weightCell).toHaveTextContent('90.5 kg')

		const typesCell = screen.getByText('Types').parentElement?.nextElementSibling as HTMLElement
		expect(typesCell).toHaveTextContent('fire')
		expect(typesCell).toHaveTextContent('flying')
	})

	it('shows error and supports retry', async () => {
		server.use(
			http.get(`${API}/pokemon/:id`, () => HttpResponse.text('fail', { status: 500 }))
		)

		renderAt('/pokemon/1')

		expect(await screen.findByText(/Failed to load/i)).toBeInTheDocument()

		// switch to success then retry
		server.use(
			http.get(`${API}/pokemon/:id`, ({ params }) => {
				const id = Number(params.id)
				return HttpResponse.json({
					id,
					name: `poke-${id}`,
					height: 100,
					weight: 500,
					types: [
						{ slot: 1, type: { name: 'grass', url: `${API}/type/12/` } },
					],
					sprites: { front_default: null, other: { ['official-artwork']: { front_default: 'https://example.com/img.png' } } },
				})
			})
		)

		fireEvent.click(screen.getByRole('button', { name: /retry/i }))

		await waitFor(() => {
			expect(screen.getByTestId('detail-title')).toHaveTextContent('poke-1')
		})
	})
}) 