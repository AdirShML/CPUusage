import { Bar } from 'react-chartjs-2';
import { type ChartProps } from '../types';


export const BarChart = ({ data, loading, error }: ChartProps) => {
  if (loading) return <div className="mt-[5rem]">Loading chart...</div>;
  if (error) return <div className="mt-[5rem] text-red-500">Error: {error}</div>;
  if (!data || !data.data) return <div className="mt-[5rem]">No data available</div>;

  const numericData: number[] = data.data.filter(
    (val): val is number => typeof val === 'number'
  );

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: `use (${data.unit})`,
        data: numericData,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1,
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
        text: 'Bar chart for CPU usage',
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
          callback: (value: number) => `${(value * 100).toFixed(0)}%`,
        },
      },
    },
  };

  return (
    <div className=" mt-[5rem] relative h-[30rem] w-[50rem]">
      <Bar data={chartData} options={options} />
    </div>
  );
};
