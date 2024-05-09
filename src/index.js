// index.js
import JSObject1 from './utils/functionModules.js'
import _ from './utils/copyLodash.js'

console.log(JSObject1.getLorem(5))

const myArr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]

console.log(_.chunk(myArr, 3))

const myArr2 = [1, '', 0, 8, null, 5, undefined, 7, NaN, 11]

console.log(_.compact(myArr2))

var array = [1]
var other = _.concat(array, 2, [3], [[4]])

console.log(other)

console.log(_.difference([3, 2, 1], [4, 2]))
