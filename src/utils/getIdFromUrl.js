export function getIdFromUrl(url) {
  const m = url.match(/\/(\d+)\/?$/)
  return m ? m[1] : ''
}
