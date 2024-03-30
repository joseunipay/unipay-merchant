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
const IntroduceRow = ({ loading }: { loading: boolean; }) => {
  return (
    <Row gutter={24}>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title="可结算金额"
          action={
            <Tooltip title="指标说明">
              <InfoCircleOutlined />
            </Tooltip>
          }
          loading={loading}
          total={126560}
          contentHeight={46}
        >
        </ChartCard>
      </Col>

      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title="已结算金额"
          action={
            <Tooltip title="指标说明">
              <InfoCircleOutlined />
            </Tooltip>
          }
          total={numeral(8846).format('0,0')}
          contentHeight={46}
        >
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title="支付笔数"
          action={
            <Tooltip title="结算中金额">
              <InfoCircleOutlined />
            </Tooltip>
          }
          total={numeral(6560).format('0,0')}
          contentHeight={46}
        >
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          loading={loading}
          bordered={false}
          title="冻结中金额"
          action={
            <Tooltip title="指标说明">
              <InfoCircleOutlined />
            </Tooltip>
          }
          total="78%"
          contentHeight={46}
        >
        </ChartCard>
      </Col>
    </Row>
  );
};

export default IntroduceRow;
