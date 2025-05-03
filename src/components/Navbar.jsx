import React, { useState, useMemo } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useStore } from '../hooks/useGlobalReducer'
import { usePokemonList } from '../hooks/usePokemon'

export default function Navbar() {
  const { store } = useStore()
  const { data, loading } = usePokemonList()
  const [q, setQ] = useState('')
  const nav = useNavigate()

  const suggestions = useMemo(
    () => data.filter(p => p.name.includes(q)).slice(0, 5),
    [data, q]
  )

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold" to="/">Pokédex</NavLink>
        <div className="d-flex">
          <div className="dropdown me-3">
            <input
              className="form-control dropdown-toggle"
              placeholder="Search..."
              value={q}
              onChange={e => setQ(e.target.value)}
              data-bs-toggle="dropdown"
            />
            <ul className="dropdown-menu">
              {loading && <li className="dropdown-item">Loading...</li>}
              {suggestions.map(p => (
                <li key={p.name}>
                  <button
                    className="dropdown-item text-capitalize"
                    onClick={() => {
                      const id = p.url.match(/\/(\d+)\/?$/)[1]
                      nav(`/pokemon/${id}`, { state: { tab: 'Basic' } })
                      setQ('')
                    }}
                  >
                    {p.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <NavLink to="/favorites" className="btn btn-outline-primary position-relative">
            ☆
            <span className="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-pill"> {/* ← CAMBIO: rounded-pill */}
              {store.favorites.length}
            </span>
          </NavLink>
        </div>
      </div>
    </nav>
  )
}
