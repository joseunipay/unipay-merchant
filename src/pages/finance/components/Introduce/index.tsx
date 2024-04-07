import { Spin } from "antd";
import { Suspense } from "react";
import IntroduceRow from "../IntroduceRow";
import { useRequest } from "@umijs/max";
import { fetchClearStatisticsGridClearStatistics } from "@/services/finance";

const renderVal = (value: number) => {
  return `¥${value}`
}
const introduces: IOption[] = [
  {
    title: '可结算金额',
    key: 'clearableAmount',
    dataIndex: 'clearableAmount',
    tooltipTitle: '可结算金额',
    render: renderVal
  },
  {
    title: '已结算金额',
    key: 'clearedAmount',
    dataIndex: 'clearedAmount',
    tooltipTitle: '已结算金额',
    render: renderVal
  },
  {
    title: '结算中金额',
    key: 'clearingAmount',
    dataIndex: 'clearingAmount',
    tooltipTitle: '结算中金额',
    render: renderVal
  },
  {
    title: '冻结中金额',
    key: 'frozenAmount',
    dataIndex: 'frozenAmount',
    tooltipTitle: '冻结中金额',
    render: renderVal
  }
]

const Introduce = (props: { loading?: boolean; data?: Record<string, number> }) => {
  const { loading, data = {} } = useRequest(fetchClearStatisticsGridClearStatistics, {
    manual: !!props.data
  });
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