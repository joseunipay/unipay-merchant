import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, Progress, Row, Tooltip } from 'antd';
import numeral from 'numeral';
import { ChartCard } from '@/components/Charts';
const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: {
    marginBottom: 24,
  },
};
const IntroduceRow = ({ loading, visitData }: { loading: boolean; visitData: OrderMatch }) => {
  return (
    <Row gutter={24}>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title="已支付金额"
          action={
            <Tooltip title="指标说明">
              <InfoCircleOutlined />
            </Tooltip>
          }
          loading={loading}
          total={visitData.payAmount}
          contentHeight={46}
        >
        </ChartCard>
      </Col>

      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title="订单数"
          action={
            <Tooltip title="指标说明">
              <InfoCircleOutlined />
            </Tooltip>
          }
          total={visitData.orderNum}
          contentHeight={46}
        >
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title="支付成功订单数"
          action={
            <Tooltip title="结算中金额">
              <InfoCircleOutlined />
            </Tooltip>
          }
          total={visitData.orderSuccessCount}
          contentHeight={46}
        >
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          loading={loading}
          bordered={false}
          title="成功率"
          action={
            <Tooltip title="指标说明">
              <InfoCircleOutlined />
            </Tooltip>
          }
          // total={`${visitData.orderSuccessCount}%`}
          total={visitData.orderSuccessCount}
          contentHeight={46}
        >
        </ChartCard>
      </Col>
    </Row>
  );
};
export default IntroduceRow;
