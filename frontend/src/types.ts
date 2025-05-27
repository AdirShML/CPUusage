export interface CpuProps {
    address: string;
    timePeriod: string;
    interval?: number | string;   
}

export interface CPUUsageResponse {
    data: Array<string | number> | null;
    label: string;
    labels: Array<string>;
    unit: string;
}

export interface ChartProps {
    data: CPUUsageResponse;
    loading: boolean;
    error: string | null;
}

