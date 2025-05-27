import  { type ChartProps } from "../types";
import { Line } from 'react-chartjs-2';


export const LineChart = ({
    data,
    loading,
    error
}: ChartProps) => {
    if (loading) return <div className="mt-[5rem]">Loading chart...</div>;
  if (error) return <div className="mt-[5rem] text-red-500">Error: {error}</div>;
  if (!data || !data.data) return <div className="mt-[5rem]">No data available</div>;

  const numericData: number[] = data.data
    .filter((val): val is number => typeof val === 'number');

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: `use (${data.unit})`,
        data: numericData,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 1,
        fill: false,
      },
    ],  
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'left' as const },
      title: {
        display: true,
        text: 'Line grapgh of usage over time',
      },
    },
    scales: {
      x: {
        ticks: {
          callback: function (_: any, index: number) {
            return data.labels[index]?.slice(11, 16); 
          },
        },
      },
      y: {
        min: 0,
        max: 1,
        ticks: {
          stepSize: 0.25,
          callback: (value: number) => `${(value * 100).toFixed(0)}%`,
        },
        grid: {
    color: '#E5E7EB',
    borderDash: [4, 4], 
  }
      },
    },
  };

  return (
    <div className="mt-[5rem] relative h-[30rem] w-[50rem]">
        <Line data={chartData} options={options} />
    </div>
  );
}