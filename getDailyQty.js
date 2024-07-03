import fetch from 'node-fetch'

async function fetchDataAndProcess(startDate, endDate) {
  try {
    console.time('fetchDataAndProcess')

    const response = await fetch(
      'http://10.0.20.8:8082/api/bi/energy/getEnergySyss',
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
    // set 方法
    // const uniqueArbplSet = new Set(result.map((item) => item.arbpl))
    // const uniqueArbplArray = Array.from(uniqueArbplSet)

    // forEach和includes方法
    const uniqueArbplArray = []
    result.forEach((item) => {
      if (!uniqueArbplArray.includes(item.arbpl)) {
        uniqueArbplArray.push(item.arbpl)
      }
    })

    // 输出结果和执行时间
    return { uniqueArbplArray, executionTime }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

// 调用函数
const startDate = '2024-06-01'
const endDate = '2024-06-30'
fetchDataAndProcess(startDate, endDate).then(
  ({ uniqueArbplArray, executionTime }) => {
    console.log(JSON.stringify(uniqueArbplArray, null, 2)) // 使用 JSON.stringify 打印对象
    console.log(`Execution time: ${executionTime} ms`)
  },
)
