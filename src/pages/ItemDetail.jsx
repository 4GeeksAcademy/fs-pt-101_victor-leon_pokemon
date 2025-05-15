import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useItemDetail } from '../hooks/useItem';
import { getItemImageUrl } from '../api/item';
import { useStore, useToggleFavorite } from '../hooks/useGlobalReducer';

export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: item, loading, error } = useItemDetail(id);
  const { store } = useStore();
  const toggleFav = useToggleFavorite();

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-warning" />
      </div>
    );
  }

  if (error || !item) {
    return <p className="text-center text-danger mt-4">Error loading item.</p>;
  }

  const isFavorite = store.favorites.some(f => f.id === id && f.type === 'item');

  const effect = item.effect_entries.find(e => e.language.name === 'en')?.effect;
  const flavor = item.flavor_text_entries.find(e => e.language.name === 'en')?.text;

  return (
    <div className="container mt-4 item-detail-page">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-outline-secondary mb-4"
      >
        ← Back
      </button>

      <div className="text-center mb-4">
        <img
          src={getItemImageUrl(item.name)}
          alt={item.name}
          className="item-image"
        />
        <h2 className="text-capitalize mt-3 item-name">
          {item.name.replace(/-/g, ' ')}
        </h2>

        <button
          className={`btn btn-sm ${isFavorite ? 'btn-warning' : 'btn-outline-warning'}`}
          onClick={() =>
            toggleFav({
              id,
              name: item.name,
              url: `https://pokeapi.co/api/v2/item/${id}`,
              type: 'item'
            })
          }
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>

      <div className="card p-3 shadow-sm item-info">
        <p><strong>Category:</strong> {item.category?.name.replace(/-/g, ' ')}</p>
        <p><strong>Cost:</strong> {item.cost} Pokédollars</p>
        {effect && <p><strong>Effect:</strong> {effect}</p>}
        {flavor && <p><strong>Description:</strong> {flavor}</p>}
        {item.attributes?.length > 0 && (
          <p>
            <strong>Attributes:</strong>{' '}
            {item.attributes.map(attr => attr.name.replace(/-/g, ' ')).join(', ')}
          </p>
        )}
      </div>
    </div>
  );
}
