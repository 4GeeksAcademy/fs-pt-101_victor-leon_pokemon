// File: src/api/pokemon.js
const BASE = 'https://pokeapi.co/api/v2/pokemon'

export async function fetchList() {
  const res = await fetch(`${BASE}?limit=1000`)
  if (!res.ok) throw new Error('Error fetching list')
  return (await res.json()).results
}

export async function fetchDetail(id) {
  const res = await fetch(`${BASE}/${id}`)
  if (!res.ok) throw new Error('Error fetching detail')
  return await res.json()
}

export const getImageUrl = id =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
