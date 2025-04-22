// File: src/pages/Favorites.jsx
import React from 'react'
import EntityCard from '../components/EntityCard'
import useGlobalReducer from '../hooks/useGlobalReducer'

export default function Favorites() {
  const { store } = useGlobalReducer()
  const favs = store.favorites

  if (!favs.length) return <p className="text-center mt-4">Sin favoritos</p>

  return (
    <div className="row g-3">
      {favs.map(item => (
        <div key={item.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
          <EntityCard item={item} />
        </div>
      ))}
    </div>
  )
}
