import constantData from './public/constantData.js'
import functionModules from './src/utils/functionModules.js'
import { fileURLToPath } from 'url'
import { readFile } from 'fs/promises'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 异步读取 JSON 文件并转换数据
async function readJsonFileAndTransform() {
  try {
    // 构建 JSON 文件的路径
    const jsonFilePath = path.join(__dirname, 'public', 'constData.json')

    // 读取 JSON 文件
    const data = await readFile(jsonFilePath, 'utf8')

    // 解析 JSON 数据
    const jsonData = JSON.parse(data)

    // 使用 transformData 函数处理数据
    const transformedData = functionModules.transformData(jsonData.reasonCard)

    // 在这里使用处理后的数据
    //console.dir(transformedData, { depth: null })
  } catch (error) {
    console.error('处理文件时出错:', error)
  }
}

readJsonFileAndTransform()

// 读取JS对象里面的数据并且转换
const transformedData = functionModules.transformData(constantData.reasonCard)
//console.dir(transformedData, { depth: null })

const lorem = functionModules.getLorem()
console.log(lorem)
