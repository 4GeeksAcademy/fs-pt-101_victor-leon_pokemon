// File: src/hooks/useFetch.js
import { useState, useEffect, useRef } from 'react'
import { fetchResource } from '../utils/api'

export function useFetch(url) {
  const [state, setState] = useState({ data: null, loading: true, error: null })
  const cancel = useRef(false)
  useEffect(() => {
    cancel.current = false
    if (!url) {
      setState({ data: null, loading: false, error: null })
      return
    }
    setState({ data: null, loading: true, error: null })
    fetchResource(url)
      .then(data => !cancel.current && setState({ data, loading: false, error: null }))
      .catch(err => !cancel.current && setState({ data: null, loading: false, error: err.message }))
    return () => { cancel.current = true }
  }, [url])
  return state
}
