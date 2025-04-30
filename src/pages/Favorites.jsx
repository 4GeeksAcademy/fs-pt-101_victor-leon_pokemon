// File: src/pages/Favorites.jsx
import React from 'react'
import PokeCard from '../components/PokeCard'
import { useStore } from '../hooks/useGlobalReducer'

export default function Favorites() {
  const { store } = useStore()
  return store.favorites.length ? (
    <div className="row row-cols-2 row-cols-md-4 g-3">
      {store.favorites.map(f => <PokeCard key={f.id} item={f} />)}
    </div>
  ) : (
    <p className="text-center mt-4">No favorites yet.</p>
  )
}
