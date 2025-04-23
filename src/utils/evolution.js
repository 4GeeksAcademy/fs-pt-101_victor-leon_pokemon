// File: src/utils/evolution.js
export function traverseChain(chain = {}) {
  const steps = []
  function walk(node) {
    if (!node?.species) return
    steps.push({ species: node.species, details: node.evolution_details || [] })
    ;(node.evolves_to || []).forEach(walk)
  }
  walk(chain)
  return steps
}
