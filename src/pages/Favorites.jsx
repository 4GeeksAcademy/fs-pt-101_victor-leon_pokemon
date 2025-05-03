import React from 'react'
import PokeCard from '../components/PokeCard'
import { useStore } from '../hooks/useGlobalReducer'

export default function Favorites() {
  const { store } = useStore()

  if (!store.favorites.length) {
    return <p className="text-center mt-4">No favorites yet.</p>
  }

  return (
    <div className="row gx-0">
      {store.favorites.map(f => (
        <div key={f.id} className="col-6 col-md-3 py-3 px-1">
          <PokeCard item={f} />
        </div>
      ))}
    </div>
  )
}
