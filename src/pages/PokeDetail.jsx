import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import {
  usePokemonDetail,
  useSpecies,
  useEvolutionChain,
  useEncounters
} from '../hooks/usePokemon'
import { getImageUrl } from '../api/pokemon'
import { traverseChain } from '../utils/evolution'
import { useToggleFavorite, useStore } from '../hooks/useGlobalReducer'
import { typeIcons, methodIcons } from '../utils/Icons'

export default function PokeDetail() {
  const { id } = useParams()
  const { state } = useLocation()
  const navigate = useNavigate()
  const [tab, setTab] = useState(state?.tab || 'Basic')

  const { data: pkm, loading } = usePokemonDetail(id)
  const { data: spc } = useSpecies(pkm?.species?.url)
  const { data: evoData } = useEvolutionChain(spc?.evolution_chain?.url)
  const { data: enc } = useEncounters(id)
  const toggleFav = useToggleFavorite()
  const { store } = useStore()

  useEffect(() => setTab('Basic'), [id])

  if (loading) return (
    <div className="text-center my-5">
      <div className="spinner-border text-warning" />
    </div>
  )
  if (!pkm) return <p className="text-center text-danger mt-4">Not found</p>

  const types     = pkm.types || []
  const abilities = pkm.abilities || []
  const stats     = pkm.stats || []
  const movesMap  = {}
  pkm.moves?.forEach(mv => {
    movesMap[mv.move.name] = (movesMap[mv.move.name] || []).concat(mv.version_group_details)
  })
  const evoSteps = traverseChain(evoData?.chain || {})

  const heightMeters = (pkm.height * 0.1).toFixed(1)
  const weightKg     = (pkm.weight * 0.1).toFixed(1)

  return (
    <div className="card p-4 mx-auto mb-5 mt-5" style={{ maxWidth: 800 }}>
      <ul className="nav nav-tabs mb-3">
        {['Basic','Moves','Encounters','Evolution'].map(t => (
          <li className="nav-item" key={t}>
            <button
              className={`nav-link${tab === t ? ' active' : ''}`}
              onClick={() => setTab(t)}
            >{t}</button>
          </li>
        ))}
      </ul>

      {tab === 'Basic' && (
        <div className="row g-3">
          <div className="col-md-4 text-center">
            <img
              src={getImageUrl(id)}
              className="img-fluid mb-3"
              alt={pkm.name}
              style={{ borderRadius: '0.5rem', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}
            />
            <h2 className="text-capitalize mb-2">{pkm.name}</h2>
            <button
  className={`btn btn-sm ${store.favorites.some(f => f.id === id) ? 'btn-warning' : 'btn-outline-warning'}`}
  onClick={() => toggleFav({ id, name: pkm.name, url: pkm.species.url })}
>
  {store.favorites.some(f => f.id === id) ? '★' : '☆'}
</button>
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-sm-6 mb-3">
                <div className="p-3 bg-light rounded">
                  <h6 className="mb-1"><strong>Height</strong></h6>
                  <p className="mb-0">{heightMeters} m</p>
                </div>
              </div>
              <div className="col-sm-6 mb-3">
                <div className="p-3 bg-light rounded">
                  <h6 className="mb-1"><strong>Weight</strong></h6>
                  <p className="mb-0">{weightKg} kg</p>
                </div>
              </div>
              <div className="col-12 mb-3">
                <div className="p-3 bg-light rounded">
                  <h6 className="mb-1"><strong>Types</strong></h6>
                  {types.map(t => (
                    <img
                      key={t.slot}
                      src={typeIcons[t.type.name]}
                      alt={t.type.name}
                      title={t.type.name}
                      className="me-2"
                      style={{ width: 'auto', height: '20px' }}
                    />
                  ))}
                </div>
              </div>
              <div className="col-12 mb-3">
                <div className="p-3 bg-light rounded">
                  <h6 className="mb-1"><strong>Abilities</strong></h6>
                  <ul className="mb-0" style={{ paddingLeft: '1rem' }}>
                    {abilities.map(a => (
                      <li key={a.slot} className="text-capitalize">
                        {a.ability.name}{a.is_hidden && ' (Hidden)'}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-12 mb-3">
                <div className="p-3 bg-light rounded">
                  <h6 className="mb-1"><strong>Description</strong></h6>
                  <p className="mb-0">
                    {spc?.flavor_text_entries
                      .find(e => e.language.name === 'en')
                      ?.flavor_text.replace(/\n|\f/g, ' ') || '—'}
                  </p>
                </div>
              </div>
              <div className="col-12 mb-3">
                <div className="p-3 bg-light rounded">
                  <h6 className="mb-1"><strong>Stats</strong></h6>
                  {stats.map(s => (
                    <div key={s.stat.name} className="mb-2">
                      <div className="d-flex justify-content-between">
                        <span className="text-capitalize">{s.stat.name}</span>
                        <span>{s.base_stat}</span>
                      </div>
                      <div className="progress" style={{ height: '6px' }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: `${(s.base_stat/255)*100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'Moves' && (
        <table className="table table-sm">
          <thead>
            <tr><th>Move</th><th>Method</th><th>Game</th></tr>
          </thead>
          <tbody>
            {Object.entries(movesMap).map(([mv, dets]) =>
              dets.map((d, i) => (
                <tr key={`${mv}-${i}`}>
                  {i === 0 && (
                    <td rowSpan={dets.length} className="align-middle text-capitalize">
                      {mv}
                    </td>
                  )}
                  <td className="align-middle text-center" style={{ verticalAlign: 'middle' }}>
                    <img
                      src={methodIcons[d.move_learn_method.name] || methodIcons.machine}
                      width={24} height={24}
                      alt={d.move_learn_method.name}
                      title={d.move_learn_method.name}
                    />
                    {d.move_learn_method.name === 'level-up' && d.level_learned_at && (
                      <small className="d-block text-muted">Lv.{d.level_learned_at}</small>
                    )}
                  </td>
                  <td className="align-middle text-capitalize">
                    {d.version_group.name.replace(/-/g, ' ')}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

{tab === 'Encounters' && (
  <div className="row">
    {enc.length ? (
      Object.entries(
        enc.reduce((acc, e) => {
          e.version_details.forEach(v => {
            const game = v.version.name.replace(/-/g, ' ');
            if (!acc[game]) acc[game] = [];
            acc[game].push({
              area: e.location_area.name.replace(/-/g, ' ')
            });
          });
          return acc;
        }, {})
      ).map(([game, areas]) => (
        <div key={game} className="col-12 mb-3">
          <h6 className="mb-2">
            <strong className="text-capitalize">{game}</strong>
          </h6>
          <ul className="list-group">
            {areas.map((a, i) => (
              <li key={`${game}-${i}`} className="list-group-item">
                {a.area}
              </li>
            ))}
          </ul>
        </div>
      ))
    ) : (
      <p>No encounters.</p>
    )}
  </div>
)}


      {tab === 'Evolution' && (
        <div className="d-flex flex-wrap">
          {evoSteps.map((step, i) => {
            const sid = step.species.url.match(/\/(\d+)\/?$/)[1]
            const det = step.details[0] || {}
            return (
              <div
                key={i}
                className="card text-center p-2 m-2"
                style={{ width: 180, cursor: 'pointer' }}
                onClick={() => navigate(`/pokemon/${sid}`, { state: { tab: 'Basic' } })}
              >
                <img
                  src={getImageUrl(sid)}
                  className="card-img-top"
                  alt={step.species.name}
                  title={det.trigger?.name}
                />
                <p className="small text-capitalize mt-1 mb-1">{step.species.name}</p>
                {det.trigger?.name && (
                  <div className="text-center">
                    <img
                      src={methodIcons[det.trigger.name] || ''}
                      width={24}
                      height={24}
                      alt={det.trigger.name}
                      title={det.trigger.name}
                    />
                    {det.trigger.name === 'level-up' && det.min_level && (
                      <small className="d-block text-muted">Lv.{det.min_level}</small>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
