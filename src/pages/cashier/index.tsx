import { PageContainer, ProForm, ProFormRadio, ProFormDigit } from "@ant-design/pro-components";
import { amountTypeEnum, payTypeEnum } from "@/common/enum";
import styles from './index.less';
import { Suspense, useEffect, useMemo, useState } from "react";
import { getPageQuery } from "@/utils/utils";
import { fetchMerchantChannelQueryMerchantChannelPage, fetchMerchantChannelQueryMerchantChannelDetail } from "@/services/channel/list";
import { useRequest } from "@umijs/max";
import { Card, InputNumber, Radio, Spin } from "antd";

const Cashier = () => {
  const [] = useState();
  const queryParams = getPageQuery();
  const { channelId } = queryParams;
  const { data: channelInfo = {}, run: getInfo, loading } = useRequest(fetchMerchantChannelQueryMerchantChannelDetail, {
    manual: true
  });

  useEffect(() => {
    if (channelId) {
      getInfo({
        id: channelId
      })
    }
  }, [channelId])

  // console.log(channelList, 'ccc')

  // const channelInfo = useMemo(() => {
  //   console.log(queryParams, channelList, 'ddd')
  //   return channelList?.find(channel => channel.channelId === queryParams.channelId)
  // }, [queryParams, channelList])

  // console.log(channelInfo, 'channelInfo')

  return (
    <PageContainer title={<></>}>
      <Card>
        <ProForm
          style={{
            margin: 'auto',
            width: 'fit-content'
          }}
          layout="vertical"
        // onFinish={onFinish}
        >
          {
            !loading && (
              <>
                {
                  channelInfo!.amountType === 1 && (
                    <ProFormRadio.Group
                      initialValue={channelInfo!.amountConfig}
                      label='支付金额'
                      name='amountConfig'
                      disabled
                      options={[
                        {
                          label: channelInfo!.amountConfig,
                          value: String(channelInfo!.amountConfig)
                        }
                      ]}
                    />
                  )
                }
                {
                  channelInfo!.amountType === 3 && (
                    <ProFormRadio.Group
                      label='支付金额'
                      name='amountConfig'
                      options={channelInfo!.amountConfig?.split('.').map((item: number) => (
                        {
                          label: item,
                          value: item
                        }
                      ))}
                    />
                  )
                }
                {
                  channelInfo!.amountType === 2 && (
                    <ProFormDigit
                      label='支付金额'
                      name="amountConfig"
                      placeholder="请输入"
                      min={channelInfo!.amountConfig?.split('-')[0]}
                      max={channelInfo!.amountConfig?.split('-')[1]}
                      width="xs"
                      fieldProps={{
                        formatter: (value) => `¥${value || channelInfo!.amountConfig?.split('-')[0]}`,
                        parser: (value) => Number(value ? value.replace('¥', '') : '0'),
                      }}
                    />
                  )
                }
                <ProFormRadio.Group
                  label='支付方式'
                  name='payType'
                  options={Object.values(payTypeEnum).map(item => (
                    {
                      label: item.text,
                      value: item.value
                    }
                  ))}
                />
              </>
            )
          }
        </ProForm>
      </Card>
    </PageContainer>
  )
}

export default Cashier;