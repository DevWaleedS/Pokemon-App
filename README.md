# PokeReact (TypeScript + Redux Toolkit + RTK Query)

A small demo app that:
- Fetches a list of Pokémon from the PokeAPI.
- Persists the list/cache (redux-persist persists RTK Query cache).
- Shows details when you click a Pokémon.
- Uses **TypeScript, Redux Toolkit, RTK Query, React Router**.
- Has unit tests (Vitest + Testing Library + MSW) with **≥ 60% coverage**.

## Quick start

```bash
# 1) Unzip and install deps
npm install

# 2) Start dev server (uses Vite)
npm run dev
```

Open http://localhost:5173

## Configure API Base URL

The app reads `VITE_API_BASE_URL` (defaults to `https://pokeapi.co/api/v2`).

You can set it via `.env`:

```bash
cp .env.example .env
# edit .env if you want
```

Or inline per run:

```bash
VITE_API_BASE_URL=https://pokeapi.co/api/v2 npm run dev
# or
npm run dev:api
```

## Testing

```bash
npm test        # run once with coverage
npm run test:ui # watch mode
```

A coverage report will be created in `coverage/`.

## Project structure

```
src/
  app/store.ts                # Redux store + redux-persist (persists RTK Query cache)
  features/pokeApi.ts         # RTK Query endpoints
  pages/ListPage.tsx          # List screen
  pages/DetailsPage.tsx       # Details screen
  components/PokemonListItem.tsx
  tests/server.ts             # MSW server/handlers
  pages/__tests__/*.test.tsx  # Tests
```

## Notes

- Persistence: We persist `pokeApi` (RTK Query cache) using `redux-persist`, which satisfies the "store the list persistently" requirement.
- Start script is configurable by `VITE_API_BASE_URL`.
- Clean, modular code: endpoints isolated, simple UI structure, and typed everywhere.
