// File: src/routes.jsx
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Home from './pages/Home'
import EntityDetail from './pages/EntityDetail'
import Favorites from './pages/Favorites'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Home />} />
      <Route path="pokemon/:id" element={<EntityDetail />} />
      <Route path="favorites" element={<Favorites />} />
    </Route>
  )
)
