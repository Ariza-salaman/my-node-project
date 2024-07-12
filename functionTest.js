import jsObject1 from './jsObject1.js'

const data = jsObject1.arbplList.map((item) => {
  return { arbpl: item }
})

console.log(data)

// 创建一个对象
const person = {
  name: 'John',
  greet: () => {
    console.log('Hello, ' + this.name)
  },
}

// 创建另一个对象，并将其原型指向 person
const employee = Object.create(person)
employee.job = 'Developer'

// 访问属性
console.log(employee.name) // 输出: John
console.log(employee.job) // 输出: Developer

// 调用方法
employee.greet() // 输出: Hello, John

// 查看原型链
console.log(employee.__proto__ === person) // 输出: true
console.log(person.__proto__ === Object.prototype) // 输出: true
console.log(Object.prototype.__proto__) // 输出: null
