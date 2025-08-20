import { Link } from 'react-router-dom'
import { getIdFromUrl, imgFromId } from '../utils'
import type { NamedAPIResource } from '../types'

export default function PokemonListItem({ item }: { item: NamedAPIResource }) {
  const id = getIdFromUrl(item.url)
  return (
    <Link data-testid={`poke-${item.name}`} to={`/pokemon/${id}`} className="item">
      <img className="poke-img" src={imgFromId(id)} alt={item.name} />
      <span>{item.name}</span>
    </Link>
  )
}
