import { PageContainer, ProForm, ProFormRadio, ProFormDigit } from "@ant-design/pro-components";
import { amountTypeEnum, payTypeEnum } from "@/common/enum";
import styles from './index.less';
import { Suspense, useEffect, useMemo, useState } from "react";
import { getPageQuery } from "@/utils/utils";
import { fetchMerchantChannelQueryMerchantChannelPage, fetchMerchantChannelQueryMerchantChannelDetail } from "@/services/channel/list";
import { useRequest } from "@umijs/max";
import { Button, Card, Form, InputNumber, Radio, Spin } from "antd";
import { fetchOrderCreateOrder } from "@/services/order";

const Cashier = () => {
  const [] = useState();
  const queryParams = getPageQuery();
  const [form] = Form.useForm();
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
  }, [channelId]);


  useEffect(() => {
    if (channelInfo.id) {
      const values: Record<string, any> = {
        payType: Object.values(payTypeEnum)[0].value
      }
      if (channelInfo.amountType === 1) {
        values.orderAmount = channelInfo.amountConfig;
      }

      // todo
      form.setFieldsValue(values)
    }
  }, [channelInfo]);

  // console.log(channelList, 'ccc')

  // const channelInfo = useMemo(() => {
  //   console.log(queryParams, channelList, 'ddd')
  //   return channelList?.find(channel => channel.channelId === queryParams.channelId)
  // }, [queryParams, channelList])

  // console.log(channelInfo, 'channelInfo')

  const handleSubmit = async () => {
    form.validateFields().then(res => {
      console.log(res, 'res')
      fetchOrderCreateOrder({
        ...res,
        channelId: channelInfo.channelId
      }).then(res => {
        console.log(res, 'res')
      })
    })
  }

  return (
    <PageContainer title={<></>}>
      <Card>
        <Form form={form}>
          <Form.Item name='orderAmount' rules={[{ required: true }]}>
            {
              channelInfo!.amountType === 1 && (
                <Radio.Group
                  value={channelInfo!.amountConfig}
                  disabled
                  options={[
                    {
                      label: channelInfo!.amountConfig,
                      value: String(channelInfo!.amountConfig)
                    }
                  ]}
                >
                  {/* <Radio value={channelInfo!.amountConfig}>{channelInfo!.amountConfig}</Radio> */}
                </Radio.Group>
              )
            }
            {
              channelInfo!.amountType === 3 && (
                <Radio.Group
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
                <InputNumber
                  placeholder="请输入"
                  min={channelInfo!.amountConfig?.split('-')[0]}
                  max={channelInfo!.amountConfig?.split('-')[1]}
                  width="xs"
                // fieldProps={{
                //   formatter: (value) => `¥${value || channelInfo!.amountConfig?.split('-')[0]}`,
                //   parser: (value) => Number(value ? value.replace('¥', '') : '0'),
                // }}
                />
              )
            }
          </Form.Item>
          <Form.Item label='支付方式' name='payType' rules={[{ required: true }]}>
            <Radio.Group
              options={Object.values(payTypeEnum).map(item => (
                {
                  label: item.text,
                  value: item.value
                }
              ))}
            />
          </Form.Item>
        </Form>
      </Card>
      <div className={styles.footer}>
        <div className={styles.amount}>需支付：{form.getFieldValue('orderAmount') ? <><span>{form.getFieldValue('orderAmount')}</span>元</> : '-'}</div>
        <Button onClick={handleSubmit}>立即支付</Button>
      </div>
    </PageContainer>
  )
}

export default Cashier;