// File: src/pages/EntityDetail.jsx
import React from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { usePokemonDetail } from '../hooks/usePokemon'
import { getImageUrl } from '../api/pokemon'

export default function EntityDetail() {
  const { id } = useParams()
  const { data, loading, error } = usePokemonDetail(id)

  if (loading) return <Spinner />
  if (error || !data) return <p className="text-danger text-center mt-4">{error || 'No encontrado'}</p>

  const { name, height, weight, types, abilities, stats } = data
  return (
    <div className="card mx-auto" style={{ maxWidth: 400 }}>
      <img src={getImageUrl(id)} className="card-img-top" alt={name} />
      <div className="card-body">
        <h5 className="card-title text-capitalize">{name}</h5>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><b>Altura:</b> {height}</li>
          <li className="list-group-item"><b>Peso:</b> {weight}</li>
          <li className="list-group-item"><b>Tipos:</b> {types.map(t => t.type.name).join(', ')}</li>
          <li className="list-group-item"><b>Habilidades:</b> {abilities.map(a => a.ability.name).join(', ')}</li>
          <li className="list-group-item"><b>Stats:</b> {stats.map(s => `${s.stat.name}: ${s.base_stat}`).join(', ')}</li>
        </ul>
      </div>
    </div>
  )
}
