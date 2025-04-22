// File: src/components/Navbar.jsx
import React, { useState, useMemo } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import useGlobalReducer from '../hooks/useGlobalReducer'
import { usePokemonList } from '../hooks/usePokemon'
import { getIdFromUrl } from '../utils/getIdFromUrl'

export default function Navbar() {
  const { store } = useGlobalReducer()
  const { data: all, loading } = usePokemonList()
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const suggestions = useMemo(
    () => all?.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0,5) || [],
    [all, query]
  )

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white mb-4 rounded">
      <div className="container-fluid">
        <NavLink className="navbar-brand text-primary fw-bold" to="/">Pokédex</NavLink>
        <div className="d-flex align-items-center">
          <div className="dropdown me-3">
            <input
              className="form-control dropdown-toggle"
              type="search"
              placeholder="Buscar Pokémon..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              data-bs-toggle="dropdown"
            />
            <ul className="dropdown-menu">
              {loading && <li className="dropdown-item">Cargando...</li>}
              {suggestions.map(p => (
                <li key={p.name}>
                  <button
                    className="dropdown-item text-capitalize"
                    onClick={() => { navigate(`/pokemon/${getIdFromUrl(p.url)}`); setQuery('') }}
                  >
                    {p.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <NavLink className="btn btn-outline-primary position-relative" to="/favorites">
            <i className="bi bi-star-fill"></i>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {store.favorites.length}
            </span>
          </NavLink>
        </div>
      </div>
    </nav>
  )
}
