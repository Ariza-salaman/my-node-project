import jsObject1 from './jsObject1.js'

const data = jsObject1.arbplList.map((item) => {
  return { arbpl: item }
})

console.log(data)

const hexStr = '00 00 00 10 00 00 00 08 00 00 00 01 00 00 00 02'

const asciiStr = jsObject1.hexToAscii(hexStr)

console.log(asciiStr)
