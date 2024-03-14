export function arraysDiffSequence(
  oldArray,
  newArray,
  equalsFn = (a, b) => a === b
) {
  const sequence = []
  const array = new ArrayWithOriginalIndices(oldArray, equalsFn)

  for (let index = 0; index < newArray.length; index++) {
    // --add--
    if (array.isRemoval(index, newArray)) { // --1--
      sequence.push(array.removeItem(index)) // --2--
      index-- // --3--
      continue // --4-- 
    }
    // --add--

    // TODO: noop case

    // TODO: addition case

    // TODO: move case
  }

  // TODO: remove extra items

  return sequence
}