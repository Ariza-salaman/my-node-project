import net from 'net'
import { alarmParams } from './alarmParams.js'
import { ioParams } from './ioParams.js'
import { devices } from './devices.js'

let clients = []
let isConnected = {}

const connectToDevice = (device) => {
  const client = new net.Socket()
  clients.push(client)
  isConnected[device.IP] = false

  client.connect(13002, device.IP, () => {
    console.log(`已连接到设备 ${device.EQUIP_CODE} (${device.IP})`)
    isConnected[device.IP] = true
    startDataCollection(client, device.UP_TIME)
  })

  client.on('error', (err) => {
    console.error(`连接错误 ${device.EQUIP_CODE} (${device.IP}):`, err)
    isConnected[device.IP] = false
    setTimeout(() => connectToDevice(device), device.Reconnect * 1000)
  })

  client.on('close', () => {
    console.log(`连接关闭 ${device.EQUIP_CODE} (${device.IP})，尝试重连...`)
    isConnected[device.IP] = false
    setTimeout(() => connectToDevice(device), device.Reconnect * 1000)
  })

  client.on('data', (data) => {
    processReceivedData(data, device)
  })
}

const startDataCollection = (client, interval) => {
  setInterval(() => {
    if (client.destroyed) return
    requestData(client)
  }, interval * 1000)
}

const requestData = (client) => {
  const requestMessage = Buffer.from(
    '0000001C000000080000000400000000000000010000000300000004',
    'hex',
  )
  client.write(requestMessage)
}

const processReceivedData = (data, device) => {
  const productionIndex = 24
  const alarmIndex = 34
  const outputIndex = 24

  const production = data.readUInt32BE(productionIndex)
  const alarm = data.readUInt32BE(alarmIndex)
  const outputSignal = data
    .readUInt32BE(outputIndex)
    .toString(2)
    .padStart(32, '0')

  console.log(`设备 ${device.EQUIP_CODE} 产量: ${production}`)
  console.log(`设备 ${device.EQUIP_CODE} 报警值: ${alarm}`)
  console.log(`设备 ${device.EQUIP_CODE} 输出信号: ${outputSignal}`)

  const alarmContent =
    alarmParams.find((param) => param.value === alarm)?.content || '未知报警'

  if (alarm > 0) {
    console.log(`设备 ${device.EQUIP_CODE} 报警内容: ${alarmContent}`)
  }

  outputSignal
    .split('')
    .reverse()
    .forEach((bit, index) => {
      if (bit === '1') {
        const ioContent =
          ioParams.find((param) => param.value === index)?.content ||
          `未知输出点 ${index}`
        console.log(`设备 ${device.EQUIP_CODE} 输出点 ${index}: ${ioContent}`)
      }
    })

  // 数据存储逻辑实现
}

devices.forEach((device) => connectToDevice(device))
