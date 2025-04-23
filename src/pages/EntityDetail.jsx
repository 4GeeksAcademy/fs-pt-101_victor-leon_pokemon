// File: src/pages/EntityDetail.jsx
import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { usePokemonDetail, useSpecies, useEvolutionChain, useEncounters } from '../hooks/usePokemon'
import { getImageUrl } from '../api/pokemon'
import { traverseChain } from '../utils/evolution'
import { getIdFromUrl } from '../utils/getIdFromUrl'
import { useToggleFavorite, useStore } from '../hooks/useGlobalReducer'
import { typeIcons, methodIcons } from '../utils/typeIconsAndMethods'

export default function EntityDetail() {
  const { id } = useParams()
  const nav = useNavigate()
  const [tab, setTab] = useState('Basic')

  const { data: pkm, loading } = usePokemonDetail(id)
  const { data: spc } = useSpecies(pkm?.species?.url)
  const { data: evoData } = useEvolutionChain(spc?.evolution_chain?.url)
  const { data: enc } = useEncounters(id)
  const toggle = useToggleFavorite()
  const { store } = useStore()

  if (loading) return <div className="text-center my-5"><div className="spinner-border"/></div>
  if (!pkm) return <p className="text-danger text-center mt-4">Not found</p>

  const evoSteps = traverseChain(evoData?.chain)
  const stats = pkm.stats || []
  const types = pkm.types || []
  const abilities = pkm.abilities || []

  return (
    <>
      <button className="btn btn-secondary mb-3" onClick={() => nav('/')}>Home</button>
      <div className="card p-4 mx-auto" style={{ maxWidth: 800 }}>
        <ul className="nav nav-tabs mb-3">
          {['Basic','Moves','Encounters','Evolution'].map(t=>(
            <li className="nav-item" key={t}>
              <button className={`nav-link${tab===t?' active':''}`} onClick={()=>setTab(t)}>{t}</button>
            </li>
          ))}
        </ul>

        {tab==='Basic' && (
          <div className="row">
            <div className="col-4 text-center">
              <img src={getImageUrl(id)} className="img-fluid mb-2" alt={pkm.name}/>
              <button className={store.favorites.some(f=>f.id===id)?'btn btn-danger':'btn btn-outline-success'}
                      onClick={()=>toggle({ id, name:pkm.name, url:pkm.species.url })}>
                {store.favorites.some(f=>f.id===id)?'★':'☆'}
              </button>
              <h2 className="text-capitalize mt-2">{pkm.name}</h2>
            </div>
            <div className="col-8">
              <h5>Types</h5>
              {types.map(t=>(
                <span key={t.slot} className="type-icon"
                      style={{backgroundImage:`url(${typeIcons[t.type.name]})`}}/>
              ))}
              <h5 className="mt-3">Abilities</h5>
              {abilities.map(a=>(
                <span key={a.slot} className="badge bg-info text-capitalize me-1">{a.ability.name}</span>
              ))}
              <h5 className="mt-3">Stats</h5>
              {stats.map(s=>(
                <div key={s.stat.name} className="mb-2">
                  <strong className="text-capitalize">{s.stat.name}:</strong> {s.base_stat}
                  <div className="progress mt-1">
                    <div className="progress-bar" style={{width:`${(s.base_stat/255)*100}%`}}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==='Moves' && (
          <table className="table table-sm">
            <thead><tr><th>Move</th><th>Details</th></tr></thead>
            <tbody>
              {Object.entries((pkm.moves||[]).reduce((m,v)=>{(m[v.move.name]=m[v.move.name]||[]).push(...v.version_group_details);return m},{}))
                .map(([mv, det])=>(
                <tr key={mv}>
                  <td className="text-capitalize align-middle">{mv}</td>
                  <td>
                    {det.map((d,i)=>{
                      const method = d.move_learn_method.name
                      const lvl = method==='level-up'&&d.level_learned_at?`Lv.${d.level_learned_at}`:''
                      const icon = methodIcons[method] || methodIcons['machine']
                      return (
                        <div key={i} className="d-flex align-items-center mb-1" title={method}>
                          <img src={icon} width={24} height={24} className="me-1"/>
                          <span className="text-capitalize me-2">{d.version_group.name.replace('-',' ')}</span>
                          {lvl && <small>{lvl}</small>}
                        </div>
                      )
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tab==='Encounters' && (
          (enc||[]).length > 0 ? enc.map(e=>(
            <div key={e.location_area.name} className="mb-2">
              <strong className="text-capitalize">{e.location_area.name.replace('-',' ')}</strong>
              <ul className="list-inline">
                {e.version_details.map((v,i)=>(
                  <li key={i} className="list-inline-item me-3 small text-muted">
                    {v.version.name}: {v.max_chance}% (rarity {v.rarity})
                  </li>
                ))}
              </ul>
            </div>
          )) : <p>No encounters.</p>
        )}

        {tab==='Evolution' && (
          <div className="d-flex flex-wrap">
            {evoSteps.map((step,i)=> {
              const sid = getIdFromUrl(step.species.url)
              const det = step.details[0]||{}
              const method = det.trigger?.name || 'level-up'
              const lvl = method==='level-up'&&det.min_level?`Lv.${det.min_level}`:''
              const icon = methodIcons[method] || methodIcons['machine']
              return (
                <div key={i} className="card text-center p-2 m-2" style={{width:120,cursor:'pointer'}} onClick={()=>nav(`/pokemon/${sid}`)}>
                  <img src={getImageUrl(sid)} className="card-img-top" alt={step.species.name}/>
                  <div className="card-body p-1">
                    <p className="small text-capitalize mb-1">{step.species.name}</p>
                    <div className="d-flex align-items-center justify-content-center" title={method}>
                      <img src={icon} width={24} height={24} className="me-1"/>
                      <small className="text-muted">{lvl}</small>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
