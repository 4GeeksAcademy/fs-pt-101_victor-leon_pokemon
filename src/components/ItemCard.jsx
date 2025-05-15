import React from 'react';
import { getItemImageUrl } from '../api/item';
import { useNavigate } from 'react-router-dom';

export default function ItemCard({ name, url }) {
  const navigate = useNavigate();
  const id = url.split('/').filter(Boolean).pop(); // Extrae el ID desde la URL

  return (
    <div
      className="card text-center shadow-sm border-0"
      role="button"
      onClick={() => navigate(`/item/${id}`)}
    >
      <img
        src={getItemImageUrl(name)}
        alt={name}
        className="card-img-top mx-auto p-3"
        style={{ maxWidth: '96px' }}
      />
      <div className="card-body p-2">
        <h6 className="card-title text-capitalize m-0">{name}</h6>
      </div>
    </div>
  );
}
