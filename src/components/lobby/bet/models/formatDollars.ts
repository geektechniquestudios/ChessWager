export const formatDollars = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "m"
  } else if (num >= 1000) {
    if (num < 10000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k"
    } else {
      return (num / 1000).toFixed(0) + "k"
    }
  } else if (num >= 100 && num < 1000) {
    return num.toFixed(0)
  } else {
    return num.toFixed(2)
  }
}
