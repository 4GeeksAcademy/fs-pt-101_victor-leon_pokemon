// File: src/pages/Home.jsx
import React from 'react'
import EntityCard from '../components/EntityCard'
import { usePokemonList } from '../hooks/usePokemon'

export default function Home() {
  const { data: list, loading, error } = usePokemonList()

  if (loading) return <div className="text-center my-5"><div className="spinner-border text-primary" /></div>
  if (error) return <p className="text-danger text-center mt-4">{error}</p>

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
      {list.map(item => (
        <EntityCard key={item.name} item={item} />
      ))}
    </div>
  )
}
