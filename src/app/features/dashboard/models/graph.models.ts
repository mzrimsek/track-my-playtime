export interface GraphDataItem {
  name: string;
  value: number;
}

interface GraphConfig {
  view: [number, number] | undefined;
  colorScheme: {
    domain: string[]
  };
  showLegend: boolean;
  gradient: boolean;
}

export interface BarGraphConfig extends GraphConfig {
  showXAxis: boolean;
  showYAxis: boolean;
  showXAxisLabel: boolean;
  showYAxisLabel: boolean;
  xAxisLabel: string;
  yAxisLabel: string;
  axisTickFormatting: (x: any) => any;
}

export interface PieChartConfig extends GraphConfig {
  showLabels: boolean;
  explodeSlices: boolean;
  doughnut: boolean;
  tooltipTextFormatting: (x: any) => any;
}
