import { Line, Tiny } from '@ant-design/plots';
import { Card, Col, Row, Tabs } from 'antd';
import type { DataItem, OfflineDataType } from '../data.d';
import useStyles from '../style.style';
import NumberInfo from './NumberInfo';

const OfflineData = ({
  activeKey,
  loading,
  offlineData,
  offlineChartData,
  handleTabChange,
}: {
  activeKey: string;
  loading: boolean;
  offlineData: OfflineDataType[];
  offlineChartData: DataItem[];
  handleTabChange: (activeKey: string) => void;
}) => {
  const { styles } = useStyles();
  return (
    <Card
      loading={loading}
      className={styles.offlineCard}
      bordered={false}
      style={{
        marginTop: 32,
      }}
    >
      <Line
        height={400}
        data={offlineChartData}
        xField="date"
        yField="value"
        colorField="type"
        // slider={{ x: true }}
        axis={{
          x: { title: false },
          y: { title: false, gridLineDash: null, gridStroke: '#ccc', gridStrokeOpacity: 1 },
        }}
        legend={{
          color: {
            layout: { justifyContent: 'center' },
          },
        }}
      />
    </Card>
  );
};
export default OfflineData;
