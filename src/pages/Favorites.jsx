import React from 'react';
import { useStore } from '../hooks/useGlobalReducer';
import PokeCard from '../components/PokeCard';

export default function Favorites() {
  const { store } = useStore();
  const favorites = store.favorites;

  if (favorites.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h4>Not favorites yet</h4>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {favorites.map((pokemon) => (
          <div className="col" key={pokemon.id}>
            <PokeCard item={pokemon} />
          </div>
        ))}
      </div>
    </div>
  );
}
