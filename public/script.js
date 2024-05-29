console.log('Script loaded successfully!')

function getRandomHexColor() {
  // 生成一个随机整数
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
  }

  // 将给定的数值转换为两位十六进制字符串
  function intToHex(int) {
    const hex = int.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  // 生成红、绿、蓝三个颜色分量的随机数值
  const red = getRandomInt(256)
  const green = getRandomInt(256)
  const blue = getRandomInt(256)

  // 转换为十六进制并返回最终的颜色码
  return '#' + intToHex(red) + intToHex(green) + intToHex(blue)
}

const btn = document.querySelector('.buttonClass')

btn.addEventListener('click', function () {
  const h1 = document.querySelector('h1')
  h1.style.color = getRandomHexColor()
})
