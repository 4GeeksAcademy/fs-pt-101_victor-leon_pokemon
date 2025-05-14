import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import PokeCard from '../components/PokeCard';

export default function Area() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(`https://pokeapi.co/api/v2/location-area/${id}`);

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-warning" />
      </div>
    );
  }

  if (error || !data || !data.name) {
    return <p className="text-center text-danger mt-4">Error loading area data.</p>;
  }

  return (
    <div className="container mt-4">
      <div className="mb-4 d-flex flex-wrap justify-content-start">
        <button
          onClick={() => navigate(`/region`)}
          className="btn btn-outline-warning text-black me-3 mb-2"
        >
          Back to Regions
        </button>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline-warning text-black mb-2"
        >
          Back to Location
        </button>
      </div>

      <h2 className="location-title text-capitalize mb-4 text-center">
        {data.name.replace(/-/g, ' ')}
      </h2>

      <div className="mb-4">
        <h5 className="location-section-title text-center">Encounters</h5>
        {data.pokemon_encounters?.length ? (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {data.pokemon_encounters.map((enc, i) => (
              <div className="col" key={i}>
                <PokeCard item={enc.pokemon} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted">No encounters available.</p>
        )}
      </div>
    </div>
  );
}
