// File: src/components/EntityCard.jsx
import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import useGlobalReducer, { useToggleFavorite } from '../hooks/useGlobalReducer'
import { getImageUrl } from '../api/pokemon'
import { getIdFromUrl } from '../utils/getIdFromUrl'

export default function EntityCard({ item }) {
  const id = useMemo(() => getIdFromUrl(item.url), [item.url])
  const { store } = useGlobalReducer()
  const toggleFav = useToggleFavorite()
  const isFav = store.favorites.some(f => f.id === id)
  const navigate = useNavigate()

  return (
    <div className="card" onClick={() => navigate(`/pokemon/${id}`)}>
      <div className="row g-0">
        <div className="col-4">
          <img src={getImageUrl(id)} className="img-fluid rounded-start" alt={item.name} />
        </div>
        <div className="col-8 d-flex flex-column justify-content-center">
          <div className="card-body py-2 d-flex justify-content-between align-items-center">
            <h5 className="card-title text-capitalize mb-0">{item.name}</h5>
            <button
              className={isFav ? 'btn btn-sm btn-danger' : 'btn btn-sm btn-outline-success'}
              onClick={e => { e.stopPropagation(); toggleFav({ id, name: item.name, url: item.url }) }}
            >
              {isFav ? '★' : '☆'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
