import React from 'react';
import { useItemCategories } from '../hooks/useItem';
import { useNavigate } from 'react-router-dom';
import { getIdFromUrl } from '../utils/getIdFromUrl';

export default function Item() {
  const { data: categories, loading, error } = useItemCategories();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-warning" />
      </div>
    );
  }

  if (error || !categories) {
    return <p className="text-center text-danger mt-4">Error cargando categorías.</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Item categories</h2>
      <div className="row">
        {categories.map(cat => {
          const id = getIdFromUrl(cat.url);
          return (
            <div key={cat.name} className="col-6 col-md-4 col-lg-3 mb-4">
              <div
                className="card shadow-sm p-3 text-center border-0"
                role="button"
                onClick={() => navigate(`/item-category/${id}`)}
              >
                <h6 className="text-capitalize m-0">{cat.name.replace(/-/g, ' ')}</h6>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
