import { useParams } from "react-router-dom";
import { useGetPokemonByIdQuery } from "../features/pokeApi";

export default function DetailsPage() {
	const { id = "" } = useParams();
	const { data, isLoading, isError, refetch } = useGetPokemonByIdQuery(id);

	return (
		<div className='detail-card'>
			<div className='detail-title' data-testid='detail-title'>
				{data?.name ?? "Details"}
			</div>

			<div className='detail-body'>
				{isLoading && <div className='loading'>Loading...</div>}
				{isError && (
					<div className='error'>
						Failed to load. <button onClick={() => refetch()}>Retry</button>
					</div>
				)}
				{data && (
					<>
						<img
							style={{ width: 200, height: 200, objectFit: "contain" }}
							src={
								data.sprites.other?.["official-artwork"]?.front_default ??
								data.sprites.front_default ??
								""
							}
							alt={data.name}
						/>
						<table className='table' data-testid='detail-table'>
							<tbody>
								<tr>
									<td>
										<strong>Name</strong>
									</td>
									<td>{data.name}</td>
								</tr>
								<tr>
									<td>
										<strong>Height</strong>
									</td>
									<td>{data.height} cm</td>
								</tr>
								<tr>
									<td>
										<strong>Weight</strong>
									</td>
									<td>{data.weight / 10} kg</td>
								</tr>
								<tr>
									<td>
										<strong>Types</strong>
									</td>
									<td>
										{data.types.map((t) => (
											<div key={t.type.name}>{t.type.name}</div>
										))}
									</td>
								</tr>
							</tbody>
						</table>
					</>
				)}
			</div>
		</div>
	);
}
