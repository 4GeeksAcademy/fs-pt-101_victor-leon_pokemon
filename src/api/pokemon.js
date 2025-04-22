// File: src/api/pokemon.js
const BASE = 'https://pokeapi.co/api/v2'

export async function fetchList() {
  const res = await fetch(`${BASE}/pokemon?limit=20`)
  if (!res.ok) throw new Error('Failed to fetch Pokémon list')
  const { results } = await res.json()
  return results
}

export async function fetchDetail(id) {
  const res = await fetch(`${BASE}/pokemon/${id}`)
  if (!res.ok) throw new Error('Failed to fetch Pokémon detail')
  return await res.json()
}

export function getImageUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}
