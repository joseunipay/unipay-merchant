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

const IntroduceRow = ({ loading, options, dataSource }: { loading: boolean; options: IOption[]; dataSource: Record<string, number> }) => {
  return (
    <Row gutter={24}>
      {
        options?.map(item => {
          const value = dataSource?.[item.dataIndex] ?? 0;
          return (
            <Col
              {...topColResponsiveProps}
              key={item.key || item.dataIndex}
            >
              <ChartCard
                bordered={false}
                title={item.title}
                action={
                  <Tooltip title={item.tooltipTitle}>
                    <InfoCircleOutlined />
                  </Tooltip>
                }
                loading={loading}
                total={item.render ? item.render(value) : value}
                contentHeight={46}
              >
              </ChartCard>
            </Col>
          )
        })
      }
    </Row>
  );
};

export default IntroduceRow;
