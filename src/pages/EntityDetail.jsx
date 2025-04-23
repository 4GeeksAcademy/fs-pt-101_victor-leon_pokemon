// File: src/pages/EntityDetail.jsx
import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { usePokemonDetail } from '../hooks/usePokemon'
import { getImageUrl } from '../api/pokemon'
import { useAsync } from '../hooks/useAsync'

export default function EntityDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Tabs state (always top-level hook)
  const tabs = ['Básico', 'Movimientos', 'Encuentros', 'Evolución', 'JSON']
  const [active, setActive] = useState('Básico')

  // Core Pokémon detail
  const { data: pkm, loading: lp, error: ep } = usePokemonDetail(id)

  // Species data (runs once pkm.species.url is available)
  const spUrl = pkm?.species.url
  const { data: spc, loading: ls, error: es } = useAsync(
    () => spUrl ? fetch(spUrl).then(r => r.json()) : Promise.resolve(null),
    [spUrl]
  )

  // Evolution chain (runs once spc.evolution_chain.url is available)
  const evoUrl = spc?.evolution_chain.url
  const { data: evo, loading: le, error: ee } = useAsync(
    () => evoUrl ? fetch(evoUrl).then(r => r.json()) : Promise.resolve(null),
    [evoUrl]
  )

  // Encounter data
  const { data: enc, loading: lc, error: ec } = useAsync(
    () => fetch(`https://pokeapi.co/api/v2/pokemon/${id}/encounters`).then(r => r.json()),
    [id]
  )

  // Loading/Error guards (all hooks have been called by this point)
  if (lp || ls || le || lc) {
    return <div className="text-center my-5"><div className="spinner-border text-primary"/></div>
  }
  const loadError = ep || es || ee || ec
  if (loadError || !pkm) {
    return <p className="text-danger text-center mt-4">{loadError || 'No encontrado'}</p>
  }

  // Destructure for ease
  const { name, height, weight, base_experience, types, abilities, stats, moves } = pkm
  const { flavor_text_entries = [], egg_groups = [], generation } = spc || {}

  // Build evolution list
  const evoList = []
  function walk(node) {
    evoList.push(node.species.name)
    node.evolves_to.forEach(walk)
  }
  if (evo) walk(evo.chain)

  return (
    <>
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>Volver</button>
      <div className="card mx-auto p-4" style={{ maxWidth: 800 }}>
        {/* Tab headers */}
        <ul className="nav nav-tabs mb-3">
          {tabs.map(tab => (
            <li className="nav-item" key={tab}>
              <button
                className={`nav-link ${active === tab ? 'active' : ''}`}
                onClick={() => setActive(tab)}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>

        <div className="tab-content">
          {/* Básico */}
          {active === 'Básico' && (
            <div className="row mb-4">
              <div className="col-md-4 text-center">
                <img src={getImageUrl(id)} className="img-fluid mb-2" alt={name} />
                <h2 className="text-capitalize">{name}</h2>
              </div>
              <div className="col-md-8">
                <ul className="list-group mb-3">
                  {[
                    ['ID', id],
                    ['Altura', `${height/10} m`],
                    ['Peso', `${weight/10} kg`],
                    ['Exp. base', base_experience],
                    ['Generación', generation?.name.replace('-', ' ')],
                    ['Grupos huevo', egg_groups.map(g => g.name).join(', ')]
                  ].map(([label, value]) => (
                    <li key={label} className="list-group-item d-flex justify-content-between">
                      <strong>{label}:</strong> <span className="text-capitalize">{value}</span>
                    </li>
                  ))}
                </ul>
                <div className="mb-3">
                  <h5>Tipos</h5>
                  {types.map(t => (
                    <span key={t.slot} className="badge badge-type text-capitalize me-1">
                      {t.type.name}
                    </span>
                  ))}
                </div>
                <div className="mb-3">
                  <h5>Habilidades</h5>
                  {abilities.map(a => (
                    <span key={a.slot} className="badge bg-info text-capitalize me-1">
                      {a.ability.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Movimientos */}
          {active === 'Movimientos' && (
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>Movimiento</th>
                  <th>Método</th>
                  <th>Nivel</th>
                  <th>Juego</th>
                </tr>
              </thead>
              <tbody>
                {moves.flatMap(m =>
                  m.version_group_details.map(v => (
                    <tr key={`${m.move.name}-${v.version_group.name}`}>
                      <td className="text-capitalize">{m.move.name}</td>
                      <td className="text-capitalize">
                        {v.move_learn_method.name.replace('-', ' ')}
                      </td>
                      <td>{v.level_learned_at}</td>
                      <td className="text-capitalize">
                        {v.version_group.name.replace('-', ' ')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

          {/* Encuentros */}
          {active === 'Encuentros' && (
            <div>
              {enc && enc.length > 0 ? (
                enc.map(e => (
                  <div key={e.location_area.name} className="mb-2">
                    <strong className="text-capitalize">
                      {e.location_area.name.replace('-', ' ')}
                    </strong>
                    <ul className="list-inline mb-1">
                      {e.version_details.map(v => (
                        <li key={v.version.name} className="list-inline-item me-3 small text-muted">
                          {v.version.name}: {v.max_chance}% (rarity {v.rarity})
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <p>No hay encuentros registrados.</p>
              )}
            </div>
          )}

          {/* Evolución */}
          {active === 'Evolución' && (
            <ol className="list-group list-group-numbered mb-3">
              {evoList.map(species => (
                <li key={species} className="list-group-item text-capitalize">
                  {species}
                </li>
              ))}
            </ol>
          )}

          {/* JSON */}
          {active === 'JSON' && (
            <pre className="json">
              {JSON.stringify({ pkm, spc, evo, enc }, null, 2)}
            </pre>
          )}
        </div>
      </div>
    </>
  )
}
