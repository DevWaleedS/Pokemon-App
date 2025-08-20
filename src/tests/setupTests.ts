// src/tests/setupTests.ts
import { server } from './server'

// lifecycle hooks
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
