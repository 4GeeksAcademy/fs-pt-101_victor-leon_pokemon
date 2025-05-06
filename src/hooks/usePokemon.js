import { useFetch } from './useFetch'
const BASE = 'https://pokeapi.co/api/v2/pokemon'

export const usePokemonList = () => {
  const { data, loading, error } = useFetch(`${BASE}?limit=2000`)
  return { data: data?.results || [], loading, error }
}

export const usePokemonDetail = id => useFetch(id ? `${BASE}/${id}` : null)
export const useSpecies = url => useFetch(url)
export const useEvolutionChain = url => useFetch(url)

export const useEncounters = id => {
  const { data, loading, error } = useFetch(id ? `${BASE}/${id}/encounters` : null)
  return { data: Array.isArray(data) ? data : [], loading, error }
}
