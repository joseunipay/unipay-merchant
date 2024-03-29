import { request } from '@umijs/max';
import { HOST } from '../host'

// 查询商户通道列表，用于分页
export async function fetchMerchantChannelQueryMerchantChannelPage(body: any, options?: { [key: string]: any }) {
  return request<API.LoginResult>(`${HOST}/merchantChannel/queryMerchantChannelPage`, {
    method: 'GET',
    params: body,
    ...(options || {}),
  });
}

// 异常订单列表
export async function fetchMerchantChannelUpdateMerchantChannel(body: any, options?: { [key: string]: any }) {
  return request<API.LoginResult>(`${HOST}/merchantChannel/updateMerchantChannel`, {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
