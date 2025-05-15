import React, { useState, useMemo } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useStore } from '../hooks/useGlobalReducer';
import { usePokemonList } from '../hooks/usePokemon';
import { useItems } from '../hooks/useItem';
import { useRegionList } from '../hooks/useRegionList';
import { useFetch } from '../hooks/useFetch';

const MAX_HISTORY = 5;

export default function Navbar() {
  const { store } = useStore();
  const { data: pokemon = [] } = usePokemonList();
  const { data: items = [] } = useItems();
  const { data: regions = [] } = useRegionList();
  const { data: locations = [] } = useFetch('https://pokeapi.co/api/v2/location?limit=1000');

  const [q, setQ] = useState('');
  const [history, setHistory] = useState(() =>
    JSON.parse(localStorage.getItem('searchHistory') || '[]')
  );

  const navigate = useNavigate();
  const hasFavs = store.favorites.length > 0;

  const saveToHistory = (entry) => {
    const key = `${entry.type}-${entry.name}`;
    const filtered = history.filter(h => `${h.type}-${h.name}` !== key);
    const updated = [entry, ...filtered].slice(0, MAX_HISTORY);
    setHistory(updated);
    localStorage.setItem('searchHistory', JSON.stringify(updated));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('searchHistory');
  };

  const suggestions = useMemo(() => {
    if (!q) return [];

    const match = (list, type) =>
      list
        .filter(item => item.name.toLowerCase().includes(q.toLowerCase()))
        .map(item => ({ ...item, type }));

    return [
      ...match(pokemon, 'pokemon'),
      ...match(items, 'item'),
      ...match(regions, 'region'),
      ...match(locations?.results || [], 'location')
    ].slice(0, 7);
  }, [q, pokemon, items, regions, locations]);

  const handleNavigate = (item) => {
    const id = item.url.match(/\/(\d+)\/?$/)[1];

    switch (item.type) {
      case 'pokemon':
        navigate(`/pokemon/${id}`, { state: { tab: 'Basic' } });
        break;
      case 'item':
        navigate(`/item/${id}`);
        break;
      case 'region':
        navigate(`/region/${id}`);
        break;
      case 'location':
        navigate(`/location/${id}`);
        break;
      default:
        break;
    }

    setQ('');
    saveToHistory(item);
  };

  const showDropdown = q.trim() || history.length > 0;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img
            src="https://archives.bulbagarden.net/media/upload/4/4b/Pok%C3%A9dex_logo.png"
            alt="Pokédex Logo"
            height="40"
            className="d-inline-block align-text-top"
          />
        </NavLink>

        <div className="d-flex">
          <div className="dropdown me-3">
            <input
              className="form-control dropdown-toggle"
              placeholder="Search..."
              value={q}
              onChange={e => setQ(e.target.value)}
              data-bs-toggle="dropdown"
              aria-expanded={showDropdown ? 'true' : 'false'}
            />
            {showDropdown && (
              <ul className="dropdown-menu show">
                {q && suggestions.length === 0 && (
                  <li className="dropdown-item text-muted">No matches</li>
                )}

                {q
                  ? suggestions.map((s, i) => (
                      <li key={`${s.type}-${s.name}-${i}`}>
                        <button
                          className="dropdown-item text-capitalize"
                          onClick={() => handleNavigate(s)}
                        >
                          {s.name.replace(/-/g, ' ')}{' '}
                          <small className="text-muted">({s.type})</small>
                        </button>
                      </li>
                    ))
                  : <>
                      {history.map((s, i) => (
                        <li key={`history-${s.type}-${s.name}-${i}`}>
                          <button
                            className="dropdown-item text-capitalize"
                            onClick={() => handleNavigate(s)}
                          >
                            {s.name.replace(/-/g, ' ')}{' '}
                            <small className="text-muted">(recent {s.type})</small>
                          </button>
                        </li>
                      ))}
                      <li><hr className="dropdown-divider" /></li>
                      <li>
                        <button className="dropdown-item text-danger" onClick={clearHistory}>
                          Clear recent
                        </button>
                      </li>
                    </>
                }
              </ul>
            )}
          </div>

          <NavLink
            to="/favorites"
            className={`btn ${hasFavs ? 'btn-warning' : 'btn-outline-warning'} position-relative`}
          >
            <span style={{ fontSize: '1.25rem' }}>{hasFavs ? '★' : '☆'}</span>
            {hasFavs && (
              <span className="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-pill">
                {store.favorites.length}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
