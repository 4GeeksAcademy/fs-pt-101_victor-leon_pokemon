// File: src/pages/Home.jsx
import React from 'react'
import EntityCard from '../components/EntityCard'
import Spinner from '../components/Spinner'
import { usePokemonList } from '../hooks/usePokemon'

export default function Home() {
  const { data: list, loading, error } = usePokemonList(24)

  if (loading) return <Spinner />
  if (error) return <p className="text-danger text-center mt-4">{error}</p>

  return (
    <div className="row g-3">
      {list.map(item => (
        <div key={item.name} className="col-6 col-sm-4 col-md-3 col-lg-2">
          <EntityCard item={item} />
        </div>
      ))}
    </div>
  )
}
