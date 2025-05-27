{/*
    this is actually the state that "shared"
    through some parent-child components relation between, 
    so all the repeated code to a custom hook :) 
*/}
import { useState } from "react";
import axios from "../utils";
import { type CpuProps, type CPUUsageResponse } from "../types";

export const useCPU = () => {
  const [cpuData, setCpuData] = useState<CPUUsageResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getData = async ({ address, timePeriod, interval }: CpuProps) => {
    setLoading(true);
    setError(null);
    try {
      // complete a try catch for all the props  
      const res = await axios.get("/", {
        params: {
          address: address,
          time_period: timePeriod,
          interval,
        },
      });
      setCpuData(res.data.data);
    } catch (err) {
        console.log(err);
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  return {
    cpuData,
    loading,
    error,
    getData,
  };
};