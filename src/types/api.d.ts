type ApiResult = {
  code?: number;
  data?: { [key: string]: any };
  msg?: string;
  sign?: string;
};

interface TableListData {
  /**
   * 当前页码
   */
  current?: number;
  /**
   * 是否包含下一页， true:包含 ，false: 不包含
   */
  hasNext?: boolean;
  /**
   * 数据列表
   */
  records?: { [key: string]: any }[];
  /**
   * 总数量
   */
  total?: number;
  [property: string]: any;
}

interface TableListApiResult extends ApiResult {
  data: TableListData
}

type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};