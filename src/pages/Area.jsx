import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

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
<button
        onClick={() => navigate(`/region`)}
        className="btn btn-outline-warning text-black mb-4"
      >     
        Back to Regions
      </button>
      <button
        onClick={() => navigate(-1)}
        className="btn btn-outline-warning text-black mb-4 mx-4"
      >     
        Back to Location
      </button>

      <h2 className="text-capitalize mb-4">{data.name.replace(/-/g, ' ')}</h2>

      <div className="mb-4">
        <h5>Encounters:</h5>
        <ul className="list-group">
          {data.pokemon_encounters?.map((encounter, index) => (
            <li key={index} className="list-group-item text-capitalize">
              {encounter.pokemon.name.replace(/-/g, ' ')}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
