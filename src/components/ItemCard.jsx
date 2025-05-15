import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getItemImageUrl } from '../api/item';
import { useToggleFavorite, useStore } from '../hooks/useGlobalReducer';

export default function ItemCard({ name, url }) {
  const navigate = useNavigate();
  const toggleFav = useToggleFavorite();
  const { store } = useStore();

  const id = url.split('/').filter(Boolean).pop();
  const isFav = store.favorites.some(f => f.id === Number(id) && f.type === 'item');

  return (
    <div
      className="card h-100 shadow-sm"
      onClick={() => navigate(`/item/${id}`)}
      style={{ borderRadius: '1rem', overflow: 'hidden', cursor: 'pointer' }}
    >
      <div className="position-relative bg-light text-center">
        <img
          src={getItemImageUrl(name)}
          alt={name}
          className="p-3"
          style={{ maxWidth: '96px', height: '96px' }}
        />
        <button
          className={`btn btn-sm position-absolute top-0 end-0 m-2 ${
            isFav ? 'btn-warning' : 'btn-outline-warning'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            toggleFav({ id: Number(id), name, url, type: 'item' });
          }}
        >
          {isFav ? '★' : '☆'}
        </button>
      </div>

      <div className="card-body text-center p-2">
        <h6 className="card-title text-capitalize mb-0">{name}</h6>
      </div>
    </div>
  );
}
