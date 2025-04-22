// File: src/pages/EntityDetail.jsx
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchDetail, getImageUrl } from '../api/pokemon'

export default function EntityDetail() {
  const { id } = useParams()
  const [data, setData] = useState(null)

  useEffect(() => {
    fetchDetail(id)
      .then(setData)
      .catch(console.error)
  }, [id])

  if (!data) return <div className="text-center mt-5"><div className="spinner-border" role="status" /></div>

  return (
    <div className="card mt-4">
      <img src={getImageUrl(id)} className="card-img-top" alt={data.name} />
      <div className="card-body">
        <h5 className="card-title text-capitalize">{data.name}</h5>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><strong>Height:</strong> {data.height}</li>
          <li className="list-group-item"><strong>Weight:</strong> {data.weight}</li>
          <li className="list-group-item"><strong>Types:</strong> {data.types.map(t => t.type.name).join(', ')}</li>
          <li className="list-group-item"><strong>Abilities:</strong> {data.abilities.map(a => a.ability.name).join(', ')}</li>
          <li className="list-group-item"><strong>Stats:</strong> {data.stats.map(s => `${s.stat.name}: ${s.base_stat}`).join(', ')}</li>
        </ul>
      </div>
    </div>
  )
}
