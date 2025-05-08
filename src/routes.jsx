import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Pokemon from './pages/Pokemon';
import PokeDetail from './pages/PokeDetail';
import Favorites from './pages/Favorites';
import Region from './pages/Region';
import RegionDetail from './pages/RegionDetail';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="pokemon" element={<Pokemon />} />
      <Route path="pokemon/:id" element={<PokeDetail />} />
      <Route path="favorites" element={<Favorites />} />
      <Route path="region" element={<Region />} />
      <Route path="region/:id" element={<RegionDetail />} />
    </Route>
  )
);
