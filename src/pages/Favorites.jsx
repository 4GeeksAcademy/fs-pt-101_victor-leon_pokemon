// File: src/pages/Favorites.jsx
import React from 'react'
import EntityCard from '../components/EntityCard'
import { useStore } from '../hooks/useGlobalReducer'

export default function Favorites() {
  const { store } = useStore()
  return store.favorites.length ? (
    <div className="row row-cols-2 row-cols-md-4 g-3">
      {store.favorites.map(f => <EntityCard key={f.id} item={f} />)}
    </div>
  ) : (
    <p className="text-center mt-4">No favorites yet.</p>
  )
}
