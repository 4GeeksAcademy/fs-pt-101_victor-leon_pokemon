// File: src/pages/Home.jsx
import React from 'react'
import PokeCard from '../components/PokeCard'
import { usePokemonList } from '../hooks/usePokemon'

export default function Home() {
  const { data, loading, error } = usePokemonList()
  if (loading) return <div className="text-center my-5"><div className="spinner-border"/></div>
  if (error) return <p className="text-danger text-center mt-4">{error}</p>
  return (
    <div className="row row-cols-2 row-cols-md-4 g-3">
      {data.map(item => <PokeCard key={item.name} item={item} />)}
    </div>
  )
}
