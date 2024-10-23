import { ErrorResponse } from "@/models/error.models";
import { toast } from "react-toastify";

export const handleError =(errorResponse:ErrorResponse)=>{
    const {status, data} = errorResponse;
    toast.error(`(${status}) ${data}`);
};