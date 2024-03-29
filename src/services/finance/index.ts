import { request } from '@umijs/max';
import { HOST } from '../host'

// 结算申请列表
export async function fetchClearApplyQueryClearApplyPage(body: any, options?: { [key: string]: any }) {
  return request<API.LoginResult>(`${HOST}/clearApply/queryClearApplyPage`, {
    method: 'GET',
    params: body,
    ...(options || {}),
  });
}

// 对账历史列表
export async function fetchClearApplyQueryMchFundCheckPage(body: any, options?: { [key: string]: any }) {
  return request<API.LoginResult>(`${HOST}/clearApply/queryMchFundCheckPage`, {
    method: 'GET',
    params: body,
    ...(options || {}),
  });
}
