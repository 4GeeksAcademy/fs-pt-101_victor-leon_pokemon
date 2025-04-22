// File: src/pages/Favorites.jsx
import React from 'react'
import EntityCard from '../components/EntityCard'
import useGlobalReducer from '../hooks/useGlobalReducer'

export default function Favorites() {
  const { store } = useGlobalReducer()
  const favs = store.favorites

  if (!favs.length) return <p className="text-center mt-4">Sin favoritos</p>

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
      {favs.map(item => (
        <EntityCard key={item.id} item={item} />
      ))}
    </div>
  )
}
