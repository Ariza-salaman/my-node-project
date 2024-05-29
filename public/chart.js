const option1 = {
  title: {
    text: '各工厂今日产量',
    left: 'center',
    top: 10,
    textStyle: {
      color: '#fff',
      fontSize: 20,
    },
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
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
      data: totalQuantity.factoryCount.map((item) => item.factory),
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
      axisLabel: {
        color: '#fff',
      },
    },
  ],
  animation: true,
  backgroundColor: '#1d2e3e',
  series: [
    {
      name: 'quantity',
      type: 'bar',
      barWidth: '60%',
      data: totalQuantity.factoryCount.map((item) => item.quantity),
      label: {
        show: true,
        fontWeight: 'bold',
        fontSize: 20,
      },
    },
  ],
}
