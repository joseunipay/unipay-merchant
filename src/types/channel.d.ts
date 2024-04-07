interface ChannelListItem {
  /**
   * 金额值
   */
  amountConfig?: string;
  /**
   * 金额类型(字典码：D0009)，1-固定金额，2-范围金额，3-浮动金额
   */
  amountType?: number;
  /**
   * 通道id
   */
  channelId: string;
  /**
   * 创建时间
   */
  createdAt?: Date;
  /**
   * 商户通道id
   */
  id?: string;
  /**
   * 商户id
   */
  merchantId?: string;
  /**
   * 商户名称
   */
  merchantName?: string;
  /**
   * 支付类型
   */
  payType?: number;
  /**
   * 额度值
   */
  quotaConfig?: string;
  /**
   * 额度类型(字典码：D0011) 1-无限额度，2-有限额度
   */
  quotaType?: number;
  /**
   * 费率
   */
  rate?: number;
  /**
   * 适用领域(字典码：D0008) 1-BC，2-资金盘  可多选
   */
  scope?: string;
  /**
   * 状态(字典码：D0001) 0-停用，1-启用
   */
  status: number;
  /**
   * 时间值
   */
  timeConfig?: string;
  /**
   * 时间类型(字典码：D0010) 1-24小时，2-限制时间
   */
  timeType?: number;
  /**
   * 修改时间
   */
  updatedAt?: Date;
}

interface ChannelList extends TableListData {
  records: ChannelListItem[];
}

interface ChannelListResult extends TableListApiResult {
  data: ChannelList
}