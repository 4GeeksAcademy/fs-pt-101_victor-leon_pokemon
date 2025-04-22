// File: src/components/EntityCard.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import { getImageUrl } from '../api/pokemon'

export default function EntityCard({ item }) {
  const id = item.url.split('/').filter(Boolean).pop()
  const { favorites, toggleFavorite } = useFavorites()
  const isFav = favorites.some(f => f.id === id)

  return (
    <div className="card mb-3">
      <img src={getImageUrl(id)} className="card-img-top" alt={item.name} />
      <div className="card-body">
        <h5 className="card-title text-capitalize">{item.name}</h5>
        <Link to={`/pokemon/${id}`} className="btn btn-primary me-2">Details</Link>
        <button
          className={isFav ? 'btn btn-danger' : 'btn btn-outline-success'}
          onClick={() => toggleFavorite({ id, name: item.name, url: item.url })}
        >
          {isFav ? 'Remove' : 'Favorite'}
        </button>
      </div>
    </div>
  )
}
