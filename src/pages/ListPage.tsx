import { useGetPokemonListQuery } from "../features/pokeApi";
import PokemonListItem from "../components/PokemonListItem";

export default function ListPage() {
	const { data, isLoading, isError, refetch } = useGetPokemonListQuery({
		limit: 30,
	});
	return (
		<div className='list' role='list'>
			<div className='header'>PokeReact</div>

			<div className='pokemon-list'>
				{isLoading && <div className='loading'>Loading...</div>}
				{isError && (
					<div className='error'>
						Error loading. <button onClick={() => refetch()}>Retry</button>
					</div>
				)}
				{data?.results.map((p) => (
					<PokemonListItem key={p.name} item={p} />
				))}
			</div>
		</div>
	);
}
