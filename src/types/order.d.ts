type OrderListItem = {
  /**
   * 回调时间
   */
  callbackAt?: Date[];
  /**
   * 回调状态 1-未回调，2-回调成功，3-回调失败
   */
  callbackStatus?: number;
  /**
   * 通道id
   */
  channelId?: string;
  /**
   * 通道订单号
   */
  channelOrderId?: string;
  /**
   * 创建时间
   */
  createdAt?: Date[];
  /**
   * 当前页
   */
  current?: number;
  /**
   * 代理商id
   */
  mchAgentId?: string;
  /**
   * 商户id
   */
  merchantId?: string;
  /**
   * 订单金额
   */
  orderAmount?: number[];
  /**
   * 平台订单号
   */
  orderId?: string;
  /**
   * 订单来源 1-收银台，2-API接口
   */
  orderSource?: number;
  /**
   * 订单状态 1-已创建，2-已支付，3-支付超时
   */
  orderStatus?: number;
  /**
   * 每页大小
   */
  pageSize?: number;
  /**
   * 支付金额
   */
  payAmount?: number[];
  /**
   * 支付类型
   * 1-支付宝H5，2-支付宝扫码，3-微信H5，4-微信扫码，5-云闪付H5,6-云闪付扫码，7-QQ钱包，8-京东钱包，9-百度钱包，10-数字货币（OTC），11-银联快捷，12-银联扫码
   */
  payType?: number;
  // [property: string]: any;
}