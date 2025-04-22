// File: src/components/Navbar.jsx
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'

export default function Navbar() {
  const { favorites } = useFavorites()
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <NavLink className="navbar-brand" to="/">Pokédex</NavLink>
        <ul className="navbar-nav ms-auto d-flex flex-row">
          <li className="nav-item">
            <NavLink className="nav-link" to="/favorites">
              Favorites <span className="badge bg-info">{favorites.length}</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}
