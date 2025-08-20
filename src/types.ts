export interface NamedAPIResource { name: string; url: string }
export interface PokemonListResponse {
  count: number; next: string | null; previous: string | null; results: NamedAPIResource[]
}
export interface Pokemon {
  id: number; name: string; height: number; weight: number;
  types: { slot: number; type: { name: string; url: string } }[]
  sprites: { front_default: string | null; other?: { ['official-artwork']?: { front_default: string | null } } }
}
