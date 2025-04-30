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
import { typeIcons, methodIcons } from '../utils/typeIconsAndMethods'

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

  if (loading) return <div className="text-center my-5"><div className="spinner-border"/></div>
  if (!pkm) return <p className="text-center text-danger mt-4">Not found</p>

  // Prepare data
  const types     = pkm.types || []
  const abilities = pkm.abilities || []
  const stats     = pkm.stats || []
  const movesMap  = {}
  pkm.moves?.forEach(mv => {
    movesMap[mv.move.name] = (movesMap[mv.move.name] || []).concat(mv.version_group_details)
  })
  const evoSteps = traverseChain(evoData?.chain || {})

  return (
    <>
      <button className="btn btn-secondary mb-3" onClick={() => navigate('/')}>Home</button>
      <div className="card p-4 mx-auto" style={{ maxWidth: 800 }}>
        <ul className="nav nav-tabs mb-3">
          {['Basic','Moves','Encounters','Evolution'].map(t => (
            <li className="nav-item" key={t}>
              <button
                className={`nav-link${tab===t?' active':''}`}
                onClick={() => setTab(t)}
              >{t}</button>
            </li>
          ))}
        </ul>

        {tab==='Basic' && (
          <div className="row">
            <div className="col-4 text-center">
              <img src={getImageUrl(id)} className="img-fluid mb-2" alt={pkm.name}/>
              <button
                className={store.favorites.some(f=>f.id===id)?'btn btn-danger':'btn btn-outline-success'}
                onClick={()=>toggleFav({id,name:pkm.name,url:pkm.species.url})}
              >
                {store.favorites.some(f=>f.id===id)?'★':'☆'}
              </button>
              <h2 className="text-capitalize mt-2">{pkm.name}</h2>
            </div>
            <div className="col-8">
              <h5>ID</h5><p>{pkm.id}</p>
              <h5>Height / Weight</h5><p>{pkm.height} dm / {pkm.weight} hg</p>
              <h5>Base Experience</h5><p>{pkm.base_experience}</p>
              <h5>Types</h5>
              {types.map(t=>(
                <span key={t.slot}
                  className="type-icon"
                  style={{backgroundImage:`url(${typeIcons[t.type.name]})`}}
                />
              ))}
              <h5 className="mt-3">Abilities</h5>
              {abilities.map(a=>(
                <p key={a.slot} className="text-capitalize">
                  {a.ability.name}{a.is_hidden?' (hidden)':''}
                </p>
              ))}
              <h5 className="mt-3">Stats</h5>
              {stats.map(s=>(
                <div key={s.stat.name} className="mb-2">
                  <strong className="text-capitalize">{s.stat.name}</strong>: {s.base_stat}
                  <div className="progress mt-1">
                    <div className="progress-bar" style={{width:`${(s.base_stat/255)*100}%`}}/>
                  </div>
                </div>
              ))}
              <h5 className="mt-3">Moves Known</h5><p>{pkm.moves.length}</p>
              <h5 className="mt-3">Species</h5><p className="text-capitalize">{spc?.name}</p>
              <h5 className="mt-3">Habitat</h5><p className="text-capitalize">{spc?.habitat?.name||'Unknown'}</p>
              <h5 className="mt-3">Flavor Text</h5>
              <p>{spc?.flavor_text_entries.find(e=>e.language.name==='en')?.flavor_text.replace(/\n|\f/g,' ')||'—'}</p>
            </div>
          </div>
        )}

        {tab==='Moves' && (
          <table className="table table-sm">
            <thead><tr><th>Move</th><th>Details</th></tr></thead>
            <tbody>
              {Object.entries(movesMap).map(([mv, det])=>(
                <tr key={mv}>
                  <td className="text-capitalize align-middle">{mv}</td>
                  <td>
                    {det.map((d,i)=>(
                      <div key={i} className="d-flex align-items-center mb-1" title={d.move_learn_method.name}>
                        <img src={methodIcons[d.move_learn_method.name]||methodIcons.machine} width={24} height={24} className="me-1"/>
                        <span className="text-capitalize me-2">{d.version_group.name.replace('-',' ')}</span>
                        {d.move_learn_method.name==='level-up' && d.level_learned_at && <small>Lv.{d.level_learned_at}</small>}
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tab==='Encounters' && (
          (enc.length?
            enc.map((e,i)=>(
              <div key={i} className="mb-2">
                <strong className="text-capitalize">{e.location_area.name.replace('-',' ')}</strong>
                <ul className="list-inline">
                  {e.version_details.map((v,j)=>(
                    <li key={j} className="list-inline-item me-3 small text-muted">
                      {v.version.name}: {v.max_chance}% (rarity {v.rarity})
                    </li>
                  ))}
                </ul>
              </div>
            ))
          : <p>No encounters.</p>)
        )}

        {tab==='Evolution' && (
          <div className="d-flex flex-wrap">
            {evoSteps.map((step,i)=>{
              const sid = step.species.url.match(/\/(\d+)\/?$/)[1]
              const det = step.details[0]||{}
              const m = det.trigger?.name||'level-up'
              return (
                <div key={i} className="card text-center p-2 m-2" style={{width:120,cursor:'pointer'}}
                  onClick={()=>navigate(`/pokemon/${sid}`,{state:{tab:'Basic'}})}>
                  <img src={getImageUrl(sid)} className="card-img-top" alt={step.species.name}/>
                  <div className="card-body p-1">
                    <p className="small text-capitalize mb-1">{step.species.name}</p>
                    <div className="d-flex align-items-center justify-content-center" title={m}>
                      <img src={methodIcons[m]||methodIcons.machine} width={24} height={24} className="me-1"/>
                      {m==='level-up'&&det.min_level?<small className="text-muted">Lv.{det.min_level}</small>:null}
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
