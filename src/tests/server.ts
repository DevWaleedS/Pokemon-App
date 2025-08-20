import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

const API = (typeof process !== 'undefined' && process.env?.VITE_API_BASE_URL) || 'https://pokeapi.co/api/v2'

export const handlers = [
  http.get(`${API}/pokemon`, ({ request }) => {
    const url = new URL(request.url)
    const limit = Number(url.searchParams.get('limit') ?? '30')
    const results = Array.from({ length: limit }).map((_, i) => ({
      name: `poke-${i+1}`,
      url: `${API}/pokemon/${i+1}/`
    }))
    return HttpResponse.json({ count: 30, next: null, previous: null, results })
  }),
  http.get(`${API}/pokemon/:id`, ({ params }) => {
    const id = Number(params.id)
    return HttpResponse.json({
      id,
      name: id === 6 ? 'charizard' : `poke-${id}`,
      height: 170,
      weight: 905,
      types: [
        { slot: 1, type: { name: 'fire', url: `${API}/type/10/` } },
        { slot: 2, type: { name: 'flying', url: `${API}/type/3/` } }
      ],
      sprites: { front_default: null, other: { ['official-artwork']: { front_default: 'https://example.com/img.png' } } }
    })
  })
]

export const server = setupServer(...handlers)
