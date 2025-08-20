import { getPokemonDetails } from './pokeApi'

describe('pokeApi helpers', () => {
	it('getPokemonDetails returns details for numeric name strings', async () => {
		const details = await getPokemonDetails('6')
		expect(details).toMatchObject({ id: 6, name: 'charizard' })
	})

	it('getPokemonDetails works for other ids', async () => {
		const details = await getPokemonDetails('7')
		expect(details).toMatchObject({ id: 7, name: 'poke-7' })
	})
}) 