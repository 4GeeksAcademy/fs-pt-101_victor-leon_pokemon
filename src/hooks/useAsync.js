// File: src/hooks/useAsync.js
import { useState, useEffect, useRef } from 'react'

export function useAsync(asyncFn, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const cancel = useRef(false)

  useEffect(() => {
    cancel.current = false
    setLoading(true)
    asyncFn()
      .then(res => !cancel.current && setData(res))
      .catch(err => !cancel.current && setError(err.message))
      .finally(() => !cancel.current && setLoading(false))
    return () => { cancel.current = true }
  }, deps)

  return { data, loading, error }
}
