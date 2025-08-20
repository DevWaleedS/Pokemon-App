// src/tests/setupTests.ts
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

// هنا بتعرف handlers لو حابب تستخدم default responses
const handlers = [
	http.get("https://pokeapi.co/api/v2/pokemon/:name", () => {
		return HttpResponse.json({ message: "mocked pokemon" }, { status: 200 });
	}),
];

// السيرفر بالـ handlers
export const server = setupServer(...handlers);

// lifecycle hooks بتاعة Jest
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
