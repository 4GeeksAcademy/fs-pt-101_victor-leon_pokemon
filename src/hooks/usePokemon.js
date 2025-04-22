// File: src/hooks/usePokemon.js
import { useAsync } from './useAsync'
import { fetchList, fetchDetail } from '../api/pokemon'

export const usePokemonList = limit =>
  useAsync(() => fetchList(limit), [limit])

export const usePokemonDetail = id =>
  useAsync(() => fetchDetail(id), [id])
