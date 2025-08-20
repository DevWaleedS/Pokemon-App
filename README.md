# PokeReact — Pokémon Browser (TypeScript, Vite, Redux Toolkit, RTK Query)

A small, production-like React app that:

- Fetches Pokémon data from PokeAPI using RTK Query
- Persists RTK Query cache via redux-persist
- Displays a list and a details view with routing
- Is fully typed with TypeScript
- Ships with a comprehensive unit test suite (Vitest + Testing Library + MSW)

---

## Prerequisites

- Node.js 18+ (recommended LTS)
- npm 9+ (comes with Node 18 LTS)

Check versions:

```bash
node -v
npm -v
```

---

## Quick start

```bash
# 1) Install dependencies
npm install

# 2) Start the development server (Vite)
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Configuration

The app reads the API base URL from `VITE_API_BASE_URL`. If not provided, it defaults to `https://pokeapi.co/api/v2`.

- Using a `.env` file:

```bash
# .env
VITE_API_BASE_URL=https://pokeapi.co/api/v2
```

- Or inline per run (example script provided):

```bash
npm run dev:api
```

This script uses `cross-env` to set `VITE_API_BASE_URL` for the dev server.

---

## Scripts

- `npm run dev`: Start Vite dev server
- `npm run build`: Type-check and build the app
- `npm run preview`: Preview the production build
- `npm test`: Run the test suite once
- `npm run test:coverage`: Run the test suite with coverage enabled
- `npm run test:ui`: Run tests in watch/UI mode
- `npm run dev:api`: Dev server with explicit `VITE_API_BASE_URL`

---

## Project structure

```text
pokemon-app/
  index.html
  package.json
  vite.config.ts
  vitest.setup.ts                # jest-dom matchers + RTL cleanup
  tsconfig.json
  src/
    main.tsx                     # App entry: Redux Provider, PersistGate, Router
    App.tsx                      # App shell + routes
    styles.css                   # Basic styles

    app/
      store.ts                   # Redux store + redux-persist (persists RTK Query cache)

    features/
      pokeApi.ts                 # RTK Query api: getPokemonList, getPokemonById + helper

    components/
      PokemonListItem.tsx        # Renders a list item link + sprite

    pages/
      ListPage.tsx               # Lists Pokémon with loading/error states
      DetailsPage.tsx            # Shows details for a selected Pokémon
      __tests__/                 # Page-specific tests

    tests/
      server.ts                  # MSW server & handlers for tests
      setupTests.ts              # MSW lifecycle hooks for all tests

    types.ts                     # Shared TypeScript types
    utils.ts                     # Small helpers: getIdFromUrl, imgFromId
```

---

## App architecture and data flow

- Routing: `BrowserRouter` is configured in `src/main.tsx`. `App.tsx` renders:
  - `ListPage` (always visible)
  - `Routes` with:
    - `/pokemon/:id` → `DetailsPage`
    - `*` → redirect to `/pokemon/1`

- State: Configured in `src/app/store.ts` using Redux Toolkit.
  - `pokeApi.reducer` is registered under `pokeApi.reducerPath`
  - `redux-persist` persists only the RTK Query cache (`whitelist: [pokeApi.reducerPath]`)
  - Middleware merges default middleware with `pokeApi.middleware` and ignores redux-persist action checks

- Data fetching: `src/features/pokeApi.ts`
  - `getPokemonList` (GET `/pokemon?limit&offset`) → `useGetPokemonListQuery`
  - `getPokemonById` (GET `/pokemon/:id`) → `useGetPokemonByIdQuery`
  - Both benefit from RTK Query caching, invalidation, and loading/error states

- UI:
  - `ListPage` renders a header, the list, and handles loading/error with a Retry button
  - `DetailsPage` shows a title, artwork sprite, and a table (Name/Height/Weight/Types) with loading/error states and Retry
  - `PokemonListItem` renders a link `<Link to=\"/pokemon/:id\">` with a sprite and the name

- Utilities:
  - `getIdFromUrl(url)` extracts the numeric Pokémon id from a PokeAPI resource URL
  - `imgFromId(id)` builds the sprite URL used in list items

---

## Testing

The project uses: Vitest, Testing Library, and MSW (Mock Service Worker) with JSDOM.

- Global testing setup
  - `vitest.setup.ts`: extends `expect` with jest-dom matchers and cleans up the DOM after each test
  - `src/tests/setupTests.ts`: starts/stops the MSW server and resets handlers between tests
  - `src/tests/server.ts`: central MSW handlers for list and details endpoints

- Run tests

```bash
# run once
npm test

# run with coverage
npm run test:coverage

# run in watch mode (UI)
npm run test:ui
```

- Coverage output
  - Text summary in terminal
  - HTML report under `coverage/` (open `coverage/index.html` in a browser)

- What is covered
  - `utils` functions
  - `PokemonListItem` component
  - `ListPage` success and error states
  - `DetailsPage` success and error + Retry behavior
  - `App` routing behavior
  - `store` registration and dispatch safety

- How MSW is used
  - During tests, network calls to PokeAPI are intercepted by MSW
  - Handlers for `GET /pokemon` and `GET /pokemon/:id` return deterministic JSON
  - Individual tests can `server.use(...)` to override responses (e.g., for error scenarios)

---

## Building for production

```bash
# Type-check and build
npm run build

# Preview the built app locally
npm run preview
```

Vite outputs static assets to `dist/`. You can serve these with any static file server.

---

## Extending the app

- Add a new RTK Query endpoint
  1) Edit `src/features/pokeApi.ts` and add to `endpoints` in `createApi`
  2) Export the generated hook and use it in a component/page

- Add a new page/route
  1) Create the page under `src/pages`
  2) Wire the route in `src/App.tsx`

- Add a new Redux slice (non-RTK Query)
  1) Create a slice with `createSlice`
  2) Add it to `rootReducer` in `src/app/store.ts`
  3) Consider whether to persist it via redux-persist

---

## Troubleshooting

- API calls fail in dev:
  - Ensure `VITE_API_BASE_URL` is reachable
  - PokeAPI may rate limit; try again or reduce frequency

- Tests fail with network errors:
  - Verify MSW is running via `src/tests/setupTests.ts`
  - Ensure your tests import nothing that starts real network requests before MSW starts

- React Router warnings in tests:
  - They are harmless for unit tests and relate to future v7 flags. They do not affect behavior.

---

## License

This project is provided as-is for learning and demonstration purposes.
