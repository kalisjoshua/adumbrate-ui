function debounce(fn, delay) {
  let pending

  function postponed() {
    const args = arguments

    pending && clearTimeout(pending)

    pending = setTimeout(function () {
      fn.apply(this, args)
    }, delay || 200)
  }

  return postponed
}

export default debounce
