import { Spin } from "antd";
import { Suspense } from "react";
import IntroduceRow from "../IntroduceRow";
import { useRequest } from "@umijs/max";
import { fetchOrderMchOrderStatistics } from "@/services/order";
import { formatAmount } from "@/utils/format";

const introduces: IOption[] = [
  {
    title: '已支付金额',
    key: 'payAmount',
    dataIndex: 'payAmount',
    tooltipTitle: '已支付金额',
    render: (value: number) => {
      return `¥${formatAmount(value)}`
    }
  },
  {
    title: '订单数',
    key: 'orderNum',
    dataIndex: 'orderNum',
    tooltipTitle: '订单数',
  },
  {
    title: '支付成功订单数',
    key: 'orderSuccessCount',
    dataIndex: 'orderSuccessCount',
    tooltipTitle: '支付成功订单数',
  },
  {
    title: '成功率',
    key: 'orderSuccessCount',
    dataIndex: 'orderSuccessCount',
    tooltipTitle: '成功率',
    render: (value: number) => {
      return `${value}%`
    }
  }
]

const Introduce = (props: { loading?: boolean; data?: Record<string, number> }) => {
  const { data = {}, loading } = useRequest(fetchOrderMchOrderStatistics);
  return (
    <Suspense fallback={
      <div style={{ paddingTop: 100, textAlign: 'center' }}>
        <Spin size="large" />
      </div>}>
      <IntroduceRow options={introduces} loading={props.loading ?? loading} dataSource={props.data ?? data} />
    </Suspense>
  )
}

export default Introduce;