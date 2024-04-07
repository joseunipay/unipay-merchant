import {
  PageContainer,
  ProForm,
  ProFormDigit,
} from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Card, message } from 'antd';
import { Suspense, type FC } from 'react';
import Introduce from '../components/Introduce';
import { fetchClearApply, fetchClearStatisticsGridClearStatistics } from '@/services/finance';
import styles from './index.less';

const BasicForm: FC<Record<string, any>> = () => {
  const { loading, data = {}, run: fetchIntroduce } = useRequest(fetchClearStatisticsGridClearStatistics);

  const onFinish = async (values: Record<string, any>) => {
    const msg = await fetchClearApply(values);
    message.success('提交成功');
    await fetchIntroduce();
  };
  
  return (
    <PageContainer title={<></>}>
      <Card bordered={false}>
        <Introduce data={data} loading={loading} />
        <div className={styles.tips}>
          <div className={styles.title}>商户结算手续费=结算金额*比例手续费+固定手续费</div>
          <div>如：申请结算10000元，手续费1%，固定手续费10元。</div>
          <div>综合手续费=10000*1%+10 为110元</div>
        </div>
        <ProForm
          style={{
            margin: 'auto',
            marginTop: 180,
            width: 'fit-content'
          }}
          layout="vertical"
          onFinish={onFinish}
        >
          <ProFormDigit
            label='申请结算金额'
            name="applyAmount"
            placeholder="请输入"
            min={0}
            max={data.clearableAmount ?? 100}
            width="xs"
            fieldProps={{
              formatter: (value) => `¥${value || 0}`,
              parser: (value) => Number(value ? value.replace('¥', '') : '0'),
            }}
          />
        </ProForm>
      </Card>
    </PageContainer>
  );
};
export default BasicForm;
