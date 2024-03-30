import { request } from '@umijs/max';
import { HOST } from '../host'

// 结算申请列表
export async function fetchClearApplyQueryClearApplyPage(params: any, options?: { [key: string]: any }) {
  return request<SettleListResult>(`${HOST}/clearApply/queryClearApplyPage`, {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

// 对账历史列表
export async function fetchClearApplyQueryMchFundCheckPage(params: any, options?: { [key: string]: any }) {
  return request<ReconciledListResult>(`${HOST}/clearApply/queryMchFundCheckPage`, {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

// 结算申请
export async function fetchClearApply(params: any) {
  return request(`${HOST}/clearApply/appy`, {
    method: 'POST',
    data: params,
  });
}

// 结算指标
export async function fakeChartData(): Promise<{ data: any }> {
  return request('/api/fake_analysis_chart_data');
}