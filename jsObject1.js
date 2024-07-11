export default {
  selectedData: [],
  myVar2: {},
  arbplList: [
    '11CY01',
    '11DG01',
    '11FZ01',
    '11FZ02',
    '11FZ03',
    '11FZ04',
    '11FZ05',
    '11FZ06',
    '11FZ07',
    '11FZ08',
    '11FZ12',
    '11LB01',
    '11LS01',
    '11PT01',
    '11ZG01',
    '11ZX01',
    '11ZZ01',
    '11ZZ02',
    '11ZZ03',
    '11ZZ04',
    '11ZZ05',
    '11ZZ06',
    '11ZZ07',
    '11ZZ08',
    '11ZZ12',
    '12CY07',
    '12FZ01',
    '12FZ02',
    '12FZ03',
    '12FZ05',
    '12FZ07',
    '12FZ08',
    '12FZ09',
    '12FZ10',
    '12FZ11',
    '12FZ12',
    '12JG07',
    '12PT07',
    '12YP01',
    '12ZX04',
    '12ZX06',
    '12ZX07',
    '12ZZ01',
    '12ZZ02',
    '12ZZ03',
    '12ZZ04',
    '12ZZ05',
    '12ZZ06',
    '12ZZ07',
    '12ZZ08',
    '12ZZ09',
    '12ZZ10',
    '12ZZ11',
    '12ZZ12',
  ],
  filterData() {
    let factory = Select1.selectedOptionValue
    let work_center = Select2.selectedOptionValue
    if (!factory) {
      factory = '全部'
    }
    if (!work_center) {
      work_center = '全部'
    }
    // 根据 factory 筛选
    const rawData = getQTY.data
    let filteredData = rawData
    if (factory !== '全部') {
      filteredData = rawData.filter((item) => item.werks === factory)
    }

    // 根据 work_center 筛选
    if (work_center !== '全部') {
      if (work_center === '总装') {
        filteredData = filteredData.filter((item) => item.arbpl.includes('ZZ'))
      }
      // 其他条件可以在此添加
    }
    this.selectedData = filteredData
    return filteredData
  },
  setChart() {
    const showData = this.selectedData
    showData.sort((a, b) => b.arbpl.localeCompare(a.arbpl))
    const work_center = showData.map((item) => item.arbpl)
    const output = showData.map((item) => item.gmnga)
    const energy = output.map((item) => item / 1000)
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      backgroundColor: '#1d2e3e',
      title: {
        show: true,
        text: '产量和能耗趋势',
        textStyle: {
          color: '#fff',
          fontSize: 26,
          fontWeight: 'normal',
        },
        left: 'center',
        top: 10,
      },
      legend: {
        show: true,
        left: '30%',
        top: '2%',
        textStyle: {
          color: '#fff',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: work_center,
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            color: '#fff',
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          name: '产量',
          axisLabel: {
            color: '#fff',
          },
        },
        {
          type: 'value',
          name: '能耗(kw/h)',
          axisLabel: {
            color: '#fff',
          },
        },
      ],
      series: [
        {
          name: '产量',
          type: 'bar',
          barWidth: '30%',
          data: output,
          yAxisIndex: 0,
        },
        {
          name: '能耗',
          type: 'bar',
          barWidth: '30%',
          data: energy,
          yAxisIndex: 1,
        },
      ],
    }
    return option
  },
  sortData() {
    function fetchDataAndProcess(startDate, endDate) {
      const data = getDailyQty.data
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

      const endTime = new Date()
      const executionTime = endTime - startTime // 计算执行时间

      // 输出结果和执行时间
      return { result, executionTime }
    }
    // 调用函数
    const startDate = '2024-06-01'
    const endDate = '2024-06-30'
    return fetchDataAndProcess(startDate, endDate)
  },
  async myFun2() {
    //	use async-await or promises
    //	await storeValue('varName', 'hello world')
  },
  hexToAscii(hex) {
    let ascii = ''
    for (let i = 0; i < hex.length; i += 2) {
      let part = hex.substr(i, 2)
      ascii += String.fromCharCode(parseInt(part, 16))
    }
    return ascii
  },
}
