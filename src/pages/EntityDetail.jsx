// File: src/pages/EntityDetail.jsx
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { usePokemonDetail } from '../hooks/usePokemon'

export default function EntityDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, loading, error } = usePokemonDetail(id)

  if (loading) return <div className="text-center my-5"><div className="spinner-border text-primary" /></div>
  if (error || !data) return <p className="text-danger text-center mt-4">{error || 'No encontrado'}</p>

  const { name, height, weight, base_experience, types, abilities, stats, moves, game_indices, species, sprites } = data
  return (
    <>
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>Volver</button>
      <div className="card mx-auto p-4" style={{ maxWidth: 700 }}>
        <div className="row g-4">
          <div className="col-lg-4 text-center">
            <img src={sprites.other['official-artwork'].front_default} className="img-fluid mb-3" alt={name} />
            <h3 className="text-capitalize">{name}</h3>
            <p className="text-muted">Especie: <span className="fw-bold text-capitalize">{species.name}</span></p>
          </div>
          <div className="col-lg-8">
            <h5>Información básica</h5>
            <ul className="list-group mb-3">
              {[
                ['Altura', `${height/10} m`],
                ['Peso', `${weight/10} kg`],
                ['Exp. base', base_experience],
                ['ID', id],
                ['Versiones', game_indices.map(g => g.version.name).join(', ')]
              ].map(([label, val]) => (
                <li key={label} className="list-group-item d-flex justify-content-between">
                  <strong>{label}:</strong> <span className="text-capitalize">{val}</span>
                </li>
              ))}
            </ul>
            <div className="mb-3">
              <h5>Tipos</h5>
              {types.map(t => <span key={t.slot} className="badge badge-type text-capitalize me-1">{t.type.name}</span>)}
            </div>
            <div className="mb-3">
              <h5>Habilidades</h5>
              {abilities.map(a => <span key={a.slot} className="badge bg-info text-capitalize me-1">{a.ability.name}</span>)}
            </div>
            <div className="mb-3">
              <h5>Estadísticas</h5>
              {stats.map(s => (
                <div key={s.stat.name} className="mb-2">
                  <strong className="text-capitalize">{s.stat.name}:</strong>
                  <div className="progress" style={{ height: '0.75rem' }}>
                    <div
                      className="progress-bar bg-warning"
                      role="progressbar"
                      style={{ width: `${(s.base_stat/255)*100}%` }}
                    >{s.base_stat}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mb-3">
              <h5>Movimientos (Top 10)</h5>
              <ul className="list-group list-group-horizontal flex-wrap g-1">
                {moves.slice(0,10).map(m => (
                  <li key={m.move.name} className="list-group-item flex-fill text-capitalize">{m.move.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
