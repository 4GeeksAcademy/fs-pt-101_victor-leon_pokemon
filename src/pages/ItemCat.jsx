import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useItemCategory } from '../hooks/useItem';
import ItemCard from '../components/ItemCard';

export default function ItemList() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useItemCategory(id);

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-warning" />
      </div>
    );
  }

  if (error || !data || !data.items) {
    return <p className="text-center text-danger mt-4">Error cargando objetos.</p>;
  }

  return (
    <div className="container mt-4">
      <button onClick={() => navigate(-1)} className="btn btn-outline-secondary mb-4">
        ← Volver
      </button>
      <h2 className="text-capitalize mb-4 text-center">
        {data.name.replace(/-/g, ' ')}
      </h2>
      <div className="row">
        {data.items.map(item => (
          <div key={item.name} className="col-6 col-md-4 col-lg-3 mb-4">
            <ItemCard name={item.name} url={item.url} />
          </div>
        ))}
      </div>
    </div>
  );
}
