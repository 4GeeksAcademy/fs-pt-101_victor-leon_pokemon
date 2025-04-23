// File: src/components/Navbar.jsx
import React, { useState, useMemo } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useStore } from '../hooks/useGlobalReducer'
import { usePokemonList } from '../hooks/usePokemon'
import useDebounce from '../hooks/useDebounce'
import { getIdFromUrl } from '../utils/getIdFromUrl'

export default function Navbar() {
  const { store } = useStore()
  const { data, loading } = usePokemonList()
  const [q, setQ] = useState('')
  const debQ = useDebounce(q)
  const nav = useNavigate()

  const suggestions = useMemo(
    () => data.filter(p => p.name.includes(debQ)).slice(0, 5),
    [data, debQ]
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
                    onClick={() => { nav(`/pokemon/${getIdFromUrl(p.url)}`); setQ('') }}
                  >
                    {p.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <NavLink to="/favorites" className="btn btn-outline-primary position-relative">
            ☆
            <span className="position-absolute top-0 start-100 translate-middle badge bg-danger">
              {store.favorites.length}
            </span>
          </NavLink>
        </div>
      </div>
    </nav>
  )
}
