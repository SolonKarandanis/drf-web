import { ErrorResponse } from "@/models/error.models";
import { toast } from "react-toastify";

export const handleError =(errorResponse:ErrorResponse)=>{
    const {status, data} = errorResponse;
    for (const dataKey in data){
        const dataValue = data[dataKey];
        if(!Array.isArray(dataValue)){
            toast.error(`(${status}) ${dataValue}`);
        }
        else{
            for(const valueKey in dataValue){
                const value = dataValue[valueKey];
                toast.error(`(${status}) ${value}`);
            }
        }
    }
    
};