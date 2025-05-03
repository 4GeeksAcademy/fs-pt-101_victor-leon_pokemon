// File: src/store.js

export function initialStore() {
  return {
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
  }
}

export default function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAV': {
      const exists = state.favorites.some(f => f.id === action.payload.id)
      const updated = exists
        ? state.favorites.filter(f => f.id !== action.payload.id)
        : [...state.favorites, action.payload]

      localStorage.setItem('favorites', JSON.stringify(updated))
      return { ...state, favorites: updated }
    }

    default:
      return state
  }
}
