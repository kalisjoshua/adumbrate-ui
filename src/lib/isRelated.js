function isRelated (a, b) {
  let related
  let walker = b

  if (a === b) {
    related = true
  } else {
    do {
      walker = walker.parentNode
      related = walker === a
    } while (!related && walker.parentNode)
  }

  return related
}

export default isRelated
