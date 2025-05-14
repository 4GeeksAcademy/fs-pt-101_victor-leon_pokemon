import React from 'react';
import { useNavigate } from 'react-router-dom';
import { regionImages, getRegionNameImage } from '../api/region';

export default function RegionCard({ region }) {
  const navigate = useNavigate();
  const regionId = region.url.match(/\/(\d+)\/?$/)[1];
  const imageUrl = regionImages[regionId];
  const nameImageUrl = getRegionNameImage(region.name); // Imagen PNG del nombre

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
        <img
          src={nameImageUrl}
          alt={region.name}
          className="img-fluid"
          style={{ maxHeight: '50px', objectFit: 'contain' }}
        />
      </div>
    </div>
  );
}
