// File: src/pages/Favorites.jsx
import React from 'react'
import { useFavorites } from '../context/FavoritesContext'
import EntityCard from '../components/EntityCard'

export default function Favorites() {
  const { favorites } = useFavorites()

  if (!favorites.length) return <p className="mt-4">No favorites yet.</p>

  return (
    <>
      <h2 className="mt-4">Favorites</h2>
      <div className="row">
        {favorites.map(item => (
          <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <EntityCard item={item} />
          </div>
        ))}
      </div>
    </>
  )
}
