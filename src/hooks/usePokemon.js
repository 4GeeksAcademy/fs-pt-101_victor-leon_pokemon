// File: src/hooks/usePokemon.js
import { useFetch } from './useFetch'
const BASE = 'https://pokeapi.co/api/v2/pokemon'

export const usePokemonList = () => {
  const { data, loading, error } = useFetch(`${BASE}?limit=251`)
  return { data: data?.results || [], loading, error }
}
export const usePokemonDetail = id => useFetch(id ? `${BASE}/${id}` : null)
export const useSpecies = url => useFetch(url)
export const useEvolutionChain = url => useFetch(url)
export const useEncounters = id => useFetch(id ? `${BASE}/${id}/encounters` : null)
