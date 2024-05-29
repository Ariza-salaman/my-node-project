import mqtt from 'mqtt'
import dayjs from 'dayjs'
import mysql from 'mysql2'

// 数据库连接配置
const dbConfig = {
  host: '10.1.1.22',
  user: 'root',
  password: '1QAZ@wsx',
  database: 'pageplug',
}

// 创建数据库连接
const connection = mysql.createConnection(dbConfig)

function formatDate(timestampStr) {
  // const [seconds, milliseconds] = timestampStr.split(':').map(Number)
  const date = dayjs(timestampStr)
  return date.format('YYYY-MM-DD HH:mm:ss.SSS')
}
// 获取MQTT报文

// 连接地址，有很多连接失败都是因为地址没写对
const connectUrl = `mqtt://mqttprod-emq.isesol.com:1883`
// 客户端ID（注意：客户端不能写死，如果多人用同一个客户端，那么就会出现MQTT一直是断开重连断开重连的问题）
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
// 连接设置
let options = {
  clean: true, // 保留会话
  connectTimeout: 4000, // 超时时间
  reconnectPeriod: 1000, // 重连时间间隔
  // 认证信息
  clientId,
  username: 'GC231020000002c6r9lk',
  password: 'GC231020000002yTbBUO',
}
// 需要订阅的主题
const topic = 'GC231020000002'

// 创建客户端
var client = mqtt.connect(connectUrl, options)

// 时间间隔配置（秒）
const TIME_INTERVAL_SECONDS = 10

// 缓存机制
const deviceCache = {}

// 判断是否需要插入数据的函数
function shouldInsertData(eqpCode, qty) {
  const now = dayjs()
  const lastEntry = deviceCache[eqpCode]

  if (!lastEntry) {
    // 设备第一次记录
    deviceCache[eqpCode] = { lastInsertTime: now, lastQty: qty }
    return true
  }

  const timeSinceLastInsert = now.diff(lastEntry.lastInsertTime, 'second')

  if (
    timeSinceLastInsert >= TIME_INTERVAL_SECONDS &&
    lastEntry.lastQty !== qty
  ) {
    // 更新时间和数量
    deviceCache[eqpCode] = { lastInsertTime: now, lastQty: qty }
    return true
  }

  return false
}

// 成功连接后触发的回调
client.on('connect', () => {
  console.log('已经连接成功')
  // 订阅主题，这里可以订阅多个主题
  client.subscribe([topic], () => {
    console.log(`订阅了主题 ${[topic].join('和')}`)
  })
})

// 当客户端收到一个发布过来的消息时触发回调
/*
 * topic：收到的报文的topic
 * message：收到的数据包的负载playload
 * packet：MQTT 报文信息，其中包含 QoS、retain 等信息
 */
client.on('message', function (topic, message, packet) {
  // 这里有可能拿到的数据格式是Uint8Array格式，可以直接用toString转成字符串
  let data = JSON.parse(message.toString())
  let eqpId = data.machineNo
  // console.log(`接收到${eqpId}的数据`)
  let { jsonData, ...newData } = data
  newData.jsonData = JSON.parse(data.jsonData)
  const eqpList = [
    'iSS_8cf3190a81b9',
    'iSS_4ce70545f1d5',
    'iSS_4ce7054b2e37',
    'iMI_30be3bcff1e6',
    'iMI_30be3bcff193',
    'iMI_30be3bd084c0',
    'iSS_4ce70528c8c4',
    'iSS_4ce70520420b',
    'iSS_4ce70509b443',
    'iMI_30be3bd11cd9',
    'iMI_009027e340c0',
    'iMI_e0795e021aa7',
    'iMI_e0795e021aa8',
    'iDA_e0795e023ee2',
  ]
  let eqpCode = ''
  let qty = 0
  if (eqpList.includes(eqpId)) {
    switch (eqpId) {
      case 'iSS_8cf3190a81b9':
        eqpCode = '7B1206'
        qty = newData.jsonData.VD_SCJS_9100
        break
      case 'iSS_4ce70545f1d5':
        eqpCode = '7B1205'
        qty = newData.jsonData.VD_SCJS_9100
        break
      case 'iSS_4ce7054b2e37':
        eqpCode = '7B1147'
        qty = newData.jsonData.VD_SCJS_9100
        break
      case 'iMI_30be3bcff1e6':
        eqpCode = '7B1244'
        qty = newData.jsonData.D_ZJSZ_142
        break
      case 'iMI_30be3bcff193':
        eqpCode = '7B1245'
        qty = newData.jsonData.D_ZJSZ_142
        break
      case 'iMI_30be3bd084c0':
        eqpCode = '7B1246'
        qty = newData.jsonData.D_ZJSZ_142
        break
      case 'iSS_4ce70528c8c4':
        eqpCode = '7B1247'
        qty = newData.jsonData.VD_SCJS_250
        break
      case 'iSS_4ce70520420b':
        eqpCode = '7B1249'
        qty = newData.jsonData.VD_SCJS_250
        break
      case 'iSS_4ce70509b443':
        eqpCode = '7B1250'
        qty = newData.jsonData.VD_SCJS_1060
        break
      case 'iMI_30be3bd11cd9':
        eqpCode = '7B1251'
        qty = newData.jsonData.D_ZJSZ_142
        break
      case 'iMI_009027e340c0':
        eqpCode = '7B1231'
        qty = newData.jsonData.C_SCJS_220
        break
      case 'iMI_e0795e021aa7':
        eqpCode = '7B1232'
        qty = newData.jsonData.C_SCJS_220
        break
      case 'iMI_e0795e021aa8':
        eqpCode = '7B1233'
        qty = newData.jsonData.C_SCJS_220
        break
      case 'iDA_e0795e023ee2':
        eqpCode = '7B1248'
        qty = newData.jsonData.D_YTJSQSJZ_3000
        break
    }
    console.log(formatDate(newData.pushTime), eqpCode, qty)
    const createDate = formatDate(newData.pushTime)
    // 插入数据到MySQL
    if (shouldInsertData(eqpCode, qty)) {
      // 插入数据到MySQL
      const insertQuery =
        'INSERT INTO mqtt_info (create_date, eqp_code, qty) VALUES (?, ?, ?)'
      connection.query(
        insertQuery,
        [createDate, eqpCode, qty],
        (err, results, fields) => {
          if (err) {
            console.error('Error inserting data:', err)
          } else {
            console.log('Data inserted successfully:', results)
          }
        }
      )
    } else {
      console.log(`Data not inserted: ${createDate}, ${eqpCode}, ${qty}`)
    }
  }
})
