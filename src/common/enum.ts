const payTypeEnum = {
  1: {
    text: '支付宝H5',
  },
  2: {
    text: '支付宝扫码',
  },
  3: {
    text: '微信H5',
  },
  4: {
    text: '微信扫码',
  },
  5: {
    text: '云闪付H5',
  },
  6: {
    text: '云闪付扫码',
  },
  7: {
    text: 'QQ钱包',
  },
  8: {
    text: '京东钱包',
  },
  9: {
    text: '百度钱包',
  },
  10: {
    text: '数字货币（OTC）',
  },
  11: {
    text: '银联快捷',
  },
  12: {
    text: '银联扫码',
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
    status: 'Default',
  },
  2: {
    text: 'API接口',
    status: 'Default',
  }
}

export {
  payTypeEnum,
  orderStatusEnum,
  callbackStatusEnum,
  orderSourceEnum
}