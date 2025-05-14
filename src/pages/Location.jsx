import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { getIdFromUrl } from '../utils/getIdFromUrl';
import { getRegionNameImage } from '../api/region';

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

  const regionName = data.region?.name || '';
  const regionId = getIdFromUrl(data.region.url);
  const regionImage = getRegionNameImage(regionName);

  return (
    <div className="container mt-4 location-page">
      <button
        onClick={() => navigate(`/region`)}
        className="btn btn-outline-warning text-black mb-4"
      >
        Back to Regions
      </button>

      <h2 className="location-title text-capitalize mb-5">
        {data.name.replace(/-/g, ' ')}
      </h2>

      <div className="region-image-block mb-2">
        <h5 className="location-section-title mb-3">Region</h5>
        <img
          src={regionImage}
          alt={regionName}
          role="button"
          onClick={() => navigate(`/region/${regionId}`)}
          className="region-name-image"
        />
      </div>

      <div className="mb-4">
        <h5 className="location-section-title">Areas</h5>
        <ul className="list-group shadow-sm">
          {data.areas?.map((area) => (
            <li
              key={area.name}
              className="list-group-item text-capitalize location-area-item clickable"
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
