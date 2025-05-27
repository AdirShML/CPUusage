import { useCPU } from "../hooks/useCPU";
import { LineChart } from "../components/LineChart";
import { BarChart } from "../components/BarChart";
import { InputUser } from "../components/InputUser";


const Dashboard = () => {
  const { cpuData, loading, error, getData } = useCPU();

  return (
    <div className="dashboard-wrapper flex flex-col items-center w-full">
      <span className="h-[15vh] w-full flex justify-center items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xl sm:text-3xl font-bold">
        AWS Instance CPU Usage
      </span>

      <InputUser onSubmit={getData}/>
      <div className="flex  flex-col sm:flex-row justify-evenly items-center gap-30 mt-8">
          <LineChart data={cpuData} loading={loading} error={error} />
          <BarChart data={cpuData} loading={loading} error={error} />
      </div>
    </div>
  );
};
export default Dashboard;

