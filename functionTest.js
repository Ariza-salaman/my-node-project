import { LoremIpsum } from 'lorem-ipsum'

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    min: 3,
    max: 7,
  },
  wordsPerSentence: {
    min: 3,
    max: 5,
  },
})

for (let i = 0; i < 10; i++) {
  console.log(lorem.generateSentences(1))
}
// 数组解构
const [a, b, c] = [1, 2, 3, 4]
console.log(a, b, c)
let d = 1
let f = 2
;[d, f] = [5, 6]
;(function () {
  console.log('Hello World!')
})()
;[d, f] = [f, d]
console.log(d, f)
