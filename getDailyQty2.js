import fetch from 'node-fetch'

async function fetchDataAndProcess(workCenter, startDate, endDate) {
  try {
    console.time('fetchDataAndProcess')

    // 定义要发送的请求数据
    const requestData = {
      workCenter: workCenter,
      startDate: startDate.replace(/-/g, ''), // 格式化日期
      endDate: endDate.replace(/-/g, ''), // 格式化日期
    }

    const response = await fetch(
      'http://10.0.20.8:8082/api/bi/energy/getDailyQty',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      },
    )

    const data = await response.json()

    const startTime = new Date()

    // 用一个对象来存储临时结果
    const tempResult = {}

    // 将startDate和endDate转换为Date对象
    const startDateObj = new Date(startDate)
    const endDateObj = new Date(endDate)

    for (const curr of data) {
      const { werks, arbpl, budat, gmnga } = curr

      // 将budat转换为Date对象
      const budatDate = new Date(
        budat.slice(0, 4) + '-' + budat.slice(4, 6) + '-' + budat.slice(6, 8),
      )

      // 只处理在日期范围内的数据
      if (budatDate >= startDateObj && budatDate <= endDateObj) {
        // 生成唯一键
        const key = `${werks}-${arbpl}`

        if (!tempResult[key]) {
          tempResult[key] = {
            werks,
            arbpl,
            dailyQty: {},
          }
        }

        // 将 gmnga 累加到相同 budat 的值中
        if (!tempResult[key].dailyQty[budat]) {
          tempResult[key].dailyQty[budat] = 0
        }
        tempResult[key].dailyQty[budat] += gmnga
      }
    }

    // 将临时结果转换为目标格式并补全缺失的日期
    const result = Object.values(tempResult).map((item) => {
      const dailyQty = []
      const currentDate = new Date(startDate)

      while (currentDate <= endDateObj) {
        const dateString = currentDate
          .toISOString()
          .slice(0, 10)
          .replace(/-/g, '')
        dailyQty.push({
          budat: dateString,
          gmnga: (item.dailyQty[dateString] || 0).toString(),
        })
        currentDate.setDate(currentDate.getDate() + 1)
      }

      return {
        werks: item.werks,
        arbpl: item.arbpl,
        dailyQty,
      }
    })

    console.timeEnd('fetchDataAndProcess')
    const endTime = new Date()
    const executionTime = endTime - startTime // 计算执行时间
    console.log(`Execution time: ${executionTime} ms`)

    // 输出结果和执行时间
    return { result, executionTime }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

// 定义要传入的 workCenter, startDate 和 endDate 参数
const workCenter = [
  '11ZX01',
  '12CY07',
  '11CY01',
  '12JG07',
  '12ZX04',
  '11ZG01',
  '11FZ05',
  '12PT07',
  '12ZX06',
  '11LB01',
  '11LS01',
  '11PT01',
  '12ZX07',
  '12FZ02',
  '11ZZ05',
  '11DG01',
  '12FZ05',
  '12ZZ02',
  '12FZ11',
  '12ZZ11',
  '11FZ06',
  '11ZZ06',
  '12ZZ12',
  '12ZZ05',
  '11FZ01',
  '12FZ12',
  '12ZZ01',
  '12FZ01',
  '12FZ03',
  '12ZZ03',
  '12YP01',
  '11FZ08',
  '11ZZ07',
  '11ZZ02',
  '11FZ07',
  '11ZZ08',
  '11FZ12',
  '11FZ03',
  '11ZZ01',
  '11FZ04',
  '11ZZ04',
  '11ZZ03',
  '12ZZ04',
  '12FZ08',
  '12ZZ08',
  '12ZZ06',
  '11ZZ12',
  '12FZ10',
  '12ZZ10',
  '12FZ09',
  '11FZ02',
  '12ZZ09',
  '12FZ07',
  '12ZZ07',
]
const startDate = '2024-06-01'
const endDate = '2024-06-30'

// 调用函数
fetchDataAndProcess(workCenter, startDate, endDate).then(
  ({ result, executionTime }) => {
    console.log(JSON.stringify(result, null, 2)) // 使用 JSON.stringify 打印对象
    console.log(`Execution time: ${executionTime} ms`)
  },
)
