function isDescendent (a, b) {
  let walker = b
  let related = walker === a

  while (!related && walker.parentNode) {
    walker = walker.parentNode
    related = walker === a
  }

  return related
}

export {
  isDescendent,
}
