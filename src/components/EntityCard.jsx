// File: src/components/EntityCard.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore, useToggleFavorite } from '../hooks/useGlobalReducer'
import { getImageUrl } from '../api/pokemon'
import { getIdFromUrl } from '../utils/getIdFromUrl'
import { usePokemonDetail } from '../hooks/usePokemon'
import { typeIcons } from '../utils/typeIconsAndMethods'

export default function EntityCard({ item }) {
  const id = getIdFromUrl(item.url)
  const { store } = useStore()
  const toggle = useToggleFavorite()
  const isFav = store.favorites.some(f => f.id === id)
  const nav = useNavigate()
  const { data: detail } = usePokemonDetail(id)
  const types = detail?.types || []

  return (
    <div className="card" onClick={() => nav(`/pokemon/${id}`)}>
      <img src={getImageUrl(id)} className="card-img-top" alt={item.name}/>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="card-title text-capitalize mb-0">{item.name}</h5>
          <button
            className={isFav ? 'btn btn-danger' : 'btn btn-outline-success'}
            onClick={e => { e.stopPropagation(); toggle({ id, name: item.name, url: item.url }) }}
          >{isFav?'★':'☆'}</button>
        </div>
        <div>
          {types.map(t => (
            <span key={t.slot} className="type-icon" style={{backgroundImage:`url(${typeIcons[t.type.name]})`}}/>
          ))}
        </div>
      </div>
    </div>
  )
}
