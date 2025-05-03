import React from 'react'
import PokeCard from '../components/PokeCard'
import { usePokemonList } from '../hooks/usePokemon'

export default function Home() {
  const { data, loading, error } = usePokemonList()

  if (loading) {
    return (
      <div className="row gx-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="col-6 col-md-3 py-3 px-1">
            <div className="skeleton-card" />
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return <p className="text-danger text-center mt-4">{error}</p>
  }

  return (
    <div className="row gx-0">
      {data.map(item => (
        <div key={item.name} className="col-6 col-md-3 py-3 px-1">
          <PokeCard item={item} />
        </div>
      ))}
    </div>
  )
}
