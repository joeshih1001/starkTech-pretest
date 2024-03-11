import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  ChartOptions,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);
interface chartPorps {
  dataForChart: {
    revenueMonthData: number[];
    revenueMonth: string[];
    revenueGrowthRate: number[];
  };
}

const MixChart = (props: chartPorps) => {
  const { dataForChart } = props;

  const LineChartdata = {
    labels: dataForChart.revenueMonth,
    datasets: [
      {
        type: "line" as const,
        label: "單月營收年增率",
        borderColor: "#D46662",
        borderWidth: 4,
        data: dataForChart.revenueGrowthRate,
        yAxisID: "y1",
        pointRadius: 0,
        tension:0.1
      },
      {
        type: "bar" as const,
        label: "每月營收",
        backgroundColor: "#f0db7d",
        data: dataForChart.revenueMonthData,
        borderColor: "#E7BF05",
        borderWidth: 2,
        yAxisID: "y",
      },
    ],
  };
  const options: ChartOptions = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: "Chart.js Line Chart - Multi Axis",
      },
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        title: {
          display: true,
          text: "千元",
          align:'end',
        },
        ticks: {
          maxRotation: 0, // 設置X軸標籤角度
          minRotation: 0, // 設置X軸標籤角度
        }
      },

      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        title: {
          display: true,
          text: "%",
          align:'end',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      x: {
        ticks: {
          maxRotation: 0, // 設置X軸標籤角度
          minRotation: 0, // 設置X軸標籤角度
          callback: function (value: any, index: any) {
            return index % 12 === 0
              ? this.getLabelForValue(value).split("-")[0]
              : "";
          },
        },
      },
    },
  };
  return <Chart type="bar" options={options} data={LineChartdata} />;
};

export default MixChart;
