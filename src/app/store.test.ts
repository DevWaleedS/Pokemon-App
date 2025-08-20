import { store } from './store'
import { pokeApi } from '../features/pokeApi'

describe('store', () => {
	it('includes pokeApi slice in state', () => {
		const state = store.getState()
		expect(state[pokeApi.reducerPath]).toBeDefined()
	})

	it('can dispatch actions without errors', () => {
		expect(() => store.dispatch({ type: 'TEST/NOOP' })).not.toThrow()
	})
}) 