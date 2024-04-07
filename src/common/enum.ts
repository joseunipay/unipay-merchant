const payTypeEnum = {
  1: {
    text: '支付宝H5',
    value: 1
  },
  2: {
    text: '支付宝扫码',
    value: 2
  },
  3: {
    text: '微信H5',
    value: 3
  },
  4: {
    text: '微信扫码',
    value: 4
  },
  5: {
    text: '云闪付H5',
    value: 5
  },
  6: {
    text: '云闪付扫码',
    value: 6
  },
  7: {
    text: 'QQ钱包',
    value: 7
  },
  8: {
    text: '京东钱包',
    value: 8
  },
  9: {
    text: '百度钱包',
    value: 9
  },
  10: {
    text: '数字货币（OTC）',
    value: 10
  },
  11: {
    text: '银联快捷',
    value: 11
  },
  12: {
    text: '银联扫码',
    value: 12
  }
}


const orderStatusEnum = {
  1: {
    text: '已创建',
    status: 'Default',
  },
  2: {
    text: '已支付',
    status: 'Success',
  },
  3: {
    text: '支付超时',
    status: 'Error',
  }
}

const callbackStatusEnum = {
  1: {
    text: '未回调',
    status: 'Default',
  },
  2: {
    text: '回调成功',
    status: 'Success',
  },
  3: {
    text: '回调失败',
    status: 'Error',
  },
}

const orderSourceEnum = {
  1: {
    text: '收银台',
  },
  2: {
    text: 'API接口',
  }
}


export enum amountTypeEnum {
  '固定金额' = 1,
  '范围金额',
  '浮动金额'
}

export {
  payTypeEnum,
  orderStatusEnum,
  callbackStatusEnum,
  orderSourceEnum
}