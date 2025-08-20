import { getIdFromUrl, imgFromId } from './utils'

describe('utils', () => {
	it('getIdFromUrl extracts the trailing numeric segment', () => {
		expect(getIdFromUrl('https://pokeapi.co/api/v2/pokemon/25/')).toBe(25)
		expect(getIdFromUrl('/pokemon/133')).toBe(133)
		expect(getIdFromUrl('pokemon/7/')).toBe(7)
	})

	it('imgFromId returns the correct sprite URL', () => {
		expect(imgFromId(7)).toBe(
			'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png'
		)
	})
}) 