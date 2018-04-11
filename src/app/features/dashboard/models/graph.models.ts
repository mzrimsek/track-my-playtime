export interface GraphDataItem {
  name: string;
  value: number;
}

interface GraphConfig {
  view: [number, number] | undefined;
  colorScheme: {
    domain: string[]
  };
  gradient: boolean;
  animations: boolean;
}

export interface BarGraphConfig extends GraphConfig {
  showLegend: boolean;
  showXAxis: boolean;
  showYAxis: boolean;
  showXAxisLabel: boolean;
  showYAxisLabel: boolean;
  showGridLines: boolean;
  xAxisLabel: string;
  yAxisLabel: string;
  axisTickFormatting: (x: any) => any;
}

// tslint:disable-next-line:no-empty-interface
export interface PieChartConfig extends GraphConfig {
  valueFormatting: (x: any) => any;
  percentageFormatting: (x: any) => any;
}
