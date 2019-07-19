function isDescendent (a, b) {
  let related
  let walker = b

  do {
    walker = walker.parentNode
    related = walker === a
  } while (!related && walker.parentNode)

  return related
}

export default isDescendent
