import { request } from '@umijs/max';
import type { AnalysisData } from './data';

export async function fakeChartData(): Promise<{ data: AnalysisData }> {
  return request('/api/test/fake_analysis_chart_data');
}
