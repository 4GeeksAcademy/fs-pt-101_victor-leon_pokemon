import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { getIdFromUrl } from '../utils/getIdFromUrl';

export default function Location() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(`https://pokeapi.co/api/v2/location/${id}`);

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-warning" />
      </div>
    );
  }

  if (error || !data || !data.name) {
    return <p className="text-center text-danger mt-4">Error loading location data.</p>;
  }

  return (
    <div className="container mt-4">
      <button
        onClick={() => navigate(`/region`)}
        className="btn btn-outline-warning text-black mb-4"
      >     
        Back to Regions
      </button>

      <h2 className="text-capitalize mb-4">{data.name.replace(/-/g, ' ')}</h2>

      <div className="mb-4">
        <h5>Region:</h5>
        <p
          className="text-capitalize location-area-item"
          role="button"
          onClick={() => navigate(`/region/${getIdFromUrl(data.region.url)}`)}
        >
          {data.region?.name.replace(/-/g, ' ')}
        </p>
      </div>

      <div className="mb-4">
        <h5>Areas:</h5>
        <ul className="list-group">
          {data.areas?.map((area) => (
            <li
              key={area.name}
              className="list-group-item text-capitalize location-area-item"
              onClick={() => navigate(`/area/${getIdFromUrl(area.url)}`)}

            >
              {area.name.replace(/-/g, ' ')}
            </li>
          ))}
        </ul>
      </div>

      

    </div>
  );
}
