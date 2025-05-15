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
    return <p className="text-center text-danger mt-4">Error loading items</p>;
  }

  return (
    <div className="container mt-4">
      <button
          onClick={() => navigate(`/items`)}
          className="btn btn-outline-warning text-black mt-4 mb-2"
        >
          Back to Categories
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
