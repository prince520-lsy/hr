// 格式日期
export function formatDate(time) {
  // console.log('过滤器中：', time)
  if (time) { // 时间存在的时候才进行处理
    const arr = time.split('T')
    return arr[0]
  } else {
    // 时间不存在 不处理
    return time
  }
}
