export async function fetchResource(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error('Network error')
  return res.json()
}
