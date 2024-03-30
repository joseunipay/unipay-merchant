interface SettleListItem {
  /**
   * 申请金额
   */
  applyAmount?: number;
  /**
   * 申请时间
   */
  applyAt?: Date;
  /**
   * 创建时间
   */
  createdAt?: Date;
  /**
   * 发放金额
   */
  grantAmount?: number;
  /**
   * 流水单号，主键
   */
  id?: string;
  /**
   * 商户id
   */
  mchId?: string;
  /**
   * 商户名称
   */
  mchName?: string;
  /**
   * 手续费
   */
  serviceCharge?: number;
  /**
   * 状态（字段码：D0014），0-待结算，1-结算成功，2-结算失败，3-冻结中
   */
  status?: number;
  /**
   * 更新时间
   */
  updatedAt?: Date;
}

interface SettleList extends TableListData {
  records: SettleListItem[];
}

interface SettleListResult extends TableListApiResult {
  data: SettleList
}

interface ReconciledListItem {
  /**
   * 代理佣金
   */
  agentAmount?: number;
  /**
   * 代理商id
   */
  agentId?: string;
  /**
   * 代理商名称
   */
  agentName?: string;
  /**
   * 代理商费率
   */
  agentRate?: number;
  /**
   * 通道结算金额
   */
  channelClearAmount?: number;
  /**
   * 通道id
   */
  channelId?: string;
  /**
   * 通道利润金额
   */
  channelProfitAmount?: number;
  /**
   * 对账时间
   */
  checkedAt?: Date;
  /**
   * 通道商id
   */
  comId?: string;
  /**
   * 通道商名称
   */
  comName?: string;
  /**
   * 成本费率
   */
  costRate?: number;
  /**
   * 创建时间
   */
  createdAt?: Date;
  /**
   * 资金对账id，主键
   */
  id?: string;
  /**
   * 商户结算金额
   */
  mchClearAmount?: number;
  /**
   * 商户id
   */
  mchId?: string;
  /**
   * 商户名称
   */
  mchName?: string;
  /**
   * 商户费率
   */
  mchRate?: number;
  /**
   * 订单支付金额
   */
  orderPayAmount?: number;
  /**
   * 订单成功数量
   */
  orderSuccessCount?: number;
  /**
   * 订单成功率
   */
  orderSuccessRate?: number;
  /**
   * 订单数量
   */
  orderSum?: number;
  /**
   * 订单总金额
   */
  orderSumAmount?: number;
  /**
   * 支付类型，字段码：D0002
   */
  payType?: number;
  /**
   * 更新时间
   */
  updatedAt?: Date;
}

interface ReconciledList extends TableListData {
  records: ReconciledListItem[];
}

interface ReconciledListResult extends TableListApiResult {
  data: ReconciledList
}