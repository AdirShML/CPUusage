import React, { useState } from "react"
import type { CpuProps } from "../types"

type InputUser = {
    onSubmit: (data: CpuProps) => Promise<void>;
}

export const InputUser = ({onSubmit}: InputUser) => {
    const [inputFields, setInputFields] = useState<CpuProps>({
        address: '',
        timePeriod: '',
        interval: '',
    });

    const handleFields = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputFields({    
          ...inputFields,
          [e.target.name]: e.target.value
        })
      };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(inputFields);
    }

    return(
        <>
        <div className="w-full mt-[1.5rem] relative">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row ml-[1rem] gap-5 items-center"
            >
                <div className="flex flex-col">
                    <label htmlFor="address" className="mb-1 font-medium text-gray-700">
                        Address
                    </label>
                    <input
                        id="address"
                        name="address"
                        value={inputFields.address}
                        onChange={handleFields}
                        placeholder="IP Address"
                        className="border p-2 rounded w-full sm:w-auto"
                        required
                    />
                    </div>
                <div className="flex flex-col">
                    <label htmlFor="timePeriod" className="mb-1 font-medium text-gray-700">
                        time period
                    </label>
                <input
                    type="date"
                    name="timePeriod"
                    value={inputFields.timePeriod}
                    onChange={handleFields}
                    max={new Date(Date.now() - 86400000).toISOString().split('T')[0]}  // its just to disable selecting unavailable inputs..  
                    placeholder="Starting Point"
                    className="border p-2 rounded w-full " 
                    required               
                />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="interval" className="mb-1 font-medium text-gray-700">
                        interval
                    </label>
                <input
                    name="interval"
                    value={inputFields.interval}
                    onChange={handleFields}
                    placeholder="Samples Interval"
                    className="border p-2 rounded w-full sm:w-auto"
                    required
                />
                </div>
                <button
                type="submit"
                className="bg-blue-300 text-white mt-[1.5rem] px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto"
                >
                    Show Measures
                </button>
            </form>
        </div>
        </>
    )
}