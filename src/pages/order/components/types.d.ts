interface IOption {
  title: string;
  key?: string;
  dataIndex: string;
  tooltipTitle: string;
  render?: (value: number) => React.ReactNode | string | number
}