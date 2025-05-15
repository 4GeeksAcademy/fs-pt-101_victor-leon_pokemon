import React from 'react';
import { useStore } from '../hooks/useGlobalReducer';
import PokeCard from '../components/PokeCard';
import ItemCard from '../components/ItemCard';

export default function Favorites() {
  const { store } = useStore();
  const favorites = store.favorites;

  if (favorites.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h4>No favorites yet</h4>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Favorites</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {favorites.map((fav) => (
          <div className="col" key={`${fav.type}-${fav.id}`}>
            {fav.type === 'pokemon' ? (
              <PokeCard item={fav} />
            ) : fav.type === 'item' ? (
              <ItemCard name={fav.name} url={fav.url} />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
