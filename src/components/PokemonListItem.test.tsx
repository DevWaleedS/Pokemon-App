import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import PokemonListItem from './PokemonListItem'

describe('PokemonListItem', () => {
	it('renders link, image, and name based on item', () => {
		const item = { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }
		render(
			<MemoryRouter>
				<PokemonListItem item={item} />
			</MemoryRouter>
		)

		const link = screen.getByTestId('poke-bulbasaur') as HTMLAnchorElement
		expect(link.getAttribute('href')).toBe('/pokemon/1')

		const img = screen.getByRole('img', { name: /bulbasaur/i }) as HTMLImageElement
		expect(img.src).toContain('/sprites/pokemon/1.png')
	})
}) 