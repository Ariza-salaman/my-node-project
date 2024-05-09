export default {
  chunk(array, size) {
    return array.reduce((result, item, index) => {
      if (index % size === 0) {
        result.push([])
      }
      result[result.length - 1].push(item)
      return result
    }, [])
  },

  compact(array) {
    return array.filter(Boolean)
  },

  concat(array, ...values) {
    const newArray = [...array]
    values.forEach((value) => {
      if (Array.isArray(value)) {
        newArray.push(...value)
      } else {
        newArray.push(value)
      }
    })
    return newArray
  },

  difference(array, values) {
    return array.filter((item) => !values.includes(item))
  },

  differenceBy(array, values, iteratee) {
    return array.filter(
      (item) => !values.some((value) => iteratee(item) === iteratee(value))
    )
  },

  differenceWith(array, values, comparator) {
    return array.filter(
      (item) => !values.some((value) => comparator(item, value))
    )
  },

  drop(array, n = 1) {
    return array.slice(n)
  },
}
