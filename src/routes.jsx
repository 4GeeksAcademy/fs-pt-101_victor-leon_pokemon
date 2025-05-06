import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import PokeDetail from './pages/PokeDetail';
import Favorites from './pages/Favorites';
import Pokemon from './pages/Pokemon';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="pokemon" element={<Pokemon />} />
      <Route path="pokemon/:id" element={<PokeDetail />} />
      <Route path="favorites" element={<Favorites />} />
    </Route>
  )
);
