import React from 'react';
import { useNavigate } from 'react-router-dom';
import { regionImages } from '../api/region';

export default function RegionCard({ region }) {
  const navigate = useNavigate();
  const regionId = region.url.match(/\/(\d+)\/?$/)[1];
  const imageUrl = regionImages[regionId] || 'https://via.placeholder.com/400x200?text=Region';

  return (
    <div
      className="card h-100 text-center region-card"
      onClick={() => navigate(`/region/${regionId}`)}
    >
      <img
        src={imageUrl}
        alt={region.name}
        className="card-img-top"
      />
      <div className="card-body d-flex flex-column justify-content-center">
        <h5 className="text-capitalize mb-0">{region.name}</h5>
      </div>
    </div>
  );
}
