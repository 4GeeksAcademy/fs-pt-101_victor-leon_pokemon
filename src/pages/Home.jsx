// File: src/pages/Home.jsx
import React, { useEffect, useState } from 'react'
import { fetchList } from '../api/pokemon'
import EntityCard from '../components/EntityCard'

export default function Home() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchList()
      .then(setList)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="text-center mt-5"><div className="spinner-border" role="status" /></div>

  return (
    <>
      <h2 className="mt-4">Pokémon</h2>
      <div className="row">
        {list.map(item => (
          <div key={item.name} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <EntityCard item={item} />
          </div>
        ))}
      </div>
    </>
  )
}
