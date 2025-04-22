// File: src/components/Navbar.jsx
import React from 'react'
import { NavLink } from 'react-router-dom'
import useGlobalReducer from '../hooks/useGlobalReducer'

export default function Navbar() {
  const { store } = useGlobalReducer()
  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <NavLink className="navbar-brand" to="/">Pokédex</NavLink>
      <NavLink className="nav-link text-light ms-auto" to="/favorites">
        ★ <span className="badge bg-info">{store.favorites.length}</span>
      </NavLink>
    </nav>
  )
}
