import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PokemonListResponse, Pokemon } from "../types";

const baseUrl =
	import.meta.env.VITE_API_BASE_URL ?? "https://pokeapi.co/api/v2";

export const pokeApi = createApi({
	reducerPath: "pokeApi",
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: (builder) => ({
		getPokemonList: builder.query<
			PokemonListResponse,
			{ limit?: number; offset?: number } | void
		>({
			query: (args) => {
				const limit = args?.limit ?? 50;
				const offset = args?.offset ?? 0;
				return `/pokemon?limit=${limit}&offset=${offset}`;
			},
		}),
		getPokemonById: builder.query<Pokemon, number | string>({
			query: (id) => `/pokemon/${id}`,
		}),
	}),
});

export const { useGetPokemonListQuery, useGetPokemonByIdQuery } = pokeApi;

// ✅ util function for tests
export async function getPokemonDetails(name: string) {
	const res = await fetch(`${baseUrl}/pokemon/${name}`);
	if (!res.ok) {
		throw new Error("Failed to fetch pokemon details");
	}
	return res.json();
}
