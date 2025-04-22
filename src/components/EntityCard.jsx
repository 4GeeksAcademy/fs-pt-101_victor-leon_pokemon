// File: src/components/EntityCard.jsx
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useToggleFavorite } from '../hooks/useGlobalReducer'
import { getImageUrl } from '../api/pokemon'
import { getIdFromUrl } from '../utils/getIdFromUrl'

export default function EntityCard({ item }) {
  const id = useMemo(() => getIdFromUrl(item.url), [item.url])
  const toggleFav = useToggleFavorite()
  return (
    <div className="card mb-4">
      <img src={getImageUrl(id)} className="card-img-top" alt={item.name} />
      <div className="card-body">
        <h5 className="card-title text-capitalize">{item.name}</h5>
        <div className="d-flex gap-2">
          <Link to={`/pokemon/${id}`} className="btn btn-primary flex-fill">
            Detalle
          </Link>
          <button
            className="btn btn-outline-success"
            onClick={() => toggleFav({ id, name: item.name, url: item.url })}
          >
            ☆
          </button>
        </div>
      </div>
    </div>
  )
}
