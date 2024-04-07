/**
 * 格式化金额（千分位）
 * @param {*} val
 * @param {*} defaultPlaceHolder
 */
export function formatAmount(val: string | number, defaultPlaceHolder = '-') {
  const num = Number(val);
  if ((!val && val !== 0) || val === defaultPlaceHolder || isNaN(num)) {
    return defaultPlaceHolder;
  }
  if (num === 0) {
    return '0';
  }
  return num.toLocaleString();
}