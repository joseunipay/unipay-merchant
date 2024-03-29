import { request } from '@umijs/max';
import { HOST } from '../host'

// 查询商户通道列表，用于分页
export async function fetchMerchantChannelQueryMerchantChannelPage(params: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<ChannelListResult>(`${HOST}/merchantChannel/queryMerchantChannelPage`, {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

// 修改商户通道
export async function fetchMerchantChannelUpdateMerchantChannel(params: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<ApiResult>(`${HOST}/merchantChannel/updateMerchantChannel`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}
